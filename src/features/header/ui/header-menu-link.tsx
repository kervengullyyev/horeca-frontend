"use client";

import { Link, usePathname } from "@/shared/i18n/navigation";
import { cn } from "@/shared/lib/css";

export function HeaderMenuLink({
  href,
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const getFirstSegment = (path: string) => path.split("/").filter(Boolean)[0];
  const isCurrentPath =
    getFirstSegment(pathname) === getFirstSegment(href.toString());

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium leading-7 flex items-center transition-[color] cursor-pointer text-foreground/70 hover:text-foreground",
        isCurrentPath &&
          "[box-shadow:inset_0_-1px_0_0_#171717] text-foreground pointer-events-none",
        className,
      )}
      {...props}
    />
  );
}
