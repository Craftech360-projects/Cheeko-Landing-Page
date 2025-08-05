"use client";

import * as React from "react";
import { OptimizedImage as Image } from "@/components/OptimizedImage";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button, Container, Typography } from "@/components/ui";
import { FadeIn, SlideIn } from "@/components/animations";

const Hero: React.FC = () => {
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  return (
    <section id="hero" className="min-h-screen overflow-hidden mt-5">
      <Container>
        <div className="relative z-10 grid lg:grid-cols-2 gap-0 sm:gap-2 lg:gap-12 items-stretch min-h-[80vh] bg-orange-600 rounded-2xl mt-16 lg:mt-24 overflow-hidden">
          {/* Floating UI Elements */}
          <motion.div
            className="absolute -top-4 -left-3 lg:-top-8 lg:-left-6 z-0"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/icons/Ball.png"
              alt="Floating Icon 1"
              width={100}
              height={100}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40"
            />
          </motion.div>

          <motion.div
            className="absolute -bottom-1 -left-5 lg:-bottom-2 lg:-left-10 z-0"
            animate={{ x: [0, 10, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <Image
              src="/icons/Triangle.png"
              alt="Floating Icon 2"
              width={100}
              height={100}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40"
            />
          </motion.div>

          <motion.div
            className="absolute left-1/2 -top-4 lg:-top-8 z-0"
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <Image
              src="/icons/Rounded.png"
              alt="Floating Icon 3"
              width={100}
              height={100}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40"
            />
          </motion.div>

          <motion.div
            className="absolute -right-35 -bottom-8 lg:-right-40 lg:-top-30 z-0"
            animate={{ rotate: 0 }}
            transition={{
              duration: 0,
            }}
          >
            <Image
              src="/icons/Ellipse.png"
              alt="Ellipse Ring"
              width={400}
              height={400}
              className="w-72 h-72 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-[400px] lg:h-[400px] xl:w-[480px] xl:h-[480px]"
            />
          </motion.div>

          {/* Left Content */}
          <div className="relative z-20 order-1 lg:order-1 lg:px-22 py-6 sm:py-8 lg:py-16 px-4 lg:flex lg:items-center">
            <FadeIn direction="up" delay={0.4}>
              <div className="space-y-2 sm:space-y-4 lg:space-y-6">
                {/* MEET CHEEKO with reduced line height */}
                <div>
                  <Typography
                    variant="h1"
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-clip-text text-neutral-00 leading-none tracking-wide"
                  >
                    MEET
                    <br />
                    CHEEKO
                  </Typography>
                </div>

                {/* Your Child's AI Learning Buddy - split into two lines */}
                <div>
                  <Typography
                    variant="h1"
                    className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-00 leading-none tracking-normal"
                  >
                    Your Child's AI
                    <br />
                    Learning Buddy
                  </Typography>
                </div>

                {/* Description text */}
                <div className="mt-4 sm:mt-4 lg:mt-0">
                  <FadeIn direction="up" delay={0.6}>
                    <Typography
                      variant="lead"
                      className="text-lg sm:text-xl text-muted-foreground max-w-2xl text-neutral-00 font-medium"
                    >
                      From bedtime stories to curious mornings, Cheeko is your
                      child's joyful AI companion, anytime.
                    </Typography>
                  </FadeIn>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="relative order-2 lg:order-2 self-end">
            <SlideIn direction="right" delay={0.6}>
              <div className="relative">
                {/* Main Product Image */}
                <motion.div
                  className="relative z-10"
                >
                  <div className="relative w-full h-[250px] sm:h-[400px] lg:h-[600px]">
                    {/* Hero Image */}
                    <Image
                      src="/images/hero_image.png"
                      alt="CheekoAI - Your Voice Activated Friend"
                      fill
                      className="object-contain"
                      priority
                      style={{
                        objectPosition: "bottom right",
                      }}
                    />
                  </div>
                </motion.div>

                {/* Background Glow Effect */}
                {/* <div className="absolute inset-0 bg-gradient-to-r from-neutral-00 to-neutral-00 opacity-20 blur-3xl -z-10 scale-110"></div> */}
              </div>
            </SlideIn>
          </div>
        </div>
      </Container>

      {/* Video Modal (placeholder) */}
      {isVideoPlaying && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsVideoPlaying(false)}
        >
          <motion.div
            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full aspect-video"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring" as const,
              stiffness: 300,
              damping: 30,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Play className="w-16 h-16 text-primary-600 mx-auto" />
                <div className="text-xl font-semibold text-primary-700">
                  Product Demo Video
                </div>
                <div className="text-muted-foreground">
                  Video content would be embedded here
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsVideoPlaying(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export { Hero };
