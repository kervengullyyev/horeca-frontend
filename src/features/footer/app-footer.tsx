import { Separator } from "@/shared/ui/kit/separator";
import { GalleryHorizontal } from "lucide-react";
import { LanguagePopover } from "./language-popover";
import { Link } from "@/shared/i18n/navigation";
import { Category } from "@/shared/lib/types";
import { getTranslations } from "next-intl/server";
import { getFooterAboutData } from "./model/get-footer-about-data";
import { getFooterContactLinks } from "./model/get-footer-contact-links";

export async function AppFooter({ categories }: { categories: Category[] }) {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();
  const aboutData = await getFooterAboutData();
  const contactLinks = getFooterContactLinks();

  return (
    <footer className="px-5 border-t">
      <div className="max-w-7xl mx-auto flex flex-col gap-3 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 py-5">
          <div className="flex flex-col gap-3">
            <GalleryHorizontal />
            <p className="text-muted-foreground text-sm">{t("description")}</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-medium">{t("categories")}</div>
            <div className="flex flex-col gap-2">
              {categories.map((item) => (
                <Link
                  key={item.id}
                  href={`/${item.slug}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-all"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-medium">{aboutData.label}</div>
            <div className="flex flex-col gap-2">
              {aboutData.links.map((item) => (
                <Link
                  key={item.link}
                  href={item.link}
                  className="text-sm text-muted-foreground hover:text-foreground transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-medium">{t("contact")}</div>
            <div className="flex flex-col gap-2">
              {contactLinks.map((item) => (
                <Link
                  key={item.link}
                  href={item.link}
                  className="text-sm text-muted-foreground hover:text-foreground transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex justify-between items-center flex-wrap gap-2">
          <span className="text-muted-foreground text-sm">
            {t("copyright", { year: year, title: "EGM HORECA" })}
          </span>
          <div className="flex gap-3 items-center">
            <LanguagePopover />
            <div className="text-muted-foreground text-sm">
              {t.rich("made-by", {
                company: (chunks) => (
                  <Link
                    href="/terms"
                    className="transition-all hover:text-foreground"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
