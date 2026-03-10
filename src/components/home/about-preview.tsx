import { Container } from "@/components/ui/container";

interface StatItem {
  value: string;
  label: string;
}

interface AboutPreviewProps {
  title: string;
  description: string;
  stats: StatItem[];
}

export function AboutPreview({ title, description, stats }: AboutPreviewProps) {
  return (
    <section className="py-20 bg-background-alt">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-primary-800 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-secondary-500">
            {description}
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-bold text-accent">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-secondary-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
