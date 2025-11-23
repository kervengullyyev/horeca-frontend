"use client";

import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/shared/ui/kit/input-group";
import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "@/shared/ui/kit/button";
import { CartItem } from "./model/types";
import { useCartItems } from "./model/use-cart";

export function CartProductQuantity({ cartItem }: { cartItem: CartItem }) {
  const { setCartItem, removeCartItem } = useCartItems();

  const [value, setValue] = useState(cartItem.qty);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const num = parseInt(e.target.value);
    setValue(Number.isNaN(num) ? 1 : num);
  }

  function commitQty(newQty: number) {
    const safeQty = Math.max(1, newQty);
    setValue(safeQty);
    setCartItem({ id: cartItem.id, attrItemId: cartItem.attrItemId, qty: safeQty });
  }

  return (
    <>
      <InputGroup className="max-w-[140px] rounded-full h-10 pl-1.5 bg-background">
        <InputGroupInput
          value={value}
          onChange={handleInputChange}
          onBlur={() => commitQty(value)}
          min={1}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-sm"
            className="rounded-full"
            onClick={() => commitQty(value - 1)}
          >
            <Minus />
          </InputGroupButton>
          <InputGroupButton
            size="icon-sm"
            className="rounded-full"
            onClick={() => commitQty(value + 1)}
          >
            <Plus />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <Button
        variant={"outline"}
        size={"icon"}
        className="bg-background h-10 w-10 border-border hover:bg-background hover:border-foreground/25"
        onClick={() => removeCartItem(cartItem)}
      >
        <Trash />
      </Button>
    </>
  );
}
