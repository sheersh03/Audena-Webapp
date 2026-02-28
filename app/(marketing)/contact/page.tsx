import { StitchPage } from "@/components/StitchPage";
import { getStitchHtml } from "@/lib/stitch-html";

export default function ContactPage() {
  const html = getStitchHtml("book-demo");
  return <StitchPage html={html} />;
}