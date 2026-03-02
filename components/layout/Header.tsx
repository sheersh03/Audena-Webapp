"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="stitch-nav"
      className={`glass-nav fixed top-0 left-0 right-0 z-50 rounded-b-[1.75rem] border-b transition-all duration-300 ${
        scrolled
          ? "border-slate-200/50 bg-white/70 shadow-[0_4px_20px_rgba(15,23,42,0.08)]"
          : "border-slate-200/80 bg-white/95 shadow-[0_2px_12px_rgba(15,23,42,0.06)]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <Image
              src={siteConfig.logo.lightBg}
              alt={siteConfig.name}
              width={140}
              height={32}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-slate-700 hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={siteConfig.signInHref}
            className="hidden sm:block px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:text-primary"
          >
            Sign in
          </Link>
          <Link
            href={siteConfig.bookDemoHref}
            className={`px-4 py-2 text-sm font-semibold transition-colors ${
              pathname === siteConfig.bookDemoHref
                ? "text-primary"
                : "text-slate-700 hover:text-primary"
            }`}
          >
            Book a Demo
          </Link>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white p-6 shadow-xl">
            <div className="flex flex-col gap-6 pt-16">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-6 right-6 p-2"
                aria-label="Close menu"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-medium transition-colors ${
                    pathname === item.href
                      ? "text-primary"
                      : "text-slate-700 hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Link
                  href={siteConfig.signInHref}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-sm font-semibold text-slate-700"
                >
                  Sign in
                </Link>
                <Link
                  href={siteConfig.bookDemoHref}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 text-sm font-semibold transition-colors ${
                    pathname === siteConfig.bookDemoHref
                      ? "text-primary"
                      : "text-slate-700 hover:text-primary"
                  }`}
                >
                  Book a Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
