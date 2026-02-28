import { StitchPage } from "@/components/StitchPage";
import { getStitchHtml } from "@/lib/stitch-html";

export default function DeveloperPortalPage() {
  const html = getStitchHtml("developer-portal");
  return <StitchPage html={html} />;
}
