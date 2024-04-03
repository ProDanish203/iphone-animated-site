"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { VideoCarousel } from "./VideoCarousel";

export const Highlights = () => {
  useGSAP(() => {
    gsap.to("#title", { duration: 1, opacity: 1, y: 0 });
    gsap.to(".link", {
      duration: 1,
      opacity: 1,
      y: 0,
      stagger: 0.2,
      delay: 0.4,
    });
  }, []);

  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden common-padding h-full bg-zinc"
    >
      <div className="screen-max-width">
        <div className="mb-12 w-full lg:flex items-end justify-between">
          <h2 id="title" className="section-heading">
            Get the highlights
          </h2>

          <div className="flex flex-wrap items-end gap-5">
            <p className="link max-md:text-[16px] gap-2">
              Watch the film
              <Image
                src="/assets/images/watch.svg"
                alt=""
                width={20}
                height={20}
                className="max-md:size-4"
              />
            </p>
            <p className="link max-md:text-[16px] gap-2">
              Watch the event
              <Image
                src="/assets/images/right.svg"
                alt=""
                width={10}
                height={10}
                className="max-md:size-3"
              />
            </p>
          </div>
        </div>

        <VideoCarousel />
      </div>
    </section>
  );
};
