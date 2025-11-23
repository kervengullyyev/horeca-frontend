"use client";

import React from "react";
import { Link, usePathname } from "@/shared/i18n/navigation";
import { cn } from "@/shared/lib/css";

export function HeaderMenuLink({
  href,
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const isCurrentPath = pathname.startsWith(href.toString());

  return (
    <Link
      href={href}
      className={cn(
        "h-full text-sm font-medium leading-7 flex items-center transition-colors duration-300 ease-in-out cursor-pointer text-foreground/70 hover:text-foreground",
        isCurrentPath && "text-foreground border-b border-foreground",
        className,
      )}
      {...props}
    />
  );
}

HeaderMenuLink.displayName = "HeaderMenuLink";
