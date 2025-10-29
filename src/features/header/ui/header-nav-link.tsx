"use client";

import React from "react";
import { Link, usePathname } from "@/shared/i18n/navigation";
import { cn } from "@/shared/lib/css";
import { getFirstSegment } from "../model/get-first-segment";

export const HeaderMenuLink = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Link>
>(({ href, className, ...props }, ref) => {
  const pathname = usePathname();

  const isCurrentPath = getFirstSegment(pathname) === getFirstSegment(href.toString());

  return (
    <div ref={ref} className="inline-block">
      <Link
        href={href}
        className={cn(
          "h-full text-sm font-medium leading-7 flex items-center transition-colors duration-300 ease-in-out cursor-pointer text-foreground/70 hover:text-foreground",
          isCurrentPath && "text-foreground pointer-events-none",
          className,
        )}
        {...props}
      />
    </div>
  );
});

HeaderMenuLink.displayName = "HeaderMenuLink";
