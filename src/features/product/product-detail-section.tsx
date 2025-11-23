import { ProductDetail } from "@/shared/lib/types";
import { ProductImageCarousel } from "./product-image-carousel";
import { ProductInformation } from "./product-information";

export function ProductDetailSection({ product }: { product: ProductDetail }) {
  return (
    <section className="w-full flex flex-col sm:px-5">
      <div className="w-full flex flex-col lg:flex-row max-w-2xl lg:max-w-6xl mx-auto sm:pt-5 md:pt-8 lg:pt-12">
        <ProductImageCarousel
          images={product.images}
          mainImage={product.mainImage}
        />
        <ProductInformation product={product} />
      </div>
    </section>
  );
}
