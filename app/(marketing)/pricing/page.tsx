import { StitchPage } from "@/components/StitchPage";
import { getStitchHtml } from "@/lib/stitch-html";

export default function PricingPage() {
  const html = getStitchHtml("pricing");
  return <StitchPage html={html} />;
}
