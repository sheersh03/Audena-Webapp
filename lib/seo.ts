import type { Metadata } from "next";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
}

export function generateMetadata({
  title,
  description,
  path = "",
}: SEOProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://audena.ai";
  const fullUrl = `${baseUrl}${path}`;

  return {
    title: title ? `${title} | Audena` : "Audena - AI Voice Calls That Sound Human",
    description:
      description ||
      "Automated AI voice calls that sound human. Scale your customer operations with Audena.",
    openGraph: {
      url: fullUrl,
      title: title || "Audena",
      description: description || "AI Voice Calls That Sound Human",
    },
  };
}
