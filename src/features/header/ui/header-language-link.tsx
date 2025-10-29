"use client";

import { Link, usePathname } from "@/shared/i18n/navigation";
import { cn } from "@/shared/lib/css";
import { useLocale } from "next-intl";

export function HeaderLanguageLink({
  code,
  children
}: { code: string, children: React.ReactNode }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <Link
      href={pathname}
      locale={code}
      className={cn(
        "text-sm transition-all font-medium w-full py-[3px] block rounded-full px-2.5 flex items-center justify-between",
        locale === code && "bg-background pointer-events-none"
      )}
    >{children}</Link>
  );
}
