import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSubscriptionSchema, insertContactMessageSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      const subscription = await storage.createNewsletterSubscription(validatedData);
      res.json({ success: true, subscription });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(400).json({ message: error.message || "Failed to subscribe" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({ success: true, message });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: error.message || "Failed to send message" });
    }
  });

  app.get("/api/contact-messages", async (_req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch messages" });
    }
  });

  app.get("/api/blog", async (_req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch blog posts" });
    }
  });

  app.get("/api/programs", async (_req, res) => {
    try {
      const programs = await storage.getAllPrograms();
      res.json(programs);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch programs" });
    }
  });

  app.get("/api/stories", async (_req, res) => {
    try {
      const stories = await storage.getAllStories();
      res.json(stories);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch stories" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
