import { readFileSync } from "fs";
import { join } from "path";

const SCREENS_DIR = join(process.cwd(), "stitch-screens");

function extractBody(html: string): string {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return bodyMatch ? bodyMatch[1].trim() : html;
}

export function getStitchHtml(screenName: string): string {
  const filePath = join(SCREENS_DIR, `${screenName}.html`);
  const html = readFileSync(filePath, "utf-8");
  return extractBody(html);
}
