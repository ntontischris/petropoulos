import { Container } from "./container";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 py-24 md:py-32">
      <div className="geometric-pattern absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/30 to-transparent" />
      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="accent-bar accent-bar-center">
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>
          </div>
          {subtitle && (
            <p className="mt-4 text-lg leading-relaxed text-primary-200/90">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
