"use client";

import { useEffect, useRef } from "react";

interface PricingMainProps {
  html: string;
}

const MONTHLY_PRICING = {
  starter: "$499",
  growth: "$1,299",
  period: "/mo",
};

const YEARLY_PRICING = {
  starter: "$399",
  growth: "$1,039",
  period: "/mo billed yearly",
};

export function PricingMain({ html }: PricingMainProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const toggle = container.querySelector<HTMLButtonElement>(
      "#pricing-billing-toggle"
    );
    const thumb = container.querySelector<HTMLElement>("#pricing-billing-thumb");
    const monthlyLabel = container.querySelector<HTMLElement>(
      "#pricing-billing-monthly"
    );
    const yearlyLabel = container.querySelector<HTMLElement>(
      "#pricing-billing-yearly"
    );
    const starterPrice = container.querySelector<HTMLElement>(
      "#pricing-starter-price"
    );
    const starterPeriod = container.querySelector<HTMLElement>(
      "#pricing-starter-period"
    );
    const growthPrice = container.querySelector<HTMLElement>(
      "#pricing-growth-price"
    );
    const growthPeriod = container.querySelector<HTMLElement>(
      "#pricing-growth-period"
    );

    if (
      !toggle ||
      !thumb ||
      !monthlyLabel ||
      !yearlyLabel ||
      !starterPrice ||
      !starterPeriod ||
      !growthPrice ||
      !growthPeriod
    ) {
      return;
    }

    const applyPricing = (isYearly: boolean) => {
      const pricing = isYearly ? YEARLY_PRICING : MONTHLY_PRICING;

      toggle.setAttribute("aria-pressed", String(isYearly));
      toggle.className = `relative h-6 w-12 rounded-full p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        isYearly ? "bg-primary/20" : "bg-slate-200"
      }`;
      thumb.className = `block h-4 w-4 rounded-full bg-primary transition-transform duration-200 ${
        isYearly ? "translate-x-6" : "translate-x-0"
      }`;

      monthlyLabel.className = `text-sm font-semibold transition-colors ${
        isYearly ? "text-slate-500" : "text-graphite"
      }`;
      yearlyLabel.className = `text-sm font-medium transition-colors ${
        isYearly ? "text-primary" : "text-slate-500"
      }`;

      starterPrice.textContent = pricing.starter;
      starterPeriod.textContent = pricing.period;
      growthPrice.textContent = pricing.growth;
      growthPeriod.textContent = pricing.period;
    };

    let isYearly = false;
    applyPricing(isYearly);

    const handleToggle = () => {
      isYearly = !isYearly;
      applyPricing(isYearly);
    };

    toggle.addEventListener("click", handleToggle);
    return () => toggle.removeEventListener("click", handleToggle);
  }, []);

  return (
    <main
      ref={containerRef}
      className="flex-1 pt-16"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
