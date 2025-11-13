import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { Users, Heart, Award, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, value: 15000, label: "Lives Impacted", suffix: "+" },
  { icon: Heart, value: 250, label: "Active Programs", suffix: "+" },
  { icon: Award, value: 12, label: "Years of Service", suffix: "" },
  { icon: TrendingUp, value: 95, label: "Success Rate", suffix: "%" },
];

export default function StatsSection() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="py-16 md:py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.45,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-primary-foreground/10 p-4 rounded-lg">
                    <Icon className="h-8 w-8 md:h-10 md:w-10" />
                  </div>
                </div>
                <div className="font-heading font-bold text-4xl md:text-5xl mb-2" data-testid={`stat-value-${index}`}>
                  {inView && (
                    <>
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={2.5}
                        separator=","
                        useEasing={true}
                      />
                      {stat.suffix}
                    </>
                  )}
                </div>
                <p className="font-sans text-sm md:text-base text-primary-foreground/80">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
