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
        className={`w-screen min-h-[500px] md:min-h-[600px] lg:h-[700px] flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20 bg-[linear-gradient(to_right,_#2976B5,_#001CAA)] text-white shadow-lg shadow-grey-300 slide-in-right ${
          isVisible ? "active" : ""
        }`}
      >
        <div className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl w-full gap-6 md:gap-8 lg:gap-12 py-7">
          {/* Left side: Text */}
          <div className="max-w-xl text-center md:text-left flex-1">
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight slide-in-1">
              Business and <br />
              Income <span className="text-[#FA7D00]">Platform</span>
            </h1>
            <p className="mt-4 md:mt-6 text-base md:text-lg lg:text-lg text-orange-500 leading-relaxed slide-in-2 font-bold">
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
              Margda Workplace is a SaaS-driven tech platform that helps to
              simplify work and get it done. It offers smart tools and digital
              solutions to achieve more with less effort. Boost productivity,
              drive growth, and automate multiple income streams.
            </p>

            

            <button className="mt-6 md:mt-8 px-6 py-3 bg-gradient-to-l from-white/20 to-orange-400/30
                backdrop-blur-md text-black font-semibold rounded-xl hover:scale-105 hover:from-white/30 hover:to-orange-300/50 text-white transition duration-200 text-sm md:text-base slide-in-3">
              Get Started
            </button>
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
