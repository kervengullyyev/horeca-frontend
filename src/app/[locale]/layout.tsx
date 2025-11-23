import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/shared/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { AppHeader } from "@/features/header";
import { getCategories } from "@/shared/lib/api";
import { Toaster } from "@/shared/ui/kit/sonner";
import { AppFooter } from "@/features/footer";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const categories = await getCategories(locale);

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={`${plusJakarta.className} antialiased`}>
        <NextIntlClientProvider>
          <AppHeader categories={categories} />
          {children}
          <AppFooter categories={categories} />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
