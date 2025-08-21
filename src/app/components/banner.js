"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-500 text-white">
      <div className="absolute inset-0 opacity-20 [background:radial-gradient(600px_200px_at_80%_20%,white,transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight"
            >
              One Workplace for <span className="text-orange-300">CRM</span>,{" "}
              Smart Tools & Service Exchange
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-4 text-white/90 max-w-xl"
            >
              Browser-integrated SIM+API communication, AI-powered tools, and a marketplace
              to get work done — faster.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                href="/login"
                className="px-6 py-3 rounded-full bg-white text-indigo-700 font-semibold hover:bg-gray-100"
              >
                Request a Demo
              </Link>
              <Link
                href="/login"
                className="px-6 py-3 rounded-full border border-white/60 hover:bg-white/10 font-semibold"
              >
                Start Free Trial
              </Link>
            </motion.div>

            <div className="mt-6 text-xs text-white/80">
              No setup fees • Works in your browser • Scales with your team
            </div>
          </div>

          {/* Visual */}
          <div className="flex justify-center md:justify-end">
            <Image
              src="/lead-generation-new.png"
              alt="Hero Visual"
              width={620}
              height={460}
              className="w-full max-w-xl rounded-2xl shadow-2xl"
              style={{ animation: "float 3s ease-in-out infinite" }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
