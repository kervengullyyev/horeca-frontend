import { ProductDetailSection } from "@/features/product";
import { routing } from "@/shared/i18n/routing";
import {
  getProductDetail,
  getProductPageMetadata,
  getProductSlugs,
} from "@/shared/lib/api";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

interface Props {
  params: Promise<{
    locale: string;
    categorySlug: string;
    productSlug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, productSlug } = await params;

  setRequestLocale(locale);

  const data = await getProductPageMetadata(locale, productSlug);

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
    },
  };
}

export async function generateStaticParams() {
  const locales = routing.locales;

  const productSlugs = await getProductSlugs();

  return locales.flatMap((locale) =>
    productSlugs.map(({ slug, categorySlug }) => ({
      locale,
      productSlug: slug,
      categorySlug,
    })),
  );
}

export default async function ProductPage({ params }: Props) {
  const { locale, productSlug } = await params;

  const product = await getProductDetail(locale, productSlug);

  return (
    <>
      <ProductDetailSection product={product} />
    </>
  );
}
