import React from "react";
import { Logo, ShoppingBag } from "@/shared/ui/icons";
import { Search } from "lucide-react";
import { HeaderMenuLink } from "./ui/header-menu-link";
import { HeaderLink } from "./ui/header-link";
import { Category } from "@/shared/lib/types";
import { HeaderLanguageLink } from "./ui/header-language-link";

export function AppHeader({ categories } : { categories: Category[] }) {
  const languages = [
    { label: "RO", code: "ro" },
    { label: "EN", code: "en" },
  ];

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
          <div className="justify-center h-full gap-6 xl:gap-10 hidden w-full lg:w-fit lg:flex">
            {categories.map((item) => (
              <HeaderMenuLink key={item.slug} href={`/${item.slug}`}>
                {item.label}
              </HeaderMenuLink>
            ))}
          </div>
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
