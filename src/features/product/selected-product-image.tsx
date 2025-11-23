import React from "react";
import Image from "next/image";
import { cn } from "@/shared/lib/css";

export const SelectedProductImage = React.memo(function SelectedProductImage({
  className,
  alt,
  src,
  ...props
}: React.ComponentProps<typeof Image>) {
  return (
    <Image
      src={src}
      alt={alt}
      width={500}
      height={500}
      className={cn(
        "aspect-5/6 lg:rounded-2xl object-contain p-2 bg-background w-full",
        className,
      )}
      {...props}
    />
  );
});
