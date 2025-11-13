import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Program } from "@shared/schema";
import "swiper/css";
import "swiper/css/navigation";

import programImage1 from "@assets/generated_images/Women_economic_empowerment_program_d8422519.png";
import programImage2 from "@assets/generated_images/Youth_development_program_ecd0f2bd.png";
import programImage3 from "@assets/generated_images/Community_health_program_b7634ba0.png";

const programImages: Record<string, string> = {
  "Women's Economic Empowerment": programImage1,
  "Youth Development & Education": programImage2,
  "Community Health Initiatives": programImage3,
};

export default function ProgramsSection() {
  const { data: programs, isLoading, error } = useQuery<Program[]>({
    queryKey: ["/api/programs"],
  });
  return (
    <section id="programs" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Our Programs</h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how we're making a lasting impact through targeted initiatives that empower communities and create sustainable change.
          </p>
        </motion.div>

        {error ? (
          <div className="text-center py-12">
            <p className="font-sans text-muted-foreground">
              Unable to load programs. Please try again later.
            </p>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-full">
                <Skeleton className="h-56 w-full" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <Swiper
                modules={[Navigation]}
                spaceBetween={24}
                slidesPerView={1}
                navigation
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="programs-swiper"
              >
                {programs?.map((program, index) => (
                  <SwiperSlide key={program.id}>
                    <ProgramCard program={program} index={index} image={programImages[program.title] || programImage1} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="md:hidden grid grid-cols-1 gap-6">
              {programs?.map((program, index) => (
                <ProgramCard key={program.id} program={program} index={index} image={programImages[program.title] || programImage1} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function ProgramCard({ program, index, image }: { program: Program; index: number; image: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.45,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden hover-elevate active-elevate-2 transition-shadow">
        <div className="relative h-56 overflow-hidden">
          <motion.img
            src={image}
            alt={program.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-sans font-medium">
              {program.category}
            </span>
          </div>
        </div>
        <CardContent className="flex-1 p-6">
          <h3 className="font-heading font-semibold text-xl mb-3">{program.title}</h3>
          <p className="font-sans text-muted-foreground">{program.description}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button
            variant="ghost"
            className="group font-sans font-medium p-0 h-auto hover:bg-transparent"
            data-testid={`button-program-${program.id}`}
          >
            Learn More
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
