"use client";
import { useEffect, useRef, useState } from "react";
import CommunicationCard from "./components/CommunicationCards";

export default function Home() {
  const scrollRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  // Oscillating scroll effect (horizontal for desktop, vertical for mobile)
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
  }, [hovering]);

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
      <div className="flex flex-col items-center my-8 lg:my-15 px-4">
        <h1 className="flex flex-col sm:flex-row items-center text-2xl sm:text-3xl lg:text-4xl mb-4 text-center">
          <img
            src="communication.png"
            className="h-8 sm:h-10 w-auto mb-2 sm:mb-0 sm:mr-2 transition-transform duration-300 hover:-rotate-12"
            alt="comm"
          />
          <span className="bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">
            Unified Communication:
          </span>
        </h1>

        <p className="text-center max-w-xl mb-6 text-sm sm:text-base px-4">
          Browser-integrated SIM+API-based multichannel communication like
          Calls, WhatsApp, SMS, Email, Virtual Meetings, and Visit Tracking with
          clients' timelines.
        </p>

        {/* Sticky Button */}
        <div className="sticky top-16 sm:top-20 lg:top-24 z-30 flex justify-center mb-4">
          <button className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-white text-sm sm:text-base font-semibold bg-gradient-to-r from-purple-500 to-blue-500 shadow-md hover:opacity-90 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 sm:h-4 w-3 sm:w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
            <span className="hidden sm:inline">Client Timeline Dashboard</span>
            <span className="sm:hidden">Timeline</span>
          </button>
        </div>

        {/* Scrollable Cards Container */}
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
      </div>
    </>
  );
}
