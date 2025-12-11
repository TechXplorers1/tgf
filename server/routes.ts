import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertNewsletterSubscriptionSchema,
  insertContactMessageSchema,
  insertProgramSchema,
  insertBlogPostSchema,
  insertSiteConfigSchema,
  insertDonationSchema,
  insertValueSchema,
  insertStaffSchema,
} from "@shared/schema";
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

  app.get("/api/newsletter", async (_req, res) => {
    try {
      const subs = await storage.getAllNewsletterSubscriptions();
      res.json(subs);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch subscriptions" });
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

  // Donations
  app.post("/api/donations", async (req, res) => {
    try {
      const validatedData = insertDonationSchema.parse(req.body);
      const donation = await storage.createDonation(validatedData);
      res.json(donation);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: error.message || "Failed to process donation" });
    }
  });

  app.get("/api/donations", async (_req, res) => {
    try {
      const donations = await storage.getAllDonations();
      res.json(donations);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch donations" });
    }
  });

  // Programs CRUD
  app.post("/api/programs", async (req, res) => {
    try {
      const validatedData = insertProgramSchema.parse(req.body);
      const program = await storage.createProgram(validatedData);
      res.json(program);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: error.message || "Failed to create program" });
    }
  });

  app.patch("/api/programs/:id", async (req, res) => {
    try {
      const validatedData = insertProgramSchema.partial().parse(req.body);
      const program = await storage.updateProgram(req.params.id, validatedData);
      res.json(program);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: error.message || "Failed to update program" });
    }
  });

  app.delete("/api/programs/:id", async (req, res) => {
    try {
      await storage.deleteProgram(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to delete program" });
    }
  });

  // Blog CRUD
  app.post("/api/blog", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.json(post);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: error.message || "Failed to create blog post" });
    }
  });

  app.patch("/api/blog/:id", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.partial().parse(req.body);
      const post = await storage.updateBlogPost(req.params.id, validatedData);
      res.json(post);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: error.message || "Failed to update blog post" });
    }
  });

  app.delete("/api/blog/:id", async (req, res) => {
    try {
      await storage.deleteBlogPost(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to delete blog post" });
    }
  });

  // Contact Delete
  app.delete("/api/contact/:id", async (req, res) => {
    try {
      await storage.deleteContactMessage(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to delete message" });
    }
  });

  // Site Config
  app.get("/api/site-config", async (_req, res) => {
    try {
      const config = await storage.getSiteConfig();
      res.json(config);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch site config" });
    }
  });

  app.patch("/api/site-config", async (req, res) => {
    try {
      const validatedData = insertSiteConfigSchema.partial().parse(req.body);
      const config = await storage.updateSiteConfig(validatedData);
      res.json(config);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: error.message || "Failed to update site config" });
    }
  });

  // Values CRUD
  app.get("/api/values", async (_req, res) => {
    try {
      const values = await storage.getAllValues();
      res.json(values);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch values" });
    }
  });

  app.post("/api/values", async (req, res) => {
    try {
      const validatedData = insertValueSchema.parse(req.body);
      const value = await storage.createValue(validatedData);
      res.json(value);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: error.message || "Failed to create value" });
    }
  });

  app.patch("/api/values/:id", async (req, res) => {
    try {
      const validatedData = insertValueSchema.partial().parse(req.body);
      const value = await storage.updateValue(req.params.id, validatedData);
      res.json(value);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: error.message || "Failed to update value" });
    }
  });

  app.delete("/api/values/:id", async (req, res) => {
    try {
      await storage.deleteValue(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to delete value" });
    }
  });

  // Staff CRUD
  app.get("/api/staff", async (_req, res) => {
    try {
      const staff = await storage.getAllStaff();
      res.json(staff);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch staff" });
    }
  });

  app.post("/api/staff", async (req, res) => {
    try {
      const validatedData = insertStaffSchema.parse(req.body);
      const staff = await storage.createStaff(validatedData);
      res.json(staff);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: error.message || "Failed to create staff member" });
    }
  });

  app.patch("/api/staff/:id", async (req, res) => {
    try {
      const validatedData = insertStaffSchema.partial().parse(req.body);
      const staff = await storage.updateStaff(req.params.id, validatedData);
      res.json(staff);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: error.message || "Failed to update staff member" });
    }
  });

  app.delete("/api/staff/:id", async (req, res) => {
    try {
      await storage.deleteStaff(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to delete staff member" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
