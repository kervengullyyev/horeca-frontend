import { Logo, ShoppingBag } from "@/shared/ui/icons";
import { Search } from "lucide-react";
import { HeaderLink } from "./ui/header-link";
import { Button } from "@/shared/ui/kit/button";
import { Link } from "@/shared/i18n/navigation";
import { HeaderMenuLink } from "./ui/header-nav-link";
import { Category } from "@/shared/lib/types";

export async function AppHeader({ categories }: { categories: Category[] }) {
  return (
    <header className="sticky top-0 h-11 shadow-[inset_0_-1px_0_0_#e2e2e2] z-50 backdrop-blur-xl bg-background/80 px-2">
      <div className="h-full flex items-center justify-between mx-auto gap-15 w-full lg:w-fit">
        <HeaderLink href={"/"}>
          <Logo />
        </HeaderLink>
        <nav className="justify-center h-full gap-6 xl:gap-10 hidden w-full lg:w-fit lg:flex relative">
          {categories.map((item) => (
            <HeaderMenuLink key={item.id} href={`/${item.slug}`}>
              {item.title}
            </HeaderMenuLink>
          ))}
        </nav>
        <div className="h-full flex justify-center">
          <div className="h-full flex items-center">
            <Button size={"sm"} variant={"secondary"} asChild>
              <Link href={"/search"}>
                <Search size={20} strokeWidth={1.7} className="stroke-2" />
                <span>Search</span>
              </Link>
            </Button>
          </div>
          <HeaderLink href={"/cart"}>
            <ShoppingBag />
          </HeaderLink>
        </div>
      </div>
    </header>
  );
}
