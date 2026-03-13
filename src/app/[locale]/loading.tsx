import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center">
      <div className="relative">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-100 border-t-accent" />
        <div className="absolute inset-0 animate-ping rounded-full border-2 border-accent/20" />
      </div>
      <p className="mt-6 flex items-center gap-1 text-lg font-bold text-primary-800">
        <span>Group</span>
        <span className="gradient-text">110</span>
      </p>
      <div className="mt-6 w-64 space-y-3">
        <div className="h-3 animate-pulse rounded-full bg-secondary-100" />
        <div className="mx-auto h-3 w-3/4 animate-pulse rounded-full bg-secondary-100" />
        <div className="mx-auto h-3 w-1/2 animate-pulse rounded-full bg-secondary-100" />
      </div>
    </Container>
  );
}
