import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@shared/schema";
import { format } from "date-fns";

import blogImage from "@assets/generated_images/Adult_literacy_project_showcase_171ac1d0.png";

export default function Blog() {
  const { data: blogPosts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const categories = ["All", "Education", "Youth", "Health", "Empowerment", "Gender", "Development"];

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
                Our Stories & Insights
              </h1>
              <p className="font-sans text-lg md:text-xl text-muted-foreground">
                Updates, impact stories, and insights from our work in communities across Africa
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              className="flex flex-wrap justify-center gap-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="px-4 py-2 hover-elevate active-elevate-2 cursor-pointer font-sans"
                  data-testid={`filter-${category.toLowerCase()}`}
                >
                  {category}
                </Badge>
              ))}
            </motion.div>

            {error ? (
              <div className="text-center py-12">
                <p className="font-sans text-lg text-muted-foreground">
                  Unable to load blog posts. Please try again later.
                </p>
              </div>
            ) : isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="h-full flex flex-col overflow-hidden">
                    <Skeleton className="h-56 w-full" />
                    <CardContent className="flex-1 p-6">
                      <div className="space-y-3">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts?.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -8 }}
                    className={index === 0 ? "md:col-span-2 lg:col-span-3" : ""}
                  >
                    <Card className={`h-full flex flex-col hover-elevate active-elevate-2 transition-all overflow-hidden ${index === 0 ? 'lg:flex-row' : ''}`}>
                      <div className={`relative overflow-hidden ${index === 0 ? 'lg:w-1/2 h-64 lg:h-auto' : 'h-56'}`}>
                        <motion.img
                          src={blogImage}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="absolute top-4 left-4">
                          <Badge variant="default" className="font-sans">
                            {post.category}
                          </Badge>
                        </div>
                        {index === 0 && (
                          <div className="absolute top-4 right-4">
                            <Badge variant="secondary" className="font-sans">
                              Featured
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className={`flex flex-col flex-1 ${index === 0 ? 'lg:w-1/2' : ''}`}>
                        <CardContent className={`flex-1 ${index === 0 ? 'p-8 md:p-12' : 'p-6'}`}>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span className="font-sans">{format(new Date(post.publishedAt), "MMMM dd, yyyy")}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span className="font-sans">{post.readTime} min read</span>
                            </div>
                          </div>
                          <h3 className={`font-heading font-semibold mb-3 ${index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                            {post.title}
                          </h3>
                          <p className="font-sans text-muted-foreground">
                            {post.excerpt}
                          </p>
                        </CardContent>
                        <CardFooter className="p-6 pt-0">
                          <Button
                            variant="ghost"
                            className="group font-sans font-medium p-0 h-auto hover:bg-transparent"
                            data-testid={`button-blog-${post.id}`}
                          >
                            Read Article
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </CardFooter>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button
                variant="outline"
                size="lg"
                className="font-sans font-medium"
                data-testid="button-load-more"
              >
                Load More Articles
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
