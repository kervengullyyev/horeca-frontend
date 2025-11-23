import { CartProduct } from "@/shared/lib/types";
import Image from "next/image";
import { CartProductQuantity } from "./cart-product-quantity";
import type { CartItem } from "./model/types";

export function CartProductCard({ product }: { product: CartProduct }) {
  const cartItem: CartItem = {
    id: product.id,
    attrItemId: product.attrItemId,
    qty: product.qty,
  };

  return (
    <div className="py-5 w-full border-b last:border-none">
      <div className="flex gap-5">
        <Image
          src={product.mainImage}
          alt={"dasda"}
          width={500}
          height={500}
          className="aspect-square bg-background object-contain max-w-40 p-3 rounded-lg"
        />
        <div className="flex flex-col justify-between h-40 w-full">
          <div className="space-y-1">
            <div className="font-medium text-xl">{product.title}</div>
            <div className="font-medium text-foreground/60">
              {product.brandTitle}
            </div>
            <span className="font-medium text-lg">{product.price} RON</span>
          </div>
          <div className="flex gap-2">
            <CartProductQuantity cartItem={cartItem} />
          </div>
        </div>
      </div>
    </div>
  );
}
