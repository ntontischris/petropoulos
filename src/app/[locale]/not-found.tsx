import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("common");

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-primary-800">404</h1>
      <p className="mt-4 text-lg text-secondary-500">{t("notFound")}</p>
      <div className="mt-8">
        <Link href="/">
          <Button>{t("goHome")}</Button>
        </Link>
      </div>
    </Container>
  );
}
