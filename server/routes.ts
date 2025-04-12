import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema, loginUserSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import Stripe from "stripe";
import { generateColorPalette } from "./openai";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function registerRoutes(app: Express): Promise<Server> {
  // Register a new user
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      
      // Validasi input
      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Username, email, dan password harus diisi"
        });
      }
      
      // Periksa apakah username sudah digunakan
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username sudah digunakan"
        });
      }
      
      // Periksa apakah email sudah digunakan
      const existingEmail = await storage.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: "Email sudah digunakan"
        });
      }
      
      // Buat user baru
      const newUser = await storage.createUser({
        username,
        email,
        password
      });
      
      // Hapus password dan salt dari response
      const { password: _, salt: __, ...userWithoutSensitiveData } = newUser;
      
      res.status(201).json({
        success: true,
        message: "Registrasi berhasil",
        user: userWithoutSensitiveData
      });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({
        success: false,
        message: "Gagal melakukan registrasi"
      });
    }
  });
  
  // Login user
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      // Validasi data login dengan Zod
      const loginData = loginUserSchema.parse(req.body);
      
      // Verifikasi user
      const user = await storage.verifyUser(loginData);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Username atau password salah"
        });
      }
      
      // Update last login time
      await storage.updateLastLogin(user.id);
      
      // Hapus password dan salt dari response
      const { password: _, salt: __, ...userWithoutSensitiveData } = user;
      
      res.json({
        success: true,
        message: "Login berhasil",
        user: userWithoutSensitiveData
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: validationError.message
        });
      } else {
        console.error("Login error:", error);
        res.status(500).json({
          success: false,
          message: "Gagal melakukan login"
        });
      }
    }
  });
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const messageData = insertMessageSchema.parse(req.body);
      
      // Create message in storage
      const message = await storage.createMessage(messageData);
      
      res.status(201).json({ 
        success: true, 
        message: "Message sent successfully",
        data: message 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message" 
        });
      }
    }
  });

  // Get GitHub repositories - example of integrating with external APIs
  app.get("/api/github", async (req, res) => {
    try {
      const username = req.query.username || 'febrideveloper';
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch GitHub repositories');
      }
      
      const data = await response.json();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to fetch GitHub repositories" 
      });
    }
  });

  // Color palette generator endpoint
  app.post("/api/generate-palette", async (req, res) => {
    try {
      const { description, mood, numColors } = req.body;
      
      if (!description || !mood) {
        return res.status(400).json({ 
          success: false, 
          message: "Missing required parameters: description and mood" 
        });
      }

      // Generate color palette using OpenAI
      const colors = await generateColorPalette(
        description, 
        mood, 
        numColors || 5
      );

      // Return the generated colors
      res.json({ 
        success: true, 
        colors 
      });
    } catch (error: any) {
      console.error("Error generating color palette:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error generating color palette: " + error.message 
      });
    }
  });

  // Stripe payment intent endpoint
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, productId, productName } = req.body;
      
      if (!amount || !productId) {
        return res.status(400).json({ 
          success: false, 
          message: "Missing required parameters: amount and productId" 
        });
      }

      // Create a new payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount),
        currency: "usd",
        description: `Purchase of ${productName || 'Product #' + productId}`,
        metadata: {
          productId: productId.toString(),
          productName: productName || 'Product #' + productId
        }
      });

      // Return the client secret
      res.json({ 
        success: true,
        clientSecret: paymentIntent.client_secret 
      });
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        message: "Error creating payment intent: " + error.message 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
