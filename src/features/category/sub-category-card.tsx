import { SubCategoory } from "@/shared/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/shared/ui/kit/carousel";
import { Heading3 } from "@/shared/ui/kit/typography";
import { ProductCard } from "../product/product-card";

export function SubCategoryCard({
  categorySlug,
  subCategory,
}: {
  categorySlug: string;
  subCategory: SubCategoory;
}) {
  return (
    <div id={String(subCategory.id)} className="scroll-offset">
      <div className="px-5">
        <div className="max-w-[90rem] mx-auto">
          <Heading3 className="my-3">{subCategory.title}</Heading3>
        </div>
      </div>
      <Carousel
        opts={{
          align: "start",
          // dragFree: true,
          breakpoints: {
            "(min-width: 1024px)": {
              watchDrag: false,
              inViewThreshold: 1,
            },
          },
        }}
        className="w-full lg:px-5 mx-auto"
      >
        <CarouselContent className="ml-1 mr-4 max-w-[90rem] mx-auto lg:grid lg:grid-cols-3 lg:gap-4">
          {subCategory.products.map((product) => (
            <CarouselItem
              key={product.slug}
              className="pl-3 lg:pl-0 basis-4/7 sm:basis-4/9 md:basis-4/10"
            >
              <ProductCard categorySlug={categorySlug} product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
