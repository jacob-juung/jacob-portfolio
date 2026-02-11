import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 text-sm text-text-secondary">
      <p>
        &copy; {year} Jacob. {t("copyright")}
      </p>
    </footer>
  );
}
