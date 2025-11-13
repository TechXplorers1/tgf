import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Users, Award, ExternalLink } from "lucide-react";

import projectImage from "@assets/generated_images/Adult_literacy_project_showcase_171ac1d0.png";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Women's Literacy & Skills Development",
      category: "Education",
      description: "A comprehensive program providing adult literacy classes and vocational skills training to women in rural communities, enabling economic independence and community leadership.",
      image: projectImage,
      stats: {
        duration: "2022 - Present",
        beneficiaries: "5,000+ women",
        partners: "Local Education Authority, Women's Cooperative",
        outcomes: "85% participants now literate, 60% started small businesses",
      },
    },
    {
      id: 2,
      title: "Youth Leadership Academy",
      category: "Youth Development",
      description: "An intensive leadership and entrepreneurship training program for young people aged 18-25, equipping them with skills to become change-makers in their communities.",
      image: projectImage,
      stats: {
        duration: "2021 - Present",
        beneficiaries: "2,500+ youth",
        partners: "University Partnership, Business Incubators",
        outcomes: "200+ youth-led initiatives launched, 75% employment rate",
      },
    },
    {
      id: 3,
      title: "Community Health Champions",
      category: "Health",
      description: "Training community health volunteers to provide essential healthcare education and services in underserved areas, improving health outcomes and awareness.",
      image: projectImage,
      stats: {
        duration: "2020 - Present",
        beneficiaries: "25,000+ community members",
        partners: "Ministry of Health, Local Clinics",
        outcomes: "40% reduction in preventable diseases, 150 trained health volunteers",
      },
    },
  ];

  const galleryImages = [
    projectImage,
    projectImage,
    projectImage,
    projectImage,
    projectImage,
    projectImage,
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
                Our Projects
              </h1>
              <p className="font-sans text-lg md:text-xl text-muted-foreground">
                Transforming communities through sustainable development initiatives
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Card className="overflow-hidden">
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                      <div className={`relative h-72 lg:h-auto ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-sans font-medium">
                            {project.category}
                          </span>
                        </div>
                      </div>
                      <div className={`p-8 md:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                        <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                          {project.title}
                        </h2>
                        <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        <Card className="bg-muted/50 p-6 mb-6 border-0">
                          <h3 className="font-heading font-semibold text-lg mb-4">Project Overview</h3>
                          <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                              <Calendar className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-sans font-medium text-sm">Duration</p>
                                <p className="font-sans text-sm text-muted-foreground">{project.stats.duration}</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <Users className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-sans font-medium text-sm">Beneficiaries</p>
                                <p className="font-sans text-sm text-muted-foreground">{project.stats.beneficiaries}</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <Award className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-sans font-medium text-sm">Partners</p>
                                <p className="font-sans text-sm text-muted-foreground">{project.stats.partners}</p>
                              </div>
                            </div>
                          </div>
                        </Card>

                        <div className="mb-6">
                          <h4 className="font-heading font-semibold text-base mb-2">Key Outcomes</h4>
                          <p className="font-sans text-sm text-muted-foreground">{project.stats.outcomes}</p>
                        </div>

                        <Button
                          variant="default"
                          className="font-sans font-medium w-full sm:w-auto"
                          data-testid={`button-project-${project.id}`}
                        >
                          Read Full Report
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Impact in Action</h2>
              <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
                Visual stories from our projects showcasing the transformation happening in communities.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-md group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ scale: 1.05 }}
                  data-testid={`gallery-image-${index}`}
                >
                  <img
                    src={image}
                    alt={`Project gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white font-sans font-medium">View Image</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
