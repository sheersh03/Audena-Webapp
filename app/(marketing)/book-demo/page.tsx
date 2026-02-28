import { StitchPage } from "@/components/StitchPage";
import { getStitchHtml } from "@/lib/stitch-html";

export default function BookDemoPage() {
  const html = getStitchHtml("book-demo");
  return <StitchPage html={html} />;
}
