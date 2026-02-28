"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background p-6">
        <div className="flex flex-col gap-6">
          <button
            onClick={onClose}
            className="self-end"
            aria-label="Close menu"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="text-lg font-medium"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-4">
            <Link href="/contact" onClick={onClose}>
              <Button variant="ghost" className="w-full">
                Sign In
              </Button>
            </Link>
            <Link href="/contact" onClick={onClose}>
              <Button className="w-full">Book a Demo</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
