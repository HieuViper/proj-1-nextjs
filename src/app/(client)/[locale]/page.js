import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Index");
  return (
    <div className="text-center">
      <h1>{t("title")}</h1>
    </div>
  );
}
