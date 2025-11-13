import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import StatsSection from "@/components/StatsSection";
import ProgramsSection from "@/components/ProgramsSection";
import StoriesSection from "@/components/StoriesSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { HandHeart, Users, Handshake } from "lucide-react";

export default function Home() {
  const ctaCards = [
    {
      icon: HandHeart,
      title: "Support Our Cause",
      description: "Your contribution helps us create lasting change in communities across Africa.",
      cta: "Make a Difference",
      color: "bg-chart-2/10",
    },
    {
      icon: Users,
      title: "Volunteer With Us",
      description: "Join our team of dedicated volunteers and directly impact lives in your community.",
      cta: "Join Our Team",
      color: "bg-chart-3/10",
    },
    {
      icon: Handshake,
      title: "Partner With Us",
      description: "Collaborate with COMAGEND to amplify our impact and reach more communities.",
      cta: "Become a Partner",
      color: "bg-chart-4/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroCarousel />
        
        <StatsSection />
        
        <ProgramsSection />
        
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">How You Can Help</h2>
              <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
                There are many ways to support our mission and make a meaningful difference in the lives of those we serve.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ctaCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Card className="p-8 text-center h-full flex flex-col hover-elevate active-elevate-2 transition-all">
                      <div className={`inline-flex p-4 rounded-lg ${card.color} mx-auto mb-6`}>
                        <Icon className="h-8 w-8 text-foreground" />
                      </div>
                      <h3 className="font-heading font-semibold text-xl mb-3">{card.title}</h3>
                      <p className="font-sans text-muted-foreground mb-6 flex-1">{card.description}</p>
                      <Button
                        variant="default"
                        className="font-sans font-medium w-full"
                        data-testid={`button-cta-${index}`}
                      >
                        {card.cta}
                      </Button>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <StoriesSection />

        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Ready to Make a Difference?</h2>
              <p className="font-sans text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-8">
                Join us in our mission to empower communities and create sustainable change across Africa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="font-sans font-medium"
                  data-testid="button-cta-get-involved"
                >
                  Get Involved Today
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-sans font-medium bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                  data-testid="button-cta-learn-more"
                >
                  Learn More About Us
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
