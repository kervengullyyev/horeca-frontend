import { EnglandFlag, RomaniaFlag } from "@/shared/ui/kit/icons";
import { Language } from "./types";

export function useLanguages(): Language[] {
  return [
    { label: "Română", icon: RomaniaFlag, locale: "ro" },
    { label: "English", icon: EnglandFlag, locale: "en" },
  ];
}
