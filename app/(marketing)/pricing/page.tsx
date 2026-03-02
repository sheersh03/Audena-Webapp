import { AppFooter } from "@/components/layout/AppFooter";
import { Header } from "@/components/layout/Header";
import { getStitchMainContent } from "@/lib/stitch-html";
import { PricingMain } from "./PricingMain";

function enhancePricingHtml(html: string): string {
  return html
    .replace(
      '<span class="text-sm font-medium">Monthly</span>',
      '<span id="pricing-billing-monthly" class="text-sm font-semibold text-graphite transition-colors">Monthly</span>'
    )
    .replace(
      '<button class="relative w-12 h-6 bg-primary/20 dark:bg-primary/10 rounded-full p-1 transition-colors focus:outline-none ring-2 ring-primary">',
      '<button id="pricing-billing-toggle" type="button" aria-label="Toggle yearly pricing" aria-pressed="false" class="relative h-6 w-12 rounded-full bg-slate-200 p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">'
    )
    .replace(
      '<span class="block w-4 h-4 bg-primary rounded-full transition-transform transform translate-x-6"></span>',
      '<span id="pricing-billing-thumb" class="block h-4 w-4 rounded-full bg-primary transition-transform duration-200"></span>'
    )
    .replace(
      '<span class="text-sm font-medium text-slate-500">Yearly <span class="text-emerald-500 font-bold ml-1">(-20%)</span></span>',
      '<span id="pricing-billing-yearly" class="text-sm font-medium text-slate-500 transition-colors">Yearly <span class="ml-1 font-bold text-emerald-500">(-20%)</span></span>'
    )
    .replace(
      '<span class="text-4xl font-bold">$499</span>',
      '<span id="pricing-starter-price" class="text-4xl font-bold">$499</span>'
    )
    .replace(
      '<span class="text-slate-500 dark:text-slate-400">/mo</span>',
      '<span id="pricing-starter-period" class="text-slate-500 dark:text-slate-400">/mo</span>'
    )
    .replace(
      '<span class="text-4xl font-bold">$1,299</span>',
      '<span id="pricing-growth-price" class="text-4xl font-bold">$1,299</span>'
    )
    .replace(
      '<span class="text-slate-500 dark:text-slate-400">/mo</span>',
      '<span id="pricing-growth-period" class="text-slate-500 dark:text-slate-400">/mo</span>'
    );
}

export default function PricingPage() {
  const mainContent = enhancePricingHtml(getStitchMainContent("pricing"));

  return (
    <div className="min-h-screen flex flex-col font-body bg-background-light text-graphite antialiased">
      <Header />
      <PricingMain html={mainContent} />
      <AppFooter />
    </div>
  );
}
