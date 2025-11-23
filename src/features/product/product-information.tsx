"use client";

import React from "react";
import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import { ProductDetail } from "@/shared/lib/types";
import { useCartItems } from "../cart";
import type { CartItem } from "../cart";

export function ProductInformation({ product }: { product: ProductDetail }) {
  const { setCartItem } = useCartItems();

  const [selectedAttributeItemId, setSelectedAttributeItemId] = React.useState<
    number | null
  >(product.attribute?.items[0]?.id ?? null);

  const selectedAttributeItem =
    product.attribute?.items.find(
      (item) => item.id === selectedAttributeItemId,
    ) || null;

  function handleAddToCart() {
    const cartItem: CartItem = {
      id: product.id,
      attrItemId: selectedAttributeItemId,
      qty: 1
    }

    setCartItem(cartItem);
  }

  return (
    <div className="px-4 lg:pl-8 xl:pl-12 py-3 lg:py-0 space-y-6 sm:space-y-8 lg:space-y-10 w-full lg:max-w-lg">
      <div>
        <div className="font-medium text-xl lg:text-2xl">{product.title}</div>
        {product.brandTitle && (
          <div className="font-medium sm:text-lg text-foreground/60">
            {product.brandTitle}
          </div>
        )}
        <div className="mt-1 font-medium text-lg lg:text-xl">
          {selectedAttributeItem && selectedAttributeItem.price
            ? selectedAttributeItem.price
            : product.price}{" "}
          RON
        </div>
      </div>
      {product.attribute && product.attribute.items.length != 0 && (
        <div>
          <div className="font-medium text-lg">{product.attribute.title}</div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {product.attribute.items.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "border border-foreground/20 hover:border-foreground rounded-sm cursor-pointer text-center py-3",
                  selectedAttributeItemId === item.id && "border-foreground",
                )}
                onClick={() => setSelectedAttributeItemId(item.id)}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <Button className="h-14 text-lg" onClick={() => handleAddToCart()}>Add to cart</Button>
        <Button variant={"outline"} className="h-14 text-lg">
          WhatsApp
        </Button>
      </div>
      {product.description && <div>{product.description}</div>}
    </div>
  );
}
