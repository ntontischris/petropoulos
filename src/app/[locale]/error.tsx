"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  const t = useTranslations("common");

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-accent-50 shadow-card">
        <AlertTriangle className="h-10 w-10 text-accent" />
      </div>
      <h1 className="text-3xl font-bold text-primary-800">{t("error")}</h1>
      <p className="mt-4 max-w-md text-secondary-500">
        {t("errorDescription")}
      </p>
      <div className="mt-8">
        <Button onClick={reset} variant="secondary">
          {t("retry")}
        </Button>
      </div>
    </Container>
  );
}
