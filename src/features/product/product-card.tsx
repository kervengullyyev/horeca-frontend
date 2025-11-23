import { Link } from "@/shared/i18n/navigation";
import { Product } from "@/shared/lib/types";
import Image from "next/image";
import { Button } from "@/shared/ui/kit/button";

export function ProductCard({
  categorySlug,
  product,
}: {
  categorySlug: string;
  product: Product;
}) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <Link
      className="flex flex-col bg-background rounded-3xl overflow-hidden"
      href={`/${categorySlug}/${product.slug}`}
    >
      <Image
        src={product.mainImage}
        alt={product.title}
        width={500}
        height={500}
        className="aspect-square object-contain h-full w-full p-3"
        unoptimized={isDev}
      />
      <div className="w-full p-[10px] sm:p-3 md:p-4 lg:p-5 gap-2 flex flex-wrap sm:flex-nowrap justify-between items-end">
        <div className="w-full overflow-hidden">
          <div className="truncate font-bold sm:text-lg md:text-xl">
            {product.title}
          </div>
          <div className="font-semibold sm:text-lg text-foreground/80">
            {product.price} RON
          </div>
        </div>
        <Button className="font-semibold w-full sm:w-fit sm:h-10 sm:px-6">
          View
        </Button>
      </div>
    </Link>
  );
}
