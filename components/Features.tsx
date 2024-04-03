"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { animateWithGSAP } from "@/utils/animations";

gsap.registerPlugin(ScrollTrigger);

export const Features = () => {
  const videoRef = useRef(null);

  useGSAP(() => {
    // Video animations
    gsap.to("#exploreVideo", {
      scrollTrigger: {
        trigger: "#exploreVideo",
        toggleActions: "play pause reverse restart",
        start: "-10% bottom",
      },
      onComplete: () => {
        // @ts-ignore
        videoRef.current.play();
      },
    });

    animateWithGSAP("#feature-title", { opacity: 1, y: 0, duration: 1 });
    animateWithGSAP(
      ".g_grow",
      { scale: 1, opacity: 1, ease: "power1.inOut" },
      { scrub: 5.5 }
    );
    animateWithGSAP(".g_text", {
      y: 0,
      opacity: 1,
      ease: "power2.inOut",
      duration: 1,
    });
  }, []);

  return (
    <section className="h-full common-padding bg-zinc relative overflow-hidden">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h2 id="feature-title" className="section-heading">
            Explore the full story.
          </h2>
        </div>

        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="sm:mt-32 mt-10 mb-24 sm:pl-24 pl-12">
            <h3 className="text-5xl lg:text-7xl font-semibold">iPhone.</h3>
            <h3 className="text-5xl lg:text-7xl font-semibold">
              Forged in titanium.
            </h3>
          </div>

          <div className="flex-center flex-col sm:px-10">
            <div className="relative h-[50vh] w-full flex items-center">
              <video
                playsInline
                id="exploreVideo"
                className="w-full h-full object-cover object-center"
                preload="none"
                muted
                autoPlay
                ref={videoRef}
              >
                <source src="/assets/videos/explore.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="flex flex-col w-full relative">
              <div className="feature-video-container">
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img
                    src="/assets/images/explore1.jpg"
                    alt="titanium"
                    className="feature-video g_grow"
                  />
                </div>
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img
                    src="/assets/images/explore2.jpg"
                    alt="titanium 2"
                    className="feature-video g_grow"
                  />
                </div>
              </div>

              <div className="feature-text-container">
                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    iPhone 15 Pro is{" "}
                    <span className="text-white">
                      the first iPhone to feature an aerospace-grade titanium
                      design
                    </span>
                    , using the same alloy that spacecrafts use for missions to
                    Mars.
                  </p>
                </div>

                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    Titanium has one of the best strength-to-weight ratios of
                    any metal, making these our{" "}
                    <span className="text-white">
                      lightest Pro models ever.
                    </span>
                    You'll notice the difference the moment you pick one up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
