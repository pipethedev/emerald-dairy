"use client";
import React from "react";
import AnimateInOut from "../AnimateInOut/AnimateInOut";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { IconButton, Overlay } from "..";
import { XClose } from "@/app/components/svgs";
import Link from "next/link";

type Props = {
  images: string[];
  urlParams: any;
};

export default function FullscreenImage({ images, urlParams }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams();
  const showFullImages =
    searchParams.get("full-image") === "true" ? true : false;
  const clickedImageIndex =
    parseInt(searchParams.get("image-index") || "0") || 0;

  console.log("FULL_SCREEN: ", { images, urlParams });

  return (
    <>
      <div className="z-[899999] relative">
        <Overlay
          show={showFullImages}
          disableOnClick
          handleShowOverlay={() => () => router.push(pathname)}
        />
      </div>
      <AnimateInOut
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        show={showFullImages && images.length > 0}
        className="fixed h-[calc(100vh-4rem)] w-screen md:w-[calc(100vw-3.5rem)] top-14 inset-0 mx-auto z-[900000]"
      >
        <div className="relative w-full h-full">
          <Swiper
            initialSlide={clickedImageIndex}
            className="w-full h-full relative flex items-center justify-center"
            navigation
            keyboard
            spaceBetween={50}
            pagination={{
              bulletActiveClass: "active-bullet",
              clickable: true,
            }}
            effect={"creative"}
            creativeEffect={{
              prev: {
                translate: [0, 0, -400],
              },
              next: {
                translate: ["100%", 0, 0],
              },
            }}
            modules={[Pagination, Navigation]}
            // breakpoints={{
            //   640: {
            //     slidesPerView: 1,
            //   },
            //   768: {
            //     slidesPerView: 2,
            //   },
            //   1024: {
            //     slidesPerView: 4,
            //   },
            // }}
          >
            {images.map((image, index) => (
              <SwiperSlide className="w-full full !relative" key={index}>
                <Image
                  fill
                  src={image}
                  alt="selected"
                  className="object-contain object-center w-full h-full rounded-md bg-primary/70"
                  loading="lazy"
                />
                {/* works? */}
              </SwiperSlide>
            ))}
          </Swiper>
          <Link
            href={pathname}
            className="absolute z-40 w-fit h-fit top-4 right-4"
          >
            <IconButton title="close" className="rounded-full">
              <XClose />
            </IconButton>
          </Link>
        </div>
      </AnimateInOut>
    </>
  );
}
