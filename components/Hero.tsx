"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [video, setVideo] = useState("/assets/videos/hero.mp4");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) setVideo("/assets/videos/smallHero.mp4");
      else setVideo("/assets/videos/hero.mp4");
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(() => {
    gsap.to("#hero-text", {
      opacity: 1,
      duration: 2,
      ease: "power1.inOut",
      delay: 1,
    });
    gsap.to("#cta", {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power1.inOut",
      delay: 1,
    });
  }, []);

  return (
    <section id="hero" className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero-text" className="hero-title">
          iPhone 15 Pro
        </p>
        <div className="md:w-10/12 w-9/12">
          <video
            className="pointer-events-none"
            autoPlay
            muted
            playsInline
            key={video}
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>

        <div
          id="cta"
          className="flex flex-col items-center opacity-0 translate-y-20"
        >
          <Link href="#highlights" className="btn w-fit mx-auto">
            Buy
          </Link>
          <p className="font-normal text-xl">From $199/month or $999</p>
        </div>
      </div>
    </section>
  );
};
