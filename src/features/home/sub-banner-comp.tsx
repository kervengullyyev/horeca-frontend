import { Banner } from "@/shared/lib/types";
import { Button } from "@/shared/ui/kit/button";
import Image from "next/image";

export function SubBannerComp({ banner }: { banner: Banner }) {
  return (
    <div className="relative">
      <Image
        src={banner.image}
        width={1920}
        height={1080}
        alt={banner.title}
        className="w-full h-120 object-cover"
      />
      <div className="absolute top-3/10 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-3 sm:gap-4 md:gap-5 xl:gap-6 max-w-md">
        <div className="space-y-1 lg:space-y-2 xl:space-y-3">
          <h2
            className="text-3xl lg:text-4xl text-balance font-semibold text-center"
            style={{ color: banner.textColor }}
          >
            {banner.title}
          </h2>
          <h4
            className="text-center text-lg leading-6 text-balance md:text-xl xl:text-2xl md:leading-7"
            style={{ color: banner.textColor }}
          >
            {banner.subTitle}
          </h4>
        </div>
        <Button
          size={"lg"}
          className="text-base"
          style={{
            backgroundColor: banner.buttonColor,
            color: banner.buttonTextColor,
          }}
        >
          Learn more
        </Button>
      </div>
    </div>
  );
}
