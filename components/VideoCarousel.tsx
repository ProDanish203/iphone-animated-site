import { hightlightsSlides } from "@/utils/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);

  const { isEnd, isLastVideo, isPlaying, startPlay, videoId } = video;

  useGSAP(() => {
    gsap.to("#slider", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      transform: `translateX(${-100 * videoId}%)`,
      ease: "power2.inOut",
      duration: 2,
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prev) => ({
          ...prev,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length > 3) {
      // @ts-ignore
      if (!isPlaying) videoRef.current[videoId].pause();
    } else {
      // @ts-ignore
      startPlay && videoRef.current[videoId].play();
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // @ts-ignore
  const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // Animate the progress of video
      let anime = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anime.progress() * 100);

          if (progress !== currentProgress) {
            currentProgress = progress;

            gsap.to(videoDivRef.current[videoId], {
              width: isMobile ? "10vw" : "4vw",
            });
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId === 0) anime.restart();

      const animeUpdate = () => {
        anime.progress(
          // @ts-ignore
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };
      if (isPlaying) gsap.ticker.add(animeUpdate);
      else gsap.ticker.remove(animeUpdate);
    }
  }, [videoId, startPlay]);

  const handleProcess = (type: string, i?: number) => {
    if (type === "video-end" && i) {
      console.log(i);
      setVideo((prev) => ({
        ...prev,
        isEnd: true,
        videoId: i + 1,
      }));
    } else if (type === "video-last") {
      setVideo((prev) => ({
        ...prev,
        isLastVideo: true,
      }));
    } else if (type === "video-reset") {
      setVideo((prev) => ({
        ...prev,
        videoId: 0,
        isLastVideo: false,
      }));
    } else if (type === "pause") {
      setVideo((prev) => ({
        ...prev,
        isPlaying: !prev.isPlaying,
      }));
    } else if (type === "play") {
      setVideo((prev) => ({
        ...prev,
        isPlaying: !prev.isPlaying,
      }));
    } else return video;
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((slide, idx) => (
          <div key={slide.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  // @ts-ignore
                  ref={(el) => (videoRef.current[idx] = el)}
                  onPlay={() => {
                    setVideo((prev) => ({
                      ...prev,
                      isPlaying: true,
                    }));
                  }}
                  onEnded={() => {
                    idx !== 3
                      ? handleProcess("video-end", idx)
                      : handleProcess("video-last");
                  }}
                  className={``}
                  muted
                  autoPlay
                  id="video"
                  playsInline={true}
                  preload="auto"
                  onLoadedMetadata={(e) => handleLoadedMetaData(idx, e)}
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {slide.textLists.map((text, idx) => (
                  <p className="md:text-2xl text-xl font-medium" key={idx}>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative  cursor-pointer"
              // @ts-ignore
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span
                className="absolute h-full w-full rounded-full"
                // @ts-ignore
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>

        <button className="control-btn">
          <Image
            src={
              isLastVideo
                ? "/assets/images/replay.svg"
                : !isPlaying
                ? "/assets/images/play.svg"
                : "/assets/images/pause.svg"
            }
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            width={20}
            height={20}
            className=""
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};
