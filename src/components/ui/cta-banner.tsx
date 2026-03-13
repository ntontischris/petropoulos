import { Container } from "./container";
import { Button } from "./button";
import { Link } from "@/i18n/navigation";

interface CtaBannerProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  href: string;
}

export function CtaBanner({
  title,
  subtitle,
  buttonText,
  href,
}: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 py-20">
      <div className="geometric-pattern absolute inset-0" />
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
      <Container className="relative z-10 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-200/90">
            {subtitle}
          </p>
        )}
        <div className="mt-10">
          <Link href={href}>
            <Button
              variant="secondary"
              size="lg"
              className="animate-pulse-glow"
            >
              {buttonText}
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
