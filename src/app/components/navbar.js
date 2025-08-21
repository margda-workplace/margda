"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar({ navItems = [] }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
          
          {/* Brand on the left */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.webp"
              alt="Logo"
              width={0}
              height={0}
              sizes="100vw"
              className="w-80 h-auto object-contain"
            />
          </Link>

          {/* Right side nav + CTA */}
          <div className="flex items-center gap-10">
            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href || "#"}
                    className="flex items-center gap-2 px-4 py-2 text-lg md:text-xl font-semibold text-gray-800 rounded-full transition hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    {item.icon && (
                      <Image
                        src={`/${item.icon}`}
                        alt={item.label}
                        width={26}
                        height={26}
                        className="rounded-sm"
                      />
                    )}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="hidden md:flex items-center">
              <Link
                href="/login"
                className="px-6 py-2 rounded-full bg-indigo-600 text-white text-lg font-semibold hover:bg-indigo-700 transition"
              >
                Login
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href || "#"}
                className="block px-4 py-2 rounded-full text-lg font-semibold text-gray-800 hover:bg-indigo-50 hover:text-indigo-700 transition"
                onClick={() => setOpen(false)}
              >
                <div className="flex items-center gap-3">
                  {item.icon && (
                    <Image
                      src={`/${item.icon}`}
                      alt={item.label}
                      width={24}
                      height={24}
                      className="rounded-sm"
                    />
                  )}
                  {item.label}
                </div>
              </Link>
            ))}

            <Link
              href="/login"
              className="inline-flex mt-3 px-6 py-2 rounded-full bg-indigo-600 text-white text-lg font-semibold hover:bg-indigo-700 transition"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
