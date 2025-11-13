import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Quote } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Story } from "@shared/schema";
import "swiper/css";
import "swiper/css/pagination";

export default function StoriesSection() {
  const { data: stories, isLoading, error } = useQuery<Story[]>({
    queryKey: ["/api/stories"],
  });
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Stories of Impact</h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            Real voices from the communities we serve, sharing how our programs have created lasting change.
          </p>
        </motion.div>

        {error ? (
          <div className="text-center py-12">
            <p className="font-sans text-muted-foreground">
              Unable to load stories. Please try again later.
            </p>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-8 h-full">
                <Skeleton className="h-10 w-10 mb-4" />
                <Skeleton className="h-20 w-full mb-6" />
                <div className="flex items-center">
                  <Skeleton className="h-12 w-12 rounded-full mr-3" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="stories-swiper pb-12"
          >
            {stories?.map((story, index) => (
              <SwiperSlide key={story.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Card className="p-8 h-full hover-elevate active-elevate-2 transition-shadow">
                    <Quote className="h-10 w-10 text-primary mb-4" />
                    <p className="font-sans text-foreground mb-6 text-lg leading-relaxed">
                      "{story.quote}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <span className="font-heading font-semibold text-primary text-lg">
                          {story.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-base">{story.name}</h4>
                        <p className="font-sans text-sm text-muted-foreground">{story.role}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
