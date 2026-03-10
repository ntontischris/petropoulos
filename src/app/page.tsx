import { BRAND } from "@/lib/constants";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <h1 className="text-4xl font-bold text-primary-800">{BRAND.fullName}</h1>
      <p className="mt-4 text-lg text-secondary-500">{BRAND.tagline}</p>
    </main>
  );
}
