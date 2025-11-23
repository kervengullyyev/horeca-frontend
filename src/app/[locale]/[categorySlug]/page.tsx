import { cn } from "@/shared/lib/css";
import { Link } from "@/shared/i18n/navigation";
import { Metadata } from "next";
import {
  getCategoryPage,
  getCategoryPageMetadata,
  getCategorySlugs,
} from "@/shared/lib/api";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/shared/i18n/routing";
import { SubCategoryCard } from "@/features/category";

interface Props {
  params: Promise<{ locale: string; categorySlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, categorySlug } = await params;

  setRequestLocale(locale);

  const data = await getCategoryPageMetadata(locale, categorySlug);

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
    },
  };
}

export async function generateStaticParams() {
  const categorySlugs = await getCategorySlugs();

  const locales = routing.locales;

  return locales.flatMap((locale) =>
    categorySlugs.map(({ slug }) => ({
      locale,
      slug,
    })),
  );
}

export default async function CategoryPage({ params }: Props) {
  const { locale, categorySlug } = await params;

  setRequestLocale(locale);

  const data = await getCategoryPage(locale, categorySlug);

  return (
    <>
      <div>
        {data.map((item) => (
          <SubCategoryCard
            key={item.id}
            categorySlug={categorySlug}
            subCategory={item}
          />
        ))}
      </div>
      <div className="hidden lg:block px-4">
        <div className="sticky top-11 h-[calc(100vh-44px)] flex flex-col gap-5 justify-center">
          {data.map((item) => (
            <Link
              key={item.id}
              className={cn(
                "font-semibold text-foreground/70 hover:text-foreground cursor-pointer transition-all",
              )}
              href={`#${item.id}`}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
