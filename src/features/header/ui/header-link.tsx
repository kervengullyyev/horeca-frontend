"use client";

import { Link, usePathname } from "@/shared/i18n/navigation";
import { cn } from "@/shared/lib/css";

export function HeaderLink({
  href,
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const isCurrentPath = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "h-full hidden sm:flex items-center px-3 text-foreground/80 hover:text-foreground transition-[color]",
        isCurrentPath && "text-foreground pointer-events-none",
        className,
      )}
      {...props}
    />
  );
}
