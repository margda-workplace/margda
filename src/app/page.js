"use client";
import { useEffect, useRef, useState } from "react";
import CommunicationCard from "./components/CommunicationCards";
import Footer from "./components/footer";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Navbar from "./components/navbar";
import Banner from "./components/banner";
import { Mails } from "lucide-react";
import { SendHorizontal } from "lucide-react";
import { FileUser } from "lucide-react";

export default function Home() {
  const scrollRef = useRef(null);

  const navItems = [
    { label: "CRM", icon: "crm-rmvd-bg.gif" },
    { label: "Smart Tools", icon: "service-tools-rmvd-bg.gif" },
    { label: "Service Exchange", icon: "briefcase-rmvd-bg.gif" },
    { label: "Mart Seva", icon: "shopping-cart-rmvd-bg.gif" },
    { label: "Login", icon: "login-rmvd-bg.gif" },
  ];

  // Animation controls for scroll-on-reveal
  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const RevealOnScroll = ({ children }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

    return (
      <motion.div
        ref={ref}
        variants={fadeInVariants}
        initial="hidden"
        animate={controls}
      >
        {children}
      </motion.div>
    );
  };

  const cardData = [
    {
      type: "Call",
      date: "6/25/2025",
      time: "10:00 AM",
      content: [
        { label: "Sender:", value: "12****90" },
        { label: "Receiver:", value: "09****321" },
        { label: "Duration:", value: "120 sec" },
        {
          label: "Content:",
          value: (
            <div className="mt-1 p-2 border rounded bg-gray-100 text-gray-800">
              Incoming call regarding service update.
            </div>
          ),
        },
        { label: "Remarks:", value: "Client discussed upgrade options" },
        { label: "Followup:", value: "6/26/2025, 11:30:00 AM", small: true },
      ],
    },
    {
      type: "Email",
      date: "6/24/2025",
      time: "09:00 AM",
      content: [
        { label: "From:", value: "sender@example.com" },
        { label: "To:", value: "client***@example.com" },
        { label: "Subject:", value: "Project Proposal" },
        {
          label: "Content:",
          value: (
            <div className="mt-1 p-2 border rounded bg-gray-100 text-gray-800">
              Dear Client, here is the proposal document for your review. Let me
              know your thoughts.
            </div>
          ),
        },
        { label: "Remarks:", value: "Sent proposal email" },
        { label: "Followup:", value: "6/27/2025, 10:00:00 AM", small: true },
      ],
    },
    {
      type: "WhatsApp",
      date: "6/23/2025",
      time: "03:00 PM",
      content: [
        { label: "Sender:", value: "12****90" },
        { label: "Receiver:", value: "098******4321" },
        {
          label: "Message:",
          value: (
            <div className="mt-1 p-2 border rounded bg-gray-100 text-gray-800">
              Please confirm the meeting time.
            </div>
          ),
        },
        { label: "Remarks:", value: "Sent WhatsApp reminder" },
        { label: "Followup:", value: "6/24/2025, 01:00:00 PM", small: true },
      ],
    },
    {
      type: "SMS",
      date: "6/22/2025",
      time: "12:00 PM",
      content: [
        { label: "Sender:", value: "12****90" },
        { label: "Receiver:", value: "09*****54321" },
        {
          label: "Message:",
          value: (
            <div className="mt-1 p-2 border rounded bg-gray-100 text-gray-800">
              Meeting scheduled for tomorrow at 11 AM.
            </div>
          ),
        },
        { label: "Remarks:", value: "Sent SMS confirmation" },
        { label: "Followup:", value: "6/23/2025, 09:00:00 AM", small: true },
      ],
    },
    {
      type: "Email",
      date: "6/21/2025",
      time: "04:45 PM",
      content: [
        { label: "From:", value: "noreply@company.com" },
        { label: "To:", value: "client@email.com" },
        { label: "Subject:", value: "Invoice" },
        {
          label: "Content:",
          value: (
            <div className="mt-1 p-2 border rounded bg-gray-100 text-gray-800">
              Attached is your invoice for the month of June.
            </div>
          ),
        },
        { label: "Remarks:", value: "Sent invoice email" },
        { label: "Followup:", value: "6/28/2025, 10:00:00 AM", small: true },
      ],
    },
  ];

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
      <Navbar navItems={navItems} />
      <Banner />
      <RevealOnScroll>
        <RevealOnScroll>
          <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <div className="bg-white rounded-2xl sm:rounded-3xl px-6 sm:px-8 lg:px-12 py-10 sm:py-12 lg:py-16 text-center text-white shadow-lg">
              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 leading-tight text-blue-500">
                <span className="text-[#FA7D00]">Professional:</span> Create
                Multiple Income Streams
              </h2>

              {/* Subtext */}
              <p className="text-base sm:text-lg md:text-lg lg:text-lg mb-6 sm:mb-8 lg:mb-10 max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto leading-relaxed text-blue-500">
                Margda Workplace platform empowers people to work from anywhere,
                at any time, flexibly and complete the tasks based on their
                interest, skills, and ability for instant payouts, fixed
                long-term earnings and 24/7 automated income.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center">
                <button
                  className="w-full sm:w-auto  bg-gradient-to-l from-orange-500/70 to-orange-400/60
                backdrop-blur-md hover:from-orange-500/70  hover:to-orange-400/60 text-blue-500 font-semibold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full hover:scale-105 transition-transform transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base lg:text-lg"
                >
                  Request a demo
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
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
                  className="w-full sm:w-auto bg-gradient-to-l from-orange-500/70 to-orange-400/60 hover:border-1 from-orange-500/70 to-orange-400/60
                backdrop-blur-md  text-blue-500 font-semibold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full hover:text-blue-500 hover:scale-105 transition-transform transition-all duration-200 shadow-lg text-sm sm:text-base lg:text-lg"
                >
                  Start Free Trial
                </button>
              </div>
            </div>
          </section>
        </RevealOnScroll>
        <RevealOnScroll>
          <div className="flex flex-col items-center my-8 lg:my-15 px-4">
            <h1 className="flex flex-col sm:flex-row items-center text-2xl sm:text-3xl lg:text-4xl mb-4 text-center">
              <img
                src="communication.png"
                className="h-8 sm:h-10 w-auto mb-2 sm:mb-0 sm:mr-2 transition-transform duration-300 hover:-rotate-12"
                alt="comm"
                loading="lazy"
              />
              <span className="bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">
                Unified Communication(CRM):
              </span>
            </h1>

            <p className="text-left max-w-xl mb-6 text-sm sm:text-base px-4">
              Browser-integrated SIM+API-based multichannel communication like
              Calls, WhatsApp, SMS, Email, Virtual Meetings, and Visit Tracking
              with clients&apos; timelines.
              <br />
              <div className="space-y-2 text-left max-w-xl mb-6 text-sm sm:text-base px-4 my-2">
                <div className="flex items-center gap-2">
                  <Mails />
                  <span>
                    CRM and Campaigns - Email, WhatsApp, SMS, Call and Social.
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <SendHorizontal />
                  <span>Unified communication with timeline.</span>
                </div>

                <div className="flex items-center gap-2">
                  <FileUser />
                  <span>Teamwork reports</span>
                </div>
              </div>
            </p>

            {/* Sticky Button */}
            <div className="top-16 sm:top-20 lg:top-24 z-30 flex justify-center mb-4">
              <button className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-white text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-500 to-blue-800 shadow-md hover:opacity-90 transition group hover:scale-105">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 sm:h-4 w-3 sm:w-4 transition-transform duration-200 group-hover:-rotate-20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
                <span className="hidden sm:inline">
                  Client Timeline Dashboard
                </span>
                <span className="sm:hidden">Timeline</span>
              </button>
            </div>

            {/* Scrollable Cards Container */}
            <ScrollableCardsContainer
              cardData={cardData}
              scrollRef={scrollRef}
            />
          </div>
        </RevealOnScroll>
      </RevealOnScroll>

      <RevealOnScroll>
        <div className="flex flex-col items-center my-8 lg:my-15 px-4">
          <h1 className="flex flex-col sm:flex-row items-center text-2xl sm:text-3xl lg:text-4xl mb-4 text-center">
            <img
              src="tool2.png"
              className="h-8 sm:h-10 w-auto mb-2 sm:mb-0 sm:mr-2 transition-transform duration-300 hover:-rotate-12"
              alt="comm"
              loading="lazy"
            />
            <span className="bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">
              Smart Tools to Automate Processes
            </span>
          </h1>
          <div className="flex flex-col-reverse lg:flex-row items-start lg:items-center w-full max-w-6xl gap-8 my-10">
            <div className="w-full lg:w-1/2">
              <h2 className="text-xl font-semibold mb-3 flex items-center">
                <img
                  src="folder.png"
                  alt="Data Icon"
                  className="h-6 w-6 mr-2"
                  loading="lazy"
                />
                Data and Lead Generation:
              </h2>
              <ul className="list-disc list-inside space-y-1 text-sm sm:text-base marker:text-blue-600">
                {[
                  "Business Data - Local and Global",
                  "Email campaigns",
                  "Email verification",
                  "Email warming",
                  "Email CRM",
                  "WhatsApp campaigns",
                  "Business Data - Local and Global",
                  "WhatsApp CRM",
                  "SMS campaigns",
                  "SMS CRM",
                  "HR management",
                  "Job posting",
                  "Work-seekers data",
                  "Teamwork reports",
                  "Sales and Counselling",
                  "Training and development",
                  "Study organiser with progress meter",
                  "Unified communication with timeline",
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-black hover:underline hover:text-blue-600 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                src="/lead-generation-new.png" // Path relative to the 'public' directory
                alt="Illustration"
                width={500} // Adjust as needed
                height={300} // Adjust as needed
                style={{ animation: "float 3s ease-in-out infinite" }}
                className="w-full max-w-md"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Service Exchange Section */}
      <RevealOnScroll>
        <div className="w-screen min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-16 md:py-20 lg:py-24 bg-[linear-gradient(to_right,_#2976B5,_#001CAA)] text-white shadow-lg shadow-grey-300">
          <div className="w-full max-w-7xl mx-auto flex flex-col gap-12 md:gap-16">
            {/* Heading: Icon + Text */}
            <div className="flex items-center gap-3 justify-center">
              <img
                src="customer-service.png"
                alt="icon"
                className="h-10 w-10 transition-transform duration-300 hover:-rotate-12"
                loading="lazy"
              />
              <h2 className="text-3xl md:text-5xl ">
                <span className="text-orange-500">Service</span> Exchange
              </h2>
            </div>

            {/* Service Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-8 md:gap-10">
              <div
                className=" rounded-xl 
                shadow-lg 
                p-5 md:p-6 
                flex items-center gap-3 
                w-full sm:w-auto 
                sm:min-w-[300px] md:min-w-[350px] 
                bg-gradient-to-l from-orange-500/70 to-orange-400/60
                backdrop-blur-md                
                hover:from-white/30 hover:to-orange-400/40
                hover:scale-105 
                hover:shadow-xl
                hover:-translate-y-1
                active:scale-100
                active:translate-y-0
                transition-all 
                duration-300 
                ease-out
                mx-3
                text-white
                font-medium"
              >
                <img
                  src="helpdesk-rmvd-bg.gif"
                  alt="Service Required"
                  className="h-8 w-8"
                  loading="lazy"
                />
                <div>
                  <a
                    href="#"
                    className="text-white text-lg font-semibold hover:underline"
                  >
                    Service Required
                  </a>
                  <p className="text-sm text-white">
                    Outsource and get work done
                  </p>
                </div>
              </div>

              <div
                className="  rounded-xl 
                shadow-lg 
                p-5 md:p-6 
                flex items-center gap-3 
                w-full sm:w-auto 
                sm:min-w-[300px] md:min-w-[350px] 
                bg-gradient-to-l from-orange-500/70 to-orange-400/60
                backdrop-blur-md
                border border-orange-400/20
                hover:from-white/30 hover:to-orange-400/40
                hover:scale-105 
                hover:shadow-xl
                hover:-translate-y-1
                active:scale-100
                active:translate-y-0
                transition-all 
                duration-300 
                ease-out
                mx-3
                text-white
                font-medium"
              >
                <img
                  src="helpdesk2-rmvd-bg.gif"
                  alt="Service Offered"
                  className="h-8 w-8"
                  loading="lazy"
                />
                <div>
                  <a
                    href="#"
                    className="text-white text-lg font-semibold hover:underline"
                  >
                    Service Offered
                  </a>
                  <p className="text-sm text-white">
                    Complete work to earn instantly
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Section: Image & Links */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 md:gap-16 lg:gap-20">
              {/* Left: Illustration */}
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                <Image
                  src="/heroimage2.png"
                  alt="Illustration"
                  width={500} // Adjust as needed
                  height={300} // Adjust as needed
                  style={{ animation: "float 3s ease-in-out infinite" }}
                  className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-30"
                  loading="lazy"
                />
              </div>

              {/* Right: Links List */}
              <div className="w-full lg:w-1/2 lg:my-10 md:my-10 mx-30">
                <ul className="list-disc list-inside space-y-1 text-xl  ">
                  {[
                    "Computer, I.T. and Apps",
                    "Career, Education and Training",
                    "Health and Wellness",
                    "HR and Recruitment",
                    "Legal and Protection",
                    "Properties and Housing",
                    "Relationships & Matrimony",
                    "Sales, Support and Repair",
                    "Travel & Logistics",
                    "Sports and Recreation",
                    "Manufacturing and Production",
                  ].map((item, index) => (
                    <li key={index}>
                      <a href="#" className="hover:text-orange-500 transition">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
      <RevealOnScroll>
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="bg-[linear-gradient(to_right,_#2976B5,_#001CAA)] rounded-2xl sm:rounded-3xl px-6 sm:px-8 lg:px-12 py-10 sm:py-12 lg:py-16 text-center text-white shadow-2xl">
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 leading-tight">
              Ready to <span className="text-orange-400">boost</span> your
              business?
            </h2>

            {/* Subtext */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 sm:mb-8 lg:mb-10 max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto leading-relaxed">
              Book a demo to see Margda Workplace in action.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center">
              <button
                className="w-full sm:w-auto bg-gradient-to-l from-white/30 to-orange-400/30
                backdrop-blur-md hover:border-1 border-orange-200 hover:from-orange-500/70  hover:to-orange-400/60 text-white font-semibold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full hover:scale-105 transition-transform transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base lg:text-lg"
              >
                Request a demo
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
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
                className="w-full sm:w-auto hover:border-1 border-white bg-gradient-to-l from-white/30 to-orange-400/30 hover:from-orange-500/70  hover:to-orange-400/60
                backdrop-blur-md text-white font-semibold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full hover:text-white hover:scale-105 transition-transform transition-all duration-200 shadow-lg text-sm sm:text-base lg:text-lg"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </section>
      </RevealOnScroll>
      <RevealOnScroll>
        <Footer />
      </RevealOnScroll>
    </>
  );
}

const ScrollableCardsContainer = ({ cardData, scrollRef }) => {
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    let frame;
    let direction = 1;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const animateScroll = () => {
      if (!scrollContainer || hovering) return;

      const isDesktop = window.innerWidth >= 1024;
      const speed = 1.2;

      if (isDesktop) {
        // Desktop: horizontal scroll
        const maxScroll =
          scrollContainer.scrollWidth - scrollContainer.clientWidth;

        scrollContainer.scrollLeft += direction * speed;

        if (
          scrollContainer.scrollLeft >= maxScroll ||
          scrollContainer.scrollLeft <= 0
        ) {
          direction *= -1;
        }
      } else {
        // Mobile: vertical scroll
        const maxScroll =
          scrollContainer.scrollHeight - scrollContainer.clientHeight;

        scrollContainer.scrollTop += direction * speed;

        if (
          scrollContainer.scrollTop >= maxScroll ||
          scrollContainer.scrollTop <= 0
        ) {
          direction *= -1;
        }
      }

      frame = requestAnimationFrame(animateScroll);
    };

    frame = requestAnimationFrame(animateScroll);

    return () => cancelAnimationFrame(frame);
  }, [hovering, scrollRef]);
  return (
    <div
      ref={scrollRef}
      className="relative w-full max-w-7xl px-2 sm:px-4 pt-4 sm:pt-6 pb-6 sm:pb-10 bg-white rounded-xl shadow-md 
                       overflow-y-auto lg:overflow-y-visible lg:overflow-x-auto 
                       max-h-96 lg:max-h-none
                       scrollbar-thin hover:scrollbar-thumb-gray-500 scrollbar-thumb-gray-300 scrollbar-track-gray-100 
                       border border-green-200"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Mobile: Vertical Stack, Desktop: Horizontal Scroll */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-4 lg:min-w-[1200px]">
        {cardData.map((card, index) => (
          <CommunicationCard
            key={index}
            type={card.type}
            date={card.date}
            time={card.time}
            content={card.content}
          />
        ))}
      </div>
    </div>
  );
};
