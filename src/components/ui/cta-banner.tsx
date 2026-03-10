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
    <section className="bg-primary-800 py-16">
      <Container className="text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-200">
            {subtitle}
          </p>
        )}
        <div className="mt-8">
          <Link href={href}>
            <Button variant="secondary" size="lg">
              {buttonText}
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
