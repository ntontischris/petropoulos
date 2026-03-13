"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export function HeroSection({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
}: HeroSectionProps) {
  const words = title.split(" ");

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800">
      {/* Geometric pattern */}
      <div className="geometric-pattern absolute inset-0" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-950/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/40 to-transparent" />

      {/* Floating shapes */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[15%] top-[20%] h-32 w-32 rounded-2xl border border-accent/10 bg-accent/5"
      />
      <motion.div
        animate={{ y: [10, -15, 10], rotate: [0, -3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[25%] right-[25%] h-48 w-48 rounded-full border border-white/5 bg-white/[0.03]"
      />
      <motion.div
        animate={{ y: [-5, 12, -5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[10%] top-[60%] h-20 w-20 rounded-lg border border-accent/[0.08] bg-accent/[0.03]"
      />

      <Container className="relative z-10">
        <div className="max-w-3xl">
          {/* Gold accent line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 h-1 rounded-full bg-gradient-to-r from-accent to-accent-light"
          />

          {/* Title with staggered word reveal */}
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                className="mr-[0.3em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-6 text-lg leading-relaxed text-primary-200/90 sm:text-xl"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link href="/booking">
              <Button variant="secondary" size="lg">
                {ctaPrimary}
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:border-white/50 hover:bg-white/10"
              >
                {ctaSecondary}
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-primary-300/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
