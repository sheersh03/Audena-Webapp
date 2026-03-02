import { AppFooter } from "@/components/layout/AppFooter";
import { Header } from "@/components/layout/Header";
import { getStitchMainContent } from "@/lib/stitch-html";

export default function PricingPage() {
  const mainContent = getStitchMainContent("pricing");

  return (
    <div className="min-h-screen flex flex-col font-body bg-background-light text-graphite antialiased">
      <Header />
      <main
        className="flex-1 pt-16"
        dangerouslySetInnerHTML={{ __html: mainContent }}
      />
      <AppFooter />
    </div>
  );
}
