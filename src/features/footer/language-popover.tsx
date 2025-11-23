"use client";

import { Button } from "@/shared/ui/kit/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/kit/popover";
import { Check } from "lucide-react";
import { useLanguages } from "./model/use-languages";
import { Link, usePathname } from "@/shared/i18n/navigation";
import { useLocale } from "next-intl";

export function LanguagePopover() {
  const locale = useLocale();
  const pathname = usePathname();
  const languages = useLanguages();

  const currentLanguage = languages.find((item) => item.locale === locale);

  return (
    <Popover>
      <PopoverTrigger asChild>
        {currentLanguage && (
          <Button variant={"ghost"} className="text-foreground">
            <currentLanguage.icon />
            <span className="uppercase">{currentLanguage?.locale}</span>
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-50 flex flex-col">
        {languages.map((item) => {
          return (
            <Button
              key={item.locale}
              variant={"ghost"}
              className="justify-between"
              asChild
            >
              <Link locale={item.locale} href={pathname}>
                <div className="flex gap-2">
                  <item.icon />
                  {item.label}
                </div>
                <div>
                  {currentLanguage &&
                    currentLanguage.locale === item.locale && (
                      <Check className="stroke-blue-600" />
                    )}
                </div>
              </Link>
            </Button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
