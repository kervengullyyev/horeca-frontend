"use client";

import { useMemo } from "react";
import { CartProductCard, useCartItems } from "@/features/cart";
import { CartProduct } from "@/shared/lib/types";

export function CartProducts({ products }: { products: CartProduct[] }) {
  const { cartItems } = useCartItems();

  const cartProducts = useMemo(() => {
    return products
      .filter((p) =>
        cartItems.some(
          (c) => c.id === p.id && c.attrItemId === p.attrItemId
        )
      )
      .map((p) => {
        const matchedCartItem = cartItems.find(
          (c) => c.id === p.id && c.attrItemId === p.attrItemId
        );

        return {
          ...p,
          qty: matchedCartItem?.qty ?? p.qty ?? 1,
          attrItemId: matchedCartItem?.attrItemId ?? p.attrItemId ?? null,
        };
      });
  }, [products, cartItems]);

  if (!cartProducts.length) return <div>No products</div>;

  return (
    <div>
      {cartProducts.map((item) => (
        <CartProductCard
          key={`${item.id}-${item.attrItemId}`}
          product={item}
        />
      ))}
    </div>
  );
}
