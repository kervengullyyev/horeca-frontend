"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { create } from "zustand";
import { CartItem } from "./types";

const CART_COOKIE_KEY = "CART_ITEMS";

function useCartItemsCookie() {
  const cartItems = (): CartItem[] => {
    try {
      return JSON.parse(Cookies.get(CART_COOKIE_KEY) ?? "[]");
    } catch {
      return [];
    }
  };

  function setCartItems(items: CartItem[]) {
    Cookies.set(CART_COOKIE_KEY, JSON.stringify(items), { path: "/" });
  }

  function setCartItem(cartItem: CartItem) {
    const items = cartItems();

    const existingItem = items.find(
      c => c.id === cartItem.id && c.attrItemId === cartItem.attrItemId
    );

    let updated;

    if (existingItem) {
      updated = items.map(c =>
        c.id === cartItem.id && c.attrItemId === cartItem.attrItemId
          ? { ...c, qty: cartItem.qty }
          : c
      );
    } else {
      updated = [...items, cartItem];
    }

    setCartItems(updated);
    return updated;
  }

  function removeCartItem(cartItem: CartItem) {
    const updated = cartItems().filter(
      c => !(c.id === cartItem.id && c.attrItemId === cartItem.attrItemId)
    );

    setCartItems(updated);
    return updated;
  }

  function clearCartItems() {
    Cookies.remove(CART_COOKIE_KEY);
  }

  return { cartItems, setCartItems, setCartItem, removeCartItem, clearCartItems };
}

interface CartItemsState {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
}

const useCartItemsStore = create<CartItemsState>((set) => ({
  cartItems: [],
  setCartItems: (items) => set({ cartItems: items }),
}));

export function useCartItems() {
  const cookie = useCartItemsCookie();
  const store = useCartItemsStore();

  useEffect(() => {
    const items = cookie.cartItems();
    store.setCartItems(items);
  }, []);

  function setCartItem(cartItem: CartItem) {
    const updated = cookie.setCartItem(cartItem);
    store.setCartItems(updated);
  }

  function removeCartItem(cartItem: CartItem) {
    const updated = cookie.removeCartItem(cartItem);
    store.setCartItems(updated);
  }

  function clearCartItems() {
    cookie.clearCartItems();
    store.setCartItems([]);
  }

  return {
    cartItems: store.cartItems,
    setCartItem,
    removeCartItem,
    clearCartItems,
  };
}
