"use client";

import { useEffect } from "react";

/**
 * Forces light theme on the book-demo page to match pricing and other marketing pages.
 * Removes the 'dark' class from html and sets localStorage so the light theme persists.
 */
export function ForceLightTheme() {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("dark");
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", "light");
    }
  }, []);

  return null;
}
