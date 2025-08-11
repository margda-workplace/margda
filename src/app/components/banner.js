"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ReactTyped } from "react-typed";

const Banner = () => {
  const bannerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) observer.unobserve(bannerRef.current);
    };
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          .fade-in {
            animation: fadeIn 1s ease-in forwards;
          }

          .float-animation {
            animation: float 3s ease-in-out infinite;
          }

          @keyframes slideInLeft {
            0% {
              opacity: 0;
              transform: translateX(-50px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .slide-in-1 {
            opacity: 0;
            animation: slideInLeft 0.8s ease-out 0.2s forwards;
          }

          .slide-in-2 {
            opacity: 0;
            animation: slideInLeft 0.8s ease-out 0.5s forwards;
          }

          .slide-in-3 {
            opacity: 0;
            animation: slideInLeft 0.8s ease-out 0.8s forwards;
          }

          @keyframes slideInRight {
            0% {
              opacity: 0;
              transform: translateX(-60px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .slide-in-right {
            opacity: 0;
            transform: translateX(-60px);
            transition: opacity 0.8s ease, transform 0.8s ease;
          }

          .slide-in-right.active {
            animation: slideInRight 0.8s ease forwards;
          }
        `}
      </style>

      <section
        ref={bannerRef}
        className={`w-screen h-max md:h-max lg:h-max flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20 bg-[linear-gradient(to_right,_#284E9E,_#6C17D3)] text-white shadow-lg shadow-grey-300 slide-in-right ${
          isVisible ? "active" : ""
        }`}
      >
        <div className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl w-full gap-6 md:gap-8 lg:gap-12 py-7">
          {/* Left side: Text */}
          <div className="max-w-xl text-center md:text-left flex-1 my-7">
            <h1 className="text-4xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl leading-tight slide-in-1 text-orange-400 font-bold">
              Business: Achieve More With Less Effort <br />
            </h1>
            <p className="mt-4 md:mt-6 text-base md:text-lg lg:text-lg text-white leading-relaxed slide-in-2 font-bold">
              <ReactTyped
                strings={[
                  "Your Business Engine",
                  "All In One Platform",
                  "Growth Accelerator",
                ]}
                typeSpeed={50}
                backSpeed={30}
                backDelay={100}
                loop={true}
                showCursor={true}
                cursorChar="|"
              />
            </p>

            <p className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl text-white/90 leading-relaxed slide-in-2">
              Margda Workplace is a SaaS platform integrated with a Unified
              CRMSmart Tools, and Service Exchange — to help businesses
              streamline operations, enhance productivity, and drive growth by
              outsourcing their requirements and getting the work done.
            </p>
            <br />
            <br />

            <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl leading-tight slide-in-1 font-bold text-orange-400">
              Professional: Create Multiple Income Streams
            </h1>

            <p className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl text-white/90 leading-relaxed slide-in-2">
              Margda Workplace platform empowers people to work from anywhere,
              at any time, flexibly and complete the tasks based on their
              interest, skills, and ability for instant payouts, fixed long-term
              earnings and 24/7 automated income.
            </p>

            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-5 my-5 lg:mx-[-75px]">
              <button
                className="w-full sm:w-auto bg-gradient-to-l from-orange-500/70 to-orange-400/60
      backdrop-blur-md hover:from-orange-500/70 hover:to-orange-400/60
      text-white font-semibold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5
      rounded-full hover:scale-105 transition-transform transition-colors
      duration-200 flex items-center justify-center gap-2 shadow-lg
      text-sm sm:text-base lg:text-lg"
              >
                Request a demo
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="white"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <button
                className="w-full sm:w-auto bg-gradient-to-l from-orange-500/70 to-orange-400/60
      backdrop-blur-md text-white font-semibold px-6 sm:px-8 lg:px-10
      py-3 sm:py-4 lg:py-5 rounded-full hover:scale-105
      transition-transform transition-all duration-200 shadow-lg
      text-sm sm:text-base lg:text-lg"
              >
                Start Free Trial
              </button>
            </div>
          </div>

          {/* Right side: Image */}
          <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:flex-1 md:max-w-md lg:max-w-lg fade-in">
            <Image
              src="/heroimage.webp"
              alt="Illustration"
              width={520}
              height={520}
              className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[380px] lg:max-w-[450px] xl:max-w-[520px] h-auto object-contain float-animation"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
