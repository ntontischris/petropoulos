import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Home, Wrench, Phone } from "lucide-react";

export default function NotFound() {
  const t = useTranslations("common");

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <h1 className="animate-float text-8xl font-bold gradient-text sm:text-9xl">
        404
      </h1>
      <p className="mt-6 text-xl text-secondary-500">{t("notFound")}</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/">
          <Button variant="secondary">
            <Home className="mr-2 h-4 w-4" />
            {t("goHome")}
          </Button>
        </Link>
        <Link href="/services">
          <Button variant="outline">
            <Wrench className="mr-2 h-4 w-4" />
            Services
          </Button>
        </Link>
        <Link href="/contact">
          <Button variant="ghost">
            <Phone className="mr-2 h-4 w-4" />
            Contact
          </Button>
        </Link>
      </div>
    </Container>
  );
}
