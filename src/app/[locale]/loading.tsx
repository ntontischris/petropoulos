import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <Container className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-800" />
    </Container>
  );
}
