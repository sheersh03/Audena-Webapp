"use client";

import { useEffect, useRef } from "react";

interface StitchPageProps {
  html: string;
  /** Optional: run after mount to attach event listeners (e.g. login form, theme toggle) */
  enhance?: (container: HTMLElement) => void | (() => void);
  /** Optional: override wrapper className (e.g. for login page background) */
  className?: string;
}

function transformLinks(html: string): string {
  return html
    .replace(
      /<nav class="([^"]*)"/,
      '<nav id="stitch-nav" class="$1 stitch-nav-at-top"'
    )
    .replace(/href="#"/g, 'href="/"')
    .replace(/href="#features"/g, 'href="/#features"')
    .replace(/href="#solutions"/g, 'href="/#solutions"')
    .replace(/href="#how-it-works"/g, 'href="/#how-it-works"')
    .replace(
      /<a class="text-sm font-medium hover:text-primary[^"]*" href="#">Pricing<\/a>/g,
      '<a class="text-sm font-medium hover:text-primary transition-colors" href="/pricing">Pricing</a>'
    )
    .replace(
      /<a[^>]*href="#">Sign in<\/a>/g,
      '<a class="text-sm font-semibold px-4 py-2 hover:opacity-70 transition-opacity" href="/login">Sign in</a>'
    )
    .replace(
      /<a[^>]*href="#">Book a Demo<\/a>/g,
      '<a class="bg-graphite dark:bg-white text-white dark:text-graphite px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-all" href="/book-demo">Book a Demo</a>'
    )
    .replace(
      /<a class="flex items-center gap-2[^"]*" href="#">/g,
      '<a class="flex items-center gap-2 group" href="/">'
    )
    .replace(
      /<a class="flex items-center gap-2 group" href="#">/g,
      '<a class="flex items-center gap-2 group" href="/">'
    );
}

export function StitchPage({ html, enhance, className }: StitchPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const cleanup = enhance?.(container);
    return cleanup;
  }, [enhance]);

  useEffect(() => {
    const nav = containerRef.current?.querySelector("#stitch-nav");
    if (!nav) return;

    const handleScroll = () => {
      if (window.scrollY > 20) {
        nav.classList.add("stitch-nav-scrolled");
        nav.classList.remove("stitch-nav-at-top");
      } else {
        nav.classList.remove("stitch-nav-scrolled");
        nav.classList.add("stitch-nav-at-top");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const transformedHtml = transformLinks(html);

  return (
    <div
      ref={containerRef}
      className={`stitch-page font-body bg-background-light text-graphite antialiased min-h-screen ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: transformedHtml }}
    />
  );
}
