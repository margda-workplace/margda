"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, Zap, Globe, Rocket, Play } from "lucide-react";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-500 text-white">
      <div className="absolute inset-0 opacity-20 [background:radial-gradient(600px_200px_at_80%_20%,white,transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 lg:py-28 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 sm:space-y-10 lg:space-y-12">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight flex items-center gap-3 sm:gap-4"
            >
              <Building2 className="w-7 h-7 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-orange-400 flex-shrink-0" />
              <span className="whitespace-nowrap">Margda Workplace</span>
            </motion.h2>
            
            <div className="space-y-6 sm:space-y-7 lg:space-y-8">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white/90 max-w-xl text-base sm:text-lg lg:text-xl leading-relaxed flex items-start gap-3"
              >
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 mt-1 flex-shrink-0" />
                Margda Workplace is a SaaS platform integrated with a Unified CRM, Smart Tools, and Service Exchange — to help businesses streamline operations, enhance productivity, and drive growth by outsourcing their requirements and getting the work done.
              </motion.p>            
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-white/90 max-w-xl text-base sm:text-lg lg:text-xl leading-relaxed flex items-start gap-3"
              >
                <Globe className="w-5 h-5 sm:w-6 sm:h-6 mt-1 flex-shrink-0" />
                Margda Workplace platform empowers people to work from anywhere, at any time, flexibly and complete the tasks based on their interest, skills, and ability for instant payouts, fixed long-term earnings and 24/7 automated income.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            >
              <Link
                href="/login"
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-full text-blue-800 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 font-bold hover:scale-105 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
                Try it for free
              </Link>
              <Link
                href="/"
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border-1 border-white/60 hover:scale-105 hover:bg-orange-400 hover:border-orange-400 hover:text-blue-800 font-semibold transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                Get a demo
              </Link>
            </motion.div>
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
                height={400}
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