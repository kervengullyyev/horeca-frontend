import React from "react";
import Image from "next/image";
import { cn } from "@/shared/lib/css";

function ProductImageThumbnailComponent({
  isActive,
  src,
  alt,
  className,
  ...props
}: React.ComponentProps<typeof Image> & { isActive?: boolean }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={80}
      height={80}
      className={cn(
        "object-contain w-15 h-15 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-background rounded-sm p-1 first:ml-2 last:mr-2 sm:first:ml-0 sm:last:mr-0 aspect-square border-1 border-transparent",
        className,
        isActive && "border-foreground",
      )}
      {...props}
    />
  );
}

export const ProductImageThumbnail = React.memo(ProductImageThumbnailComponent);
