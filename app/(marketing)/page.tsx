import { StitchPage } from "@/components/StitchPage";
import { getStitchHtml } from "@/lib/stitch-html";

export default function HomePage() {
  const html = getStitchHtml("homepage");
  return <StitchPage html={html} />;
}
