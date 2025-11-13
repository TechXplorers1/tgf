import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      return await apiRequest("POST", "/api/newsletter", { email });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      newsletterMutation.mutate(email);
    }
  };

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const programs = [
    { href: "/#programs", label: "Gender Equality" },
    { href: "/#programs", label: "Youth Development" },
    { href: "/#programs", label: "Community Health" },
    { href: "/#programs", label: "Economic Empowerment" },
  ];

  return (
    <footer className="relative bg-card border-t border-card-border overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wave-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 Q 25 25, 50 50 T 100 50" stroke="currentColor" fill="none" strokeWidth="2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave-pattern)"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-xl">C</span>
              </div>
              <h3 className="font-heading font-bold text-xl">COMAGEND</h3>
            </div>
            <p className="text-muted-foreground mb-4 font-sans text-sm">
              Community Advocacy for Gender and Development. Empowering African communities through sustainable programs and initiatives.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="h-9 w-9" data-testid="button-social-facebook" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9" data-testid="button-social-twitter" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9" data-testid="button-social-instagram" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9" data-testid="button-social-linkedin" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="text-muted-foreground hover:text-primary transition-colors font-sans text-sm" data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h4 className="font-heading font-semibold text-lg mb-4">Our Programs</h4>
            <ul className="space-y-2">
              {programs.map((program) => (
                <li key={program.label}>
                  <a href={program.href} className="text-muted-foreground hover:text-primary transition-colors font-sans text-sm" data-testid={`link-program-${program.label.toLowerCase().replace(/\s+/g, '-')}`}>
                    {program.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h4 className="font-heading font-semibold text-lg mb-4">Stay Connected</h4>
            <p className="text-muted-foreground mb-4 font-sans text-sm">
              Subscribe to our newsletter for updates on our programs and impact.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="font-sans"
                data-testid="input-newsletter-email"
                aria-label="Email address"
              />
              <Button
                type="submit"
                variant="default"
                className="w-full font-sans font-medium"
                disabled={newsletterMutation.isPending}
                data-testid="button-newsletter-subscribe"
              >
                {newsletterMutation.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="font-sans">info@comagend.org</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span className="font-sans">+123 456 7890</span>
              </div>
              <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span className="font-sans">Kampala, Uganda</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground font-sans">
              © {new Date().getFullYear()} COMAGEND. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
