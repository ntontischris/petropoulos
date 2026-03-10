import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

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
  return (
    <section className="relative flex min-h-[85vh] items-center bg-primary-900">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-950/90 to-primary-900/70" />

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-primary-200 sm:text-xl">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/booking">
              <Button variant="secondary" size="lg">
                {ctaPrimary}
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                {ctaSecondary}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
