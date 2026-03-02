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

  useEffect(() => {
    const nav = containerRef.current?.querySelector<HTMLElement>("#stitch-nav");
    if (!nav || nav.querySelector("[data-stitch-mobile-toggle]")) return;

    const actions = nav.querySelector<HTMLElement>(".flex.items-center.gap-4");
    const desktopLinks = nav.querySelector<HTMLElement>(".hidden.md\\:flex");
    if (!actions || !desktopLinks) return;

    const navLinks = Array.from(desktopLinks.querySelectorAll<HTMLAnchorElement>("a"))
      .map((link) => ({ href: link.getAttribute("href") ?? "/", label: link.textContent?.trim() ?? "" }))
      .filter((link) => link.label);

    const utilityLinks = Array.from(actions.querySelectorAll<HTMLAnchorElement>("a"))
      .map((link) => ({
        href: link.getAttribute("href") ?? "/",
        label: link.textContent?.trim() ?? "",
        className: link.className,
      }))
      .filter((link) => link.label);

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Open menu");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("data-stitch-mobile-toggle", "true");
    toggle.className =
      "inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:border-primary hover:text-primary md:hidden";
    toggle.innerHTML =
      '<span class="material-symbols-outlined text-[20px]" data-stitch-mobile-icon="true">menu</span>';

    const panel = document.createElement("div");
    panel.setAttribute("data-stitch-mobile-panel", "true");
    panel.className =
      "hidden border-t border-slate-200/70 bg-white/95 px-6 py-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur md:hidden";

    const linksMarkup = navLinks
      .map(
        (link) =>
          `<a href="${link.href}" class="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-primary">${link.label}</a>`
      )
      .join("");

    const utilityMarkup = utilityLinks
      .map((link, index) => {
        const isPrimary = index === utilityLinks.length - 1;
        const classes = isPrimary
          ? "block rounded-2xl bg-primary px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_12px_24px_rgba(103,141,198,0.22)]"
          : "block rounded-2xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700";
        return `<a href="${link.href}" class="${classes}">${link.label}</a>`;
      })
      .join("");

    panel.innerHTML = `
      <div class="mx-auto flex max-w-7xl flex-col gap-2">
        ${linksMarkup}
        <div class="mt-3 grid gap-3 border-t border-slate-200 pt-3">
          ${utilityMarkup}
        </div>
      </div>
    `;

    actions.insertBefore(toggle, actions.firstChild);
    nav.appendChild(panel);

    const icon = toggle.querySelector<HTMLElement>("[data-stitch-mobile-icon]");

    const closePanel = () => {
      panel.classList.add("hidden");
      toggle.setAttribute("aria-expanded", "false");
      if (icon) icon.textContent = "menu";
    };

    const openPanel = () => {
      panel.classList.remove("hidden");
      toggle.setAttribute("aria-expanded", "true");
      if (icon) icon.textContent = "close";
    };

    const handleToggle = () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closePanel();
      } else {
        openPanel();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closePanel();
      }
    };

    const panelLinks = panel.querySelectorAll<HTMLAnchorElement>("a");

    toggle.addEventListener("click", handleToggle);
    window.addEventListener("resize", handleResize);
    panelLinks.forEach((link) => link.addEventListener("click", closePanel));

    return () => {
      toggle.removeEventListener("click", handleToggle);
      window.removeEventListener("resize", handleResize);
      panelLinks.forEach((link) => link.removeEventListener("click", closePanel));
      toggle.remove();
      panel.remove();
    };
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
