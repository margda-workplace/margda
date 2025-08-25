"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Navbar from "./components/navbar"; // rewritten below
import Banner from "./components/banner"; // rewritten below
import Footer from "./components/footer"; // your existing footer
import CommunicationCard from "./components/CommunicationCards"; // keep as-is

import {
  Mails,
  SendHorizontal,
  FileUser,
  GraduationCap,
  TrendingUp,
  Users,
  BookOpen,
  BarChart3,
} from "lucide-react";

export default function Home() {
  const scrollRef = useRef(null);

  // Nav items preserved (labels/hrefs/icons)
  const navItems = [
    { label: "CRM", icon: "crm-rmvd-bg.gif", href: "/login" },
    { label: "Smart Tools", icon: "service-tools-rmvd-bg.gif", href: "/login" },
    {
      label: "Service Exchange",
      icon: "briefcase-rmvd-bg.gif",
      href: "/login",
    },
    { label: "Mart Seva", icon: "shopping-cart-rmvd-bg.gif", href: "/login" },
  ];

  // Reveal-on-scroll animation
  const fadeInVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const RevealOnScroll = ({ children, className }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

    useEffect(() => {
      if (inView) controls.start("visible");
    }, [controls, inView]);

    return (
      <motion.div
        ref={ref}
        variants={fadeInVariants}
        initial="hidden"
        animate={controls}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  // Demo data preserved for CommunicationCard
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
      {/* small utility animation for floating images */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) }
          50% { transform: translateY(-10px) }
        }
      `}</style>

      {/* NAVBAR + HERO (rewritten) */}
      <Navbar navItems={navItems} />
      <Banner />
      <RevealOnScroll className="px-6 md:px-8">
        <section className="max-w-7xl mx-auto py-16">
          <div className="rounded-3xl px-8 md:px-12 py-14 text-center text-white shadow-2xl bg-[linear-gradient(to_right,_#284E9E,_#6C17D3)]">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Ready to <span className="text-orange-300">boost</span> your
              business?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Book a demo to see Margda Workplace in action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="px-8 py-3 rounded-full bg-white/20 hover:bg-white/30 border border-white/40 font-semibold"
              >
                Request a Demo
              </Link>
              <Link
                href="/login"
                className="px-8 py-3 rounded-full bg-white text-indigo-700 font-semibold hover:bg-gray-100"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Communication (kept, but placed in a Vinove-like "section" wrapper) */}
      <RevealOnScroll className="px-6 md:px-8">
        <section className="max-w-7xl mx-auto py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200 mb-4">
                Unified Communication (CRM)
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-gray-900 mb-4">
                SIM+API Multichannel Comms with Client Timelines
              </h2>
              <p className="text-gray-600 mb-6">
                Calls, WhatsApp, SMS, Email, Virtual Meetings, and Visit
                Tracking — all browser-integrated with a single, searchable
                timeline.
              </p>

              <ul className="space-y-3 text-gray-800">
                <li className="flex items-start gap-3">
                  <Mails className="mt-0.5" />
                  <span>
                    CRM & Campaigns: Email, WhatsApp, SMS, Call & Social
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <SendHorizontal className="mt-0.5" />
                  <span>Unified communication with end-to-end timeline</span>
                </li>
                <li className="flex items-start gap-3">
                  <FileUser className="mt-0.5" />
                  <span>Teamwork reports & accountability</span>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/login"
                  className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow"
                >
                  Client Timeline Dashboard
                </Link>
                <Link
                  href="/login"
                  className="px-6 py-3 rounded-full border border-blue-200 text-blue-700 hover:bg-blue-50 font-semibold"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>

            {/* Cards rail (unchanged component) */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
              <ScrollableCardsContainer
                cardData={cardData}
                scrollRef={scrollRef}
              />
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Smart Tools (kept content/images, redesigned layout like Vinove "What we do") */}
      <RevealOnScroll className="px-6 md:px-8">
        <section className="max-w-7xl mx-auto py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold border border-violet-200 mb-4">
                Smart Tools (AI-powered)
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold leading-tight text-gray-900 mb-4">
                Move faster with purpose-built AI assistants
              </h3>
              <p className="text-gray-600 mb-6">
                Your stack for growth: counselling, sales, hiring, training, and
                progress analytics.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    text: "Career & Education Counselling",
                    icon: GraduationCap,
                  },
                  { text: "Marketing & Sales", icon: TrendingUp },
                  { text: "Hiring & Recruitment", icon: Users },
                  { text: "Teaching & Training", icon: BookOpen },
                  { text: "Study & Progress Meter", icon: BarChart3 },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
                    >
                      <Icon size={20} />
                      <span className="text-sm font-medium">{item.text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/login"
                  className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow"
                >
                  Request a Demo
                </Link>
                <Link
                  href="/login"
                  className="px-6 py-3 rounded-full border border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-semibold"
                >
                  Explore Tools
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center">
              <Image
                src="/lead-generation-new.png"
                alt="Smart Tools Illustration"
                width={560}
                height={420}
                className="w-full max-w-xl rounded-2xl shadow-lg"
                style={{ animation: "float 3s ease-in-out infinite" }}
                priority={false}
              />
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Service Exchange (kept content/image, refreshed container + colors) */}
      <RevealOnScroll className="px-0">
        <section className="w-full bg-gradient-to-r from-[#284E9E] to-[#6C17D3] text-white">
          <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold">
                Service Exchange
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-extrabold">
                <span className="text-orange-300">Service</span> Exchange
              </h2>
              <p className="mt-2 opacity-90">
                Outsource work or complete tasks to earn — your on-demand
                marketplace.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="max-w-xl mx-auto lg:mx-0">
                <span className="bg-orange-500 px-6 py-2 rounded-md font-semibold inline-block text-lg">
                  Service Required
                </span>
                <p className="mt-2 opacity-90">Outsource and get work done</p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Computer, I.T. and Apps",
                    "Career, Education and Training",
                    "Finance and Insurance",
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
                    <a
                      key={index}
                      href="#"
                      className="block text-white/90 hover:text-orange-300 transition font-medium"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              <div className="text-center lg:text-right">
                <span className="bg-orange-500 px-6 py-2 rounded-md font-semibold inline-block text-lg">
                  Service Offered
                </span>
                <p className="mt-2 opacity-90">
                  Complete tasks to earn instantly
                </p>

                <div className="mt-6 flex justify-center lg:justify-end">
                  <img
                    src="/serviceExchange.png"
                    alt="Service Exchange Illustration"
                    className="rounded-xl shadow-2xl w-full max-w-2xl animate-[float_3s_ease-in-out_infinite]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Big CTA (Vinove-style bold band) */}
      {/* <RevealOnScroll className="px-6 md:px-8">
        <section className="max-w-7xl mx-auto py-16">
          <div className="rounded-3xl px-8 md:px-12 py-14 text-center text-white shadow-2xl bg-[linear-gradient(to_right,_#284E9E,_#6C17D3)]">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Ready to <span className="text-orange-300">boost</span> your
              business?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Book a demo to see Margda Workplace in action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="px-8 py-3 rounded-full bg-white/20 hover:bg-white/30 border border-white/40 font-semibold"
              >
                Request a Demo
              </Link>
              <Link
                href="/login"
                className="px-8 py-3 rounded-full bg-white text-indigo-700 font-semibold hover:bg-gray-100"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </section>
      </RevealOnScroll> */}

      {/* Subscribe (kept) */}
      <RevealOnScroll className="px-6 md:px-8">
        <section className="max-w-5xl mx-auto py-16">
          <div className="bg-white rounded-3xl shadow-sm border border-orange-200 p-6 sm:p-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-600">
                Stay Updated
              </h3>
              <p className="text-blue-500 mt-2">
                Subscribe for the latest updates and offers.
              </p>
            </div>

            <form className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <input
                type="text"
                placeholder="Your Name"
                className="flex-1 min-w-[220px] px-5 py-3 rounded-full border border-orange-300 text-gray-900"
              />
              <input
                type="text"
                placeholder="WhatsApp"
                className="flex-1 min-w-[220px] px-5 py-3 rounded-full border border-orange-300 text-gray-900"
              />
              <input
                type="email"
                placeholder="Email"
                className="flex-1 min-w-[220px] px-5 py-3 rounded-full border border-orange-300 text-gray-900"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-semibold shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </RevealOnScroll>

      <Footer />
    </>
  );
}

function ScrollableCardsContainer({ cardData, scrollRef }) {
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
      className="relative w-full px-2 sm:px-3 pt-4 sm:pt-5 pb-6 sm:pb-8 bg-white rounded-xl shadow-md
                 overflow-y-auto lg:overflow-y-visible lg:overflow-x-auto max-h-96 lg:max-h-none
                 scrollbar-thin hover:scrollbar-thumb-gray-500 scrollbar-thumb-gray-300 scrollbar-track-gray-100
                 border border-gray-200"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-4 lg:min-w-[1200px]">
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
}
