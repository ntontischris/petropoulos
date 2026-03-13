"use client";

import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";

interface StatItem {
  value: string;
  label: string;
}

interface AboutStatsProps {
  stats: StatItem[];
}

function parseStatValue(value: string): { number: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { number: 0, suffix: value };
  return { number: parseInt(match[1], 10), suffix: match[2] };
}

export function AboutStats({ stats }: AboutStatsProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 py-20">
      <div className="geometric-pattern absolute inset-0" />
      <Container className="relative z-10">
        <div className="grid gap-8 sm:grid-cols-3">
          {stats.map((stat, index) => {
            const { number, suffix } = parseStatValue(stat.value);
            return (
              <ScrollReveal key={stat.label} delay={index * 0.15}>
                <div className="glass rounded-xl p-8 text-center transition-all duration-300 hover:-translate-y-1">
                  <p className="text-5xl font-bold text-accent">
                    <AnimatedCounter
                      target={number}
                      suffix={suffix}
                      duration={2000}
                    />
                  </p>
                  <p className="mt-3 text-sm font-medium text-primary-200/80">
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
