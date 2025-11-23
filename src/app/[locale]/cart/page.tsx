import { CartItem, CartProducts } from "@/features/cart";
import { Link } from "@/shared/i18n/navigation";
import { getAllProducts } from "@/shared/lib/api";
import { CartProduct } from "@/shared/lib/types";
import { Button } from "@/shared/ui/kit/button";
import { Separator } from "@/shared/ui/kit/separator";
import { cookies } from "next/headers";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function CartPage({ params }: Props) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const rawCart = cookieStore.get("CART_ITEMS")?.value ?? "[]";

  const cartItems: CartItem[] = JSON.parse(rawCart);

  const products = await getAllProducts(locale);

  const cartProducts: CartProduct[] = cartItems
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return null;

      return {
        ...product,
        qty: item.qty,
        attrItemId: item.attrItemId,
      };
    })
    .filter((p): p is CartProduct => p !== null);

  return (
    <section className="px-5 min-h-[calc(100vh-48px)]">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-15 lg:gap-15 xl:gap-20 py-10">
        <div className="w-full">
          <div className="py-5">
            <h4 className="scroll-m-20 text-2xl lg:text-3xl font-semibold tracking-tight">
              Cart
            </h4>
            <div className="flex items-center my-1 h-5 gap-3 lg:hidden">
              <span className="text-foreground/80">1 item</span>
              <Separator orientation="vertical" className="bg-foreground" />
              <span className="font-medium">120 RON</span>
            </div>
          </div>
          <CartProducts products={cartProducts} />
        </div>
        <div className="w-full lg:max-w-xs">
          <div className="py-5">
            <h4 className="scroll-m-20 text-2xl lg:text-3xl font-semibold tracking-tight">
              Summary
            </h4>
          </div>
          <div className="py-5">
            <div className="border-b pb-4 space-y-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>150 RON</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>150 RON</span>
              </div>
            </div>
            <div className="py-3 flex justify-between font-medium sm:text-lg">
              <span>Total:</span>
              <span>190 RON</span>
            </div>
          </div>
          <div className="fixed bottom-0 w-full left-0 px-5 bg-background border-t py-3 lg:static lg:border-none lg:px-0">
            <Button className="h-14 text-lg w-full">
              <Link href={"/checkout"}>Go to checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
