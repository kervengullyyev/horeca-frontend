import { Logo, ShoppingBag } from "@/shared/ui/icons";
import { Search } from "lucide-react";
import { HeaderLink } from "./ui/header-link";
import { Category } from "@/shared/lib/types";
import { HeaderNav } from "./header-nav";
import { Button } from "@/shared/ui/kit/button";
import { Link } from "@/shared/i18n/navigation";

const categories: Category[] = [
  { label: "Spoons1", slug: "/spoons1" },
  { label: "Spoons2", slug: "/spoons2" },
  { label: "Spoons3", slug: "/spoons3" },
  { label: "Spoons4", slug: "/spoons4" },
  { label: "Spoons5", slug: "/spoons5" },
  { label: "Spoons6", slug: "/spoons6" },
  { label: "Spoons7", slug: "/spoons7" },
  { label: "Spoons8", slug: "/spoons8" },
]

export function AppHeader() {
  return (
    <header className="sticky h-11 shadow-[inset_0_-1px_0_0_#e2e2e2] z-50 backdrop-blur-xl bg-background/80 px-2">
      <div className="h-full flex items-center justify-between mx-auto gap-15 w-full lg:w-fit">
        <HeaderLink className="flex" href={"/"}>
          <Logo />
        </HeaderLink>
        <HeaderNav categories={categories} />
        <div className="h-full flex justify-center">
          <div className="h-full flex items-center">
            <Button size={"sm"} variant={"secondary"} asChild>
              <Link href={"/search"}>
                <Search size={20} strokeWidth={1.7} />
                <span>Search</span>
              </Link>
            </Button>
          </div>
          <HeaderLink href={"/bag"}>
            <ShoppingBag />
          </HeaderLink>
        </div>
      </div>
    </header>
  );
}
