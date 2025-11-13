import {
  type NewsletterSubscription,
  type InsertNewsletterSubscription,
  type ContactMessage,
  type InsertContactMessage,
  type BlogPost,
  type Program,
  type Story,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  getAllBlogPosts(): Promise<BlogPost[]>;
  getAllPrograms(): Promise<Program[]>;
  getAllStories(): Promise<Story[]>;
}

export class MemStorage implements IStorage {
  private newsletterSubscriptions: Map<string, NewsletterSubscription>;
  private contactMessages: Map<string, ContactMessage>;
  private blogPosts: Map<string, BlogPost>;
  private programs: Map<string, Program>;
  private stories: Map<string, Story>;

  constructor() {
    this.newsletterSubscriptions = new Map();
    this.contactMessages = new Map();
    this.blogPosts = new Map();
    this.programs = new Map();
    this.stories = new Map();
    this.seedData();
  }

  private seedData() {
    const blogImage = "https://via.placeholder.com/800x600/5A381F/FFFFFF?text=Blog+Post";
    const programImage1 = "https://via.placeholder.com/600x400/5A381F/FFFFFF?text=Women+Empowerment";
    const programImage2 = "https://via.placeholder.com/600x400/5A381F/FFFFFF?text=Youth+Development";
    const programImage3 = "https://via.placeholder.com/600x400/5A381F/FFFFFF?text=Health+Initiatives";

    const blogPosts: BlogPost[] = [
      {
        id: randomUUID(),
        title: "Breaking Barriers: How Women's Literacy Programs Transform Communities",
        excerpt: "Discover the powerful impact of adult literacy programs in empowering women and creating ripple effects of change across entire communities.",
        content: "Full content here...",
        image: blogImage,
        category: "Education",
        readTime: 5,
        publishedAt: new Date("2024-03-15"),
      },
      {
        id: randomUUID(),
        title: "Youth Leadership: Nurturing the Next Generation of Change-Makers",
        excerpt: "Our youth leadership academy is creating a new generation of community leaders equipped with skills and vision for sustainable development.",
        content: "Full content here...",
        image: blogImage,
        category: "Youth",
        readTime: 4,
        publishedAt: new Date("2024-03-10"),
      },
      {
        id: randomUUID(),
        title: "Community Health Champions: A Model for Sustainable Healthcare",
        excerpt: "How training local health volunteers is creating sustainable healthcare access in underserved communities.",
        content: "Full content here...",
        image: blogImage,
        category: "Health",
        readTime: 6,
        publishedAt: new Date("2024-03-05"),
      },
    ];

    const programs: Program[] = [
      {
        id: randomUUID(),
        title: "Women's Economic Empowerment",
        description: "Supporting women entrepreneurs through skills training, microfinance, and market access to build sustainable livelihoods.",
        image: programImage1,
        category: "Economic Development",
      },
      {
        id: randomUUID(),
        title: "Youth Development & Education",
        description: "Providing quality education, mentorship, and vocational training to empower the next generation of leaders.",
        image: programImage2,
        category: "Education",
      },
      {
        id: randomUUID(),
        title: "Community Health Initiatives",
        description: "Improving access to healthcare services and health education in underserved communities across the region.",
        image: programImage3,
        category: "Health",
      },
    ];

    const stories: Story[] = [
      {
        id: randomUUID(),
        name: "Sarah Nakato",
        role: "Program Beneficiary",
        quote: "COMAGEND's women's empowerment program gave me the skills and confidence to start my own business. Today, I employ five women from my community.",
        image: "https://via.placeholder.com/100x100/5A381F/FFFFFF?text=SN",
      },
      {
        id: randomUUID(),
        name: "James Okello",
        role: "Community Leader",
        quote: "The youth development initiatives have transformed our community. Our young people now have hope and opportunities for a better future.",
        image: "https://via.placeholder.com/100x100/5A381F/FFFFFF?text=JO",
      },
      {
        id: randomUUID(),
        name: "Grace Achieng",
        role: "Health Volunteer",
        quote: "Through COMAGEND's health programs, we've been able to reach remote villages and provide essential healthcare services to those who need it most.",
        image: "https://via.placeholder.com/100x100/5A381F/FFFFFF?text=GA",
      },
    ];

    blogPosts.forEach(post => this.blogPosts.set(post.id, post));
    programs.forEach(program => this.programs.set(program.id, program));
    stories.forEach(story => this.stories.set(story.id, story));
  }

  async createNewsletterSubscription(
    insertSubscription: InsertNewsletterSubscription
  ): Promise<NewsletterSubscription> {
    const existing = await this.getNewsletterSubscriptionByEmail(insertSubscription.email);
    if (existing) {
      throw new Error("Email already subscribed");
    }
    
    const id = randomUUID();
    const subscription: NewsletterSubscription = {
      ...insertSubscription,
      id,
      subscribedAt: new Date(),
    };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }

  async getNewsletterSubscriptionByEmail(
    email: string
  ): Promise<NewsletterSubscription | undefined> {
    return Array.from(this.newsletterSubscriptions.values()).find(
      (sub) => sub.email === email
    );
  }

  async createContactMessage(
    insertMessage: InsertContactMessage
  ): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort(
      (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
    );
  }

  async getAllPrograms(): Promise<Program[]> {
    return Array.from(this.programs.values());
  }

  async getAllStories(): Promise<Story[]> {
    return Array.from(this.stories.values());
  }
}

export const storage = new MemStorage();
