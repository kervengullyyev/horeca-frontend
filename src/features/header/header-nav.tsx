"use client";

import React from "react";
import { usePathname } from "@/shared/i18n/navigation";
import { HeaderMenuLink } from "./ui/header-nav-link";
import { Category } from "@/shared/lib/types";
import { getFirstSegment } from "./model/get-first-segment";

export function HeaderNav({ categories } : { categories: Category[] }) {
  const pathname = usePathname();

  const [underlineStyle, setUnderlineStyle] = React.useState({ left: 0, width: 0 });
  const navRef = React.useRef<HTMLElement>(null);
  const linkRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const currentSegment = getFirstSegment(pathname);

  React.useEffect(() => {
    const updateUnderlinePosition = () => {
      const nav = navRef.current;
      if (!nav) return;
      const activeIndex = categories.findIndex(
        (item) => getFirstSegment(`/${item.slug}`) === currentSegment
      );
      if (activeIndex === -1) {
        setUnderlineStyle({ left: 0, width: 0 });
        return;
      }
      const activeLink = linkRefs.current[activeIndex];
      if (activeLink) {
        const navRect = nav.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        setUnderlineStyle({
          left: linkRect.left - navRect.left,
          width: linkRect.width,
        });
      }
    };
    updateUnderlinePosition();
    window.addEventListener("resize", updateUnderlinePosition);
    return () => window.removeEventListener("resize", updateUnderlinePosition);
  }, [pathname, currentSegment, categories]);

  return (
    <nav
      ref={navRef}
      className="justify-center h-full gap-6 xl:gap-10 hidden w-full lg:w-fit lg:flex relative"
    >
      {categories.map((item, index) => (
        <HeaderMenuLink
          key={item.slug}
          href={`/${item.slug}`}
          ref={(el) => {
            linkRefs.current[index] = el;
          }}
        >
          {item.label}
        </HeaderMenuLink>
      ))}
      <div
        className="absolute bottom-0 h-[1px] bg-foreground transition-all duration-300 ease-in-out pointer-events-none"
        style={{
          left: `${underlineStyle.left}px`,
          width: `${underlineStyle.width}px`,
        }}
      />
    </nav>
  )
}
