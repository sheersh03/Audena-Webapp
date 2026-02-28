import { LoginPage } from "@/components/LoginPage";
import { getStitchHtml } from "@/lib/stitch-html";

export default function LoginRoute() {
  const html = getStitchHtml("login");
  return <LoginPage html={html} />;
}
