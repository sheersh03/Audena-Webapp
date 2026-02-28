import { StitchPage } from "@/components/StitchPage";
import { getStitchHtml } from "@/lib/stitch-html";

export default function FeaturesPage() {
  const html = getStitchHtml("features");
  return <StitchPage html={html} />;
}
