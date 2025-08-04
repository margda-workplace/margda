const Banner = () => {
  return (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>

      <section
        className="w-full min-h-[500px] md:min-h-[600px] lg:h-[700px] flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20 bg-[linear-gradient(to_right,_#000000,_#2600FF)] text-white shadow-lg shadow-grey-300"
      >
        <div className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl w-full gap-6 md:gap-8 lg:gap-12 py-7">
          {/* Left side: Text */}
          <div className="max-w-xl text-center md:text-left flex-1">
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              Business and <br />
              Income <span className="text-orange-400">Platform</span>
            </h1>
            <p className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl text-white/90 leading-relaxed">
              Margda Workplace is a SaaS-driven tech platform that helps to
              simplify work and get it done. It offers smart tools and digital
              solutions to achieve more with less effort. Boost productivity,
              drive growth, and automate multiple income streams.
            </p>
            <button className="mt-6 md:mt-8 px-6 py-3 bg-orange-400 text-black font-semibold rounded-xl hover:scale-105 hover:text-white transition duration-200 text-sm md:text-base">
              Get Started
            </button>
          </div>

          {/* Right side: Image */}
          <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:flex-1 md:max-w-md lg:max-w-lg">
            <img
              src="/heroimage.webp"
              alt="Illustration"
              style={{ animation: "float 3s ease-in-out infinite" }}
              className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[380px] lg:max-w-[450px] xl:max-w-[520px] h-auto object-contain animate-float"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
