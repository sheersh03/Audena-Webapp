"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { siteConfig } from "@/config/site";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            {siteConfig.name}
          </Link>

          <div className="hidden md:flex md:items-center md:gap-8">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:gap-4">
            <Link href="/contact">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="sm">Book a Demo</Button>
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </nav>
      </Container>

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
