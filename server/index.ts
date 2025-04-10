import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { storage } from "./storage";
import { getClientIp } from "request-ip";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API route for visitors
app.get("/api/visitors", async (req: Request, res: Response) => {
  try {
    const stats = await storage.getVisitorStats();
    res.json(stats);
  } catch (error) {
    console.error("Error fetching visitor stats:", error);
    res.status(500).json({ error: "Failed to fetch visitor statistics" });
  }
});

// API route for visitor list with pagination
app.get("/api/visitors/list", async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
    const visitors = await storage.getVisitors(limit, offset);
    res.json(visitors);
  } catch (error) {
    console.error("Error fetching visitors:", error);
    res.status(500).json({ error: "Failed to fetch visitor list" });
  }
});

// Middleware for tracking visitors
app.use(async (req: Request, res: Response, next: NextFunction) => {
  // Skip API requests and static assets to avoid duplicated tracking
  if (req.path.startsWith("/api") || 
      req.path.includes(".") || 
      req.path.includes("favicon") || 
      req.path === "/robots.txt") {
    return next();
  }
  
  try {
    // Get visitor IP
    const ipAddress = getClientIp(req) || "unknown";
    
    // Simplified user agent parsing without using third-party libraries
    const userAgent = req.headers["user-agent"] || "";
    
    // Parse browser
    let browser = "Unknown";
    if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) browser = "Chrome";
    else if (userAgent.includes("Firefox")) browser = "Firefox";
    else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) browser = "Safari";
    else if (userAgent.includes("Edg")) browser = "Edge";
    else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) browser = "Internet Explorer";
    
    // Parse OS
    let os = "Unknown";
    if (userAgent.includes("Windows")) os = "Windows";
    else if (userAgent.includes("Mac")) os = "MacOS";
    else if (userAgent.includes("Linux") && !userAgent.includes("Android")) os = "Linux";
    else if (userAgent.includes("Android")) os = "Android";
    else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) os = "iOS";
    
    // Parse device type
    let device = "Desktop";
    if (userAgent.includes("Mobile")) device = "Mobile";
    else if (userAgent.includes("Tablet")) device = "Tablet";
    
    // Check if visitor already exists
    const existingVisitor = await storage.getVisitorByIp(ipAddress);
    
    if (existingVisitor) {
      // Update existing visitor
      await storage.updateVisitor(existingVisitor.id, {
        userAgent: userAgent,
        referrer: req.headers.referer || "",
        language: req.headers["accept-language"] || "",
        browser: browser,
        os: os,
        device: device,
      });
    } else {
      // Create new visitor
      await storage.createVisitor({
        ipAddress,
        userAgent: userAgent,
        referrer: req.headers.referer || "",
        language: req.headers["accept-language"] || "",
        browser: browser,
        os: os,
        device: device,
      });
    }
  } catch (error) {
    // Just log the error and continue - visitor tracking should not block the application
    console.error("Error tracking visitor:", error);
  }
  
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
