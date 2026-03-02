import { HomePage } from "@/components/HomePage";
import { getStitchHtml } from "@/lib/stitch-html";

export default function HomePageRoute() {
  const html = getStitchHtml("homepage");
  return <HomePage html={html} />;
}
