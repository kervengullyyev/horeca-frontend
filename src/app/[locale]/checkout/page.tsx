import { CheckoutForm } from "@/features/checkout";

export default async function CheckoutPage() {
  return (
    <section className="px-5 min-h-[calc(100vh-48px)]">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-15 lg:gap-20 xl:gap-35 py-10">
        <div className="w-full">
          <CheckoutForm />
        </div>
        <div className="w-full md:max-w-xs">
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
                <span>Tax:</span>
                <span>150 RON</span>
              </div>
            </div>
            <div className="py-3 flex justify-between font-medium sm:text-lg">
              <span>Total:</span>
              <span>190 RON</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
