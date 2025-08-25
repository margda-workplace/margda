"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-500 text-white">
      <div className="absolute inset-0 opacity-20 [background:radial-gradient(600px_200px_at_80%_20%,white,transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            {/* <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
            >
              <span className="text-orange-300">Margda Workplace</span> - One Platform for Everything
            </motion.h1> */}
            
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-8 text-3xl font-bold"
            >
              Business: Achieve More with Less Effort
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 text-white/90 max-w-xl"
            >
              Margda Workplace is a SaaS platform integrated with a Unified CRM, Smart Tools, and Service Exchange — to help businesses streamline operations, enhance productivity, and drive growth by outsourcing their requirements and getting the work done.
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 text-3xl font-bold"
            >
              Professional: Create Multiple Income Streams
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 text-white/90 max-w-xl"
            >
              Margda Workplace platform empowers people to work from anywhere, at any time, flexibly and complete the tasks based on their interest, skills, and ability for instant payouts, fixed long-term earnings and  24/7 automated income.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                href="/login"
                className="px-8 py-4 rounded-full bg-orange-400 text-white font-bold hover:bg-orange-300 transition-colors shadow-lg hover:shadow-xl"
              >
                Start Your Journey
              </Link>
              <Link
                href="/demo"
                className="px-8 py-4 rounded-full border-2 border-white/60 hover:bg-white/10 font-semibold transition-all"
              >
                Request Demo
              </Link>
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 text-sm text-white/80"
            >
              ✨ No setup fees • 🌐 Works in your browser • 📈 Scales with your needs
            </motion.div> */}
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
                          <div className="relative">
              <Image
                src="/heroimage.webp"
                alt="Margda Workplace Platform"
                width={620}
                height={460}
                className="w-full max-w-xl rounded-2xl shadow-2xl"
                style={{ animation: "float 3s ease-in-out infinite" }}
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}