// client/src/components/StoriesSection.tsx

import { useState, useEffect } from "react";
import type { TouchEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type StoryCategory = "beneficiary" | "volunteer" | "partner";

type Story = {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  cta: string;
  category: StoryCategory;
};

type StoriesSectionProps = {
  onSupportChild?: () => void;
  onVolunteer?: () => void;
  onPartner?: () => void;
};

const stories: Story[] = [
  {
    id: "amina",
    title: "Amina's Story",
    subtitle: "From Street to School",
    content:
      "Amina, 10, once sold fruits on the roadside to support her family. Today, she attends school full-time through our education initiative. With access to meals, books, and guidance, she dreams of becoming a nurse to help her community.",
    image:
      "https://images.pexels.com/photos/1720187/pexels-photo-1720187.jpeg?auto=compress&cs=tinysrgb&w=800",
    cta: "Support a Child Like Amina",
    category: "beneficiary",
  },
  {
    id: "nandi",
    title: "Nandi's Story",
    subtitle: "Sharing Skills, Changing Lives",
    content:
      'Nandi, a young university student from South Africa, volunteers every weekend teaching girls basic digital skills and confidence-building. "I believe education is the real empowerment," she says.',
    image:
      "https://images.pexels.com/photos/1181524/pexels-photo-1181524.jpeg?auto=compress&cs=tinysrgb&w=800",
    cta: "Join Our Volunteer Family",
    category: "volunteer",
  },
  {
    id: "ubuntu-foundation",
    title: "Ubuntu Foundation",
    subtitle: "Empowering Through Partnership",
    content:
      "In partnership with Ubuntu Foundation, we launched 50 digital learning hubs across Cameroon and Kenya, providing access to technology, training, and mentorship for over 3,500 children.",
    image:
      "https://images.pexels.com/photos/1181400/pexels-photo-1181400.jpeg?auto=compress&cs=tinysrgb&w=800",
    cta: "Partner With Us",
    category: "partner",
  },
];

const AUTO_SLIDE_INTERVAL = 8000; // ms
const SWIPE_THRESHOLD = 50; // px

export default function StoriesSection({
  onSupportChild,
  onVolunteer,
  onPartner,
}: StoriesSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const currentStory = stories[currentIndex];

  const handleCtaClick = () => {
    if (currentStory.category === "beneficiary") {
      onSupportChild?.();
    } else if (currentStory.category === "volunteer") {
      onVolunteer?.();
    } else if (currentStory.category === "partner") {
      onPartner?.();
    }
  };

  // Auto-slide (pauses when hovered)
  useEffect(() => {
    if (isHovered) return;

    const id = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }, AUTO_SLIDE_INTERVAL);

    return () => window.clearInterval(id);
  }, [isHovered]);

  // Touch / swipe handlers (mobile)
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX;

    if (deltaX > SWIPE_THRESHOLD) {
      // swipe right → previous
      prevStory();
    } else if (deltaX < -SWIPE_THRESHOLD) {
      // swipe left → next
      nextStory();
    }

    setTouchStartX(null);
  };

  return (
    <section
      id="impact"
      className="py-16 md:py-24 bg-muted/30 scroll-mt-16"
    >
      <div className="container px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Impact Stories
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories of transformation and hope from our community
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Card className="overflow-hidden border">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStory.id}
                  className="grid grid-cols-1 lg:grid-cols-5 gap-0"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* image left – fills full card height */}
                  <div className="lg:col-span-2 relative min-h-[260px] md:min-h-[320px]">
                    <img
                      src={currentStory.image}
                      alt={currentStory.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>

                  {/* text right */}
                  <CardContent className="lg:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                    <div className="mb-4">
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        {currentStory.title}
                      </h3>
                      <p className="text-lg text-primary font-medium">
                        {currentStory.subtitle}
                      </p>
                    </div>
                    <p className="text-foreground/80 leading-relaxed mb-6 text-base md:text-lg">
                      {currentStory.content}
                    </p>
                    <Button
                      onClick={handleCtaClick}
                      variant="default"
                      className="w-full sm:w-auto group"
                    >
                      {currentStory.cta}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </motion.div>
              </AnimatePresence>
            </Card>
          </div>

          {/* arrows + dots */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              onClick={prevStory}
              variant="outline"
              size="icon"
              className="h-10 w-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex gap-2">
              {stories.map((story, index) => (
                <button
                  key={story.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to story ${index + 1}`}
                />
              ))}
            </div>

            <Button
              onClick={nextStory}
              variant="outline"
              size="icon"
              className="h-10 w-10"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
