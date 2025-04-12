import { messages, type Message, type InsertMessage } from "@shared/schema";
import { users, type User, type InsertUser, type LoginUser } from "@shared/schema";
import { visitors, type Visitor, type InsertVisitor } from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, sql } from "drizzle-orm";
import crypto from "crypto";

// Helper functions for password hashing
function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex');
}

function hashPassword(password: string, salt: string): string {
  return crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
}

function verifyPassword(password: string, salt: string, storedHash: string): boolean {
  const hash = hashPassword(password, salt);
  return hash === storedHash;
}

// Define storage interface with required CRUD methods
export interface IStorage {
  // User & Authentication methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(userData: { username: string, email: string, password: string, role?: string }): Promise<User>;
  verifyUser(loginData: LoginUser): Promise<User | null>;
  updateLastLogin(userId: number): Promise<void>;
  updateUserPassword(userId: number, newPassword: string): Promise<boolean>;
  
  // Message methods
  createMessage(message: InsertMessage): Promise<Message>;
  getMessages(): Promise<Message[]>;
  getMessage(id: number): Promise<Message | undefined>;
  
  // Visitor methods
  createVisitor(visitor: InsertVisitor): Promise<Visitor>;
  getVisitors(limit?: number, offset?: number): Promise<Visitor[]>;
  getVisitor(id: number): Promise<Visitor | undefined>;
  getVisitorByIp(ipAddress: string): Promise<Visitor | undefined>;
  getVisitorStats(): Promise<{
    totalVisitors: number;
    uniqueVisitors: number;
    todayVisitors: number;
    lastWeekVisitors: number;
    visitorsByCountry: { country: string; count: number }[];
    visitorsByDevice: { device: string; count: number }[];
    visitorsByBrowser: { browser: string; count: number }[];
    visitorsByOs: { os: string; count: number }[];
  }>;
  updateVisitor(id: number, visitor: Partial<InsertVisitor>): Promise<Visitor>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(userData: { username: string, email: string, password: string, role?: string }): Promise<User> {
    // Generate salt and hash the password
    const salt = generateSalt();
    const hashedPassword = hashPassword(userData.password, salt);
    
    // Create user in database
    const [user] = await db
      .insert(users)
      .values({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        salt: salt,
        role: userData.role || 'user'
      })
      .returning();
    
    return user;
  }
  
  async verifyUser(loginData: LoginUser): Promise<User | null> {
    // Find user by username
    const user = await this.getUserByUsername(loginData.username);
    
    // If user not found or inactive, return null
    if (!user || !user.isActive) {
      return null;
    }
    
    // Verify password
    const isPasswordValid = verifyPassword(
      loginData.password,
      user.salt,
      user.password
    );
    
    // Return user if password is valid, otherwise null
    return isPasswordValid ? user : null;
  }
  
  async updateLastLogin(userId: number): Promise<void> {
    await db
      .update(users)
      .set({
        lastLogin: new Date()
      })
      .where(eq(users.id, userId));
  }
  
  async updateUserPassword(userId: number, newPassword: string): Promise<boolean> {
    try {
      // Find user first
      const user = await this.getUser(userId);
      if (!user) {
        return false;
      }
      
      // Generate new salt and hash the new password
      const salt = generateSalt();
      const hashedPassword = hashPassword(newPassword, salt);
      
      // Update the user's password and salt
      await db
        .update(users)
        .set({
          password: hashedPassword,
          salt: salt
        })
        .where(eq(users.id, userId));
      
      return true;
    } catch (error) {
      console.error("Error updating password:", error);
      return false;
    }
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db
      .insert(messages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async getMessages(): Promise<Message[]> {
    return await db.select().from(messages);
  }

  async getMessage(id: number): Promise<Message | undefined> {
    const [message] = await db.select().from(messages).where(eq(messages.id, id));
    return message || undefined;
  }
  
  // Visitor methods implementation
  async createVisitor(insertVisitor: InsertVisitor): Promise<Visitor> {
    const [visitor] = await db
      .insert(visitors)
      .values(insertVisitor)
      .returning();
    return visitor;
  }
  
  async getVisitors(limit: number = 100, offset: number = 0): Promise<Visitor[]> {
    return await db
      .select()
      .from(visitors)
      .orderBy(desc(visitors.lastVisit))
      .limit(limit)
      .offset(offset);
  }
  
  async getVisitor(id: number): Promise<Visitor | undefined> {
    const [visitor] = await db.select().from(visitors).where(eq(visitors.id, id));
    return visitor || undefined;
  }
  
  async getVisitorByIp(ipAddress: string): Promise<Visitor | undefined> {
    const [visitor] = await db
      .select()
      .from(visitors)
      .where(eq(visitors.ipAddress, ipAddress));
    return visitor || undefined;
  }
  
  async updateVisitor(id: number, visitorData: Partial<InsertVisitor>): Promise<Visitor> {
    const [visitor] = await db
      .update(visitors)
      .set({
        ...visitorData,
        lastVisit: new Date(),
        visitCount: sql`${visitors.visitCount} + 1`,
      })
      .where(eq(visitors.id, id))
      .returning();
    return visitor;
  }
  
  async getVisitorStats() {
    // Get total visitors
    const [totalVisitorsResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(visitors);
    const totalVisitors = totalVisitorsResult?.count || 0;
    
    // Get unique visitors
    const [uniqueVisitorsResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(visitors)
      .where(eq(visitors.isUnique, true));
    const uniqueVisitors = uniqueVisitorsResult?.count || 0;
    
    // Get today's visitors
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [todayVisitorsResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(visitors)
      .where(sql`DATE(${visitors.lastVisit}) = CURRENT_DATE`);
    const todayVisitors = todayVisitorsResult?.count || 0;
    
    // Get last week visitors
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const [lastWeekVisitorsResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(visitors)
      .where(sql`${visitors.lastVisit} >= ${lastWeek}`);
    const lastWeekVisitors = lastWeekVisitorsResult?.count || 0;
    
    // Get visitors by country (handling nulls)
    const visitorsByCountryRaw = await db
      .select({ 
        country: visitors.country,
        count: sql<number>`count(*)`
      })
      .from(visitors)
      .where(sql`${visitors.country} IS NOT NULL`)
      .groupBy(visitors.country)
      .orderBy(desc(sql`count(*)`))
      .limit(10);
      
    // Convert null countries to "Unknown" to satisfy TypeScript
    const visitorsByCountry = visitorsByCountryRaw.map(item => ({
      country: item.country || "Unknown",
      count: item.count
    }));
    
    // Get visitors by device (handling nulls)
    const visitorsByDeviceRaw = await db
      .select({ 
        device: visitors.device,
        count: sql<number>`count(*)`
      })
      .from(visitors)
      .where(sql`${visitors.device} IS NOT NULL`)
      .groupBy(visitors.device)
      .orderBy(desc(sql`count(*)`))
      .limit(10);
      
    // Convert null devices to "Unknown" to satisfy TypeScript
    const visitorsByDevice = visitorsByDeviceRaw.map(item => ({
      device: item.device || "Unknown",
      count: item.count
    }));
    
    // Get visitors by browser (handling nulls)
    const visitorsByBrowserRaw = await db
      .select({ 
        browser: visitors.browser,
        count: sql<number>`count(*)`
      })
      .from(visitors)
      .where(sql`${visitors.browser} IS NOT NULL`)
      .groupBy(visitors.browser)
      .orderBy(desc(sql`count(*)`))
      .limit(10);
      
    // Convert null browsers to "Unknown" to satisfy TypeScript
    const visitorsByBrowser = visitorsByBrowserRaw.map(item => ({
      browser: item.browser || "Unknown",
      count: item.count
    }));
    
    // Get visitors by OS (handling nulls)
    const visitorsByOsRaw = await db
      .select({ 
        os: visitors.os,
        count: sql<number>`count(*)`
      })
      .from(visitors)
      .where(sql`${visitors.os} IS NOT NULL`)
      .groupBy(visitors.os)
      .orderBy(desc(sql`count(*)`))
      .limit(10);
      
    // Convert null OS to "Unknown" to satisfy TypeScript
    const visitorsByOs = visitorsByOsRaw.map(item => ({
      os: item.os || "Unknown",
      count: item.count
    }));
    
    return {
      totalVisitors,
      uniqueVisitors,
      todayVisitors,
      lastWeekVisitors,
      visitorsByCountry,
      visitorsByDevice,
      visitorsByBrowser,
      visitorsByOs
    };
  }
}

export const storage = new DatabaseStorage();
