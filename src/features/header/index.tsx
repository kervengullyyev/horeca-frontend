"use client";

import React, { useState, useRef, useEffect } from "react";
import { Logo, ShoppingBag } from "@/shared/ui/icons";
import { Search } from "lucide-react";
import { HeaderMenuLink } from "./ui/header-menu-link";
import { HeaderLink } from "./ui/header-link";
import { Category } from "@/shared/lib/types";
import { HeaderLanguageLink } from "./ui/header-language-link";
import { usePathname } from "@/shared/i18n/navigation";

export function AppHeader({ categories } : { categories: Category[] }) {
  const languages = [
    { label: "RO", code: "ro" },
    { label: "EN", code: "en" },
  ];
  const pathname = usePathname();
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getFirstSegment = (path: string) => path.split("/").filter(Boolean)[0];
  const currentSegment = getFirstSegment(pathname);

  useEffect(() => {
    const updateUnderlinePosition = () => {
      const nav = navRef.current;
      if (!nav) return;

      // Find the active link index
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
    <>
      <header
        className="fixed top-0 w-full z-50 flex flex-col items-center backdrop-blur-xl bg-background/80 ease-in-out transition-header"
        style={{
          boxShadow: "inset 0 -1px 0 0 #e2e2e2",
        }}
      >
        <div className="px-2 h-11 flex items-center justify-between mx-auto gap-15 w-full lg:w-fit">
          <HeaderLink className="flex" href={"/"}>
            <Logo />
          </HeaderLink>
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
            {/* Animated underline indicator */}
            <div
              className="absolute bottom-0 h-[1px] bg-foreground transition-all duration-300 ease-in-out pointer-events-none"
              style={{
                left: `${underlineStyle.left}px`,
                width: `${underlineStyle.width}px`,
              }}
            />
          </nav>
          <div className="h-full flex justify-center">
            <div className="flex items-center px-2 sm:px-3">
              <div className="flex rounded-full bg-foreground/7 p-1">
                {languages.map((item) => (
                  <HeaderLanguageLink key={item.code} code={item.code}>
                    {item.label}
                  </HeaderLanguageLink>
                ))}
              </div>
            </div>
            <HeaderLink href={"/search"}>
              <Search size={20} strokeWidth={1.7} />
            </HeaderLink>
            <HeaderLink href={"/bag"}>
              <ShoppingBag />
            </HeaderLink>
          </div>
        </div>
      </header>
      <div className="h-11" />
    </>
  );
}
