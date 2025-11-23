import { BannerComp, SubBannerComp } from "@/features/home";
import { getBanners, getSubBanners } from "@/shared/lib/api";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Home" });

  return {
    title: t("meta-title"),
    description: t("meta-description"),
    openGraph: {
      title: t("meta-title"),
      description: t("meta-description"),
    },
  };
}

export default async function Home() {
  const banners = await getBanners();
  const subBanners = await getSubBanners();

  return (
    <>
      <section className="space-y-3">
        {banners.map((item) => (
          <BannerComp key={item.id} banner={item} />
        ))}
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3">
        {subBanners.map((item) => (
          <SubBannerComp key={item.id} banner={item} />
        ))}
      </section>
    </>
  );
}
