"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  const t = useTranslations("common");

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-primary-800">{t("error")}</h1>
      <p className="mt-4 text-secondary-500">{t("errorDescription")}</p>
      <div className="mt-8">
        <Button onClick={reset}>{t("retry")}</Button>
      </div>
    </Container>
  );
}
