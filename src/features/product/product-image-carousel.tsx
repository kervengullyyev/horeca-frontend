"use client";

import { useState, useMemo } from "react";
import { ProductImageThumbnail } from "./product-image-thumbnail";
import { SelectedProductImage } from "./selected-product-image";
import { ProductImage } from "@/shared/lib/types";

export function ProductImageCarousel({
  mainImage,
  images,
}: {
  mainImage: string;
  images: ProductImage[];
}) {
  const allImages = useMemo(() => {
    const mainImgObj = { id: "main", image: mainImage };
    const filteredImages = images.filter((i) => i.image !== mainImage);
    return [mainImgObj, ...filteredImages];
  }, [mainImage, images]);

  const [selectedId, setSelectedId] = useState(allImages[0].id);
  const selectedImage = allImages.find((i) => i.id === selectedId)!;

  return (
    <div className="flex flex-col sm:flex-row-reverse w-full ">
      <div className="w-full">
        <SelectedProductImage src={selectedImage.image} alt="image" />
      </div>
      <div className="overflow-x-auto scrollbar-hide flex py-2 sm:py-0 sm:flex-col items-center sm:px-2 gap-2 sm:aspect-1/5 shrink-0">
        {allImages.map((item) => (
          <ProductImageThumbnail
            key={item.id}
            src={item.image}
            alt="image"
            isActive={item.id === selectedId}
            onMouseOver={() => setSelectedId(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
