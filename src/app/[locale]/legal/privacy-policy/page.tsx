import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "PrivacyPolicy" });

  return {
    title: t("meta-title"),
    description: t("meta-description"),
    openGraph: {
      title: t("meta-title"),
      description: t("meta-description"),
    },
  };
}

export default async function PrivacyPolicy() {
  return <>Privacy</>;
}
