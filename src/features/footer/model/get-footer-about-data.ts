import { getTranslations } from "next-intl/server";
import { FooterLink } from "./types";

export async function getFooterAboutData() {
  const t = await getTranslations("Footer.About");

  const label = t("label");

  const links: FooterLink[] = [
    { label: t("about-us"), link: "/about-us" },
    { label: t("contact-us"), link: "/contact-us" },
    { label: t("services"), link: "/services" },
    { label: t("terms-and-comditions"), link: "/legal/terms-and-conditions" },
    { label: t("privacy-policy"), link: "/legal/privacy-policy" },
  ];

  return { label, links };
}
