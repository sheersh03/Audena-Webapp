import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

type LogoVariant = "lightBg" | "darkBg";

interface SiteLogoProps {
  /** Use darkBg for dark backgrounds (e.g. footer), lightBg for light */
  variant?: LogoVariant;
  /** Show full logo with wordmark (default) or icon only */
  iconOnly?: boolean;
  className?: string;
  /** Height in pixels; width auto */
  height?: number;
}

export function SiteLogo({
  variant = "lightBg",
  iconOnly = false,
  className = "",
  height = 32,
}: SiteLogoProps) {
  const src = iconOnly
    ? variant === "darkBg"
      ? siteConfig.logo.iconDarkBg
      : siteConfig.logo.iconLightBg
    : variant === "darkBg"
      ? siteConfig.logo.darkBg
      : siteConfig.logo.lightBg;

  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src={src}
        alt={siteConfig.name}
        width={iconOnly ? height : 140}
        height={height}
        className="h-auto w-auto object-contain"
        style={{ maxHeight: iconOnly ? height : 32 }}
        priority
      />
    </Link>
  );
}
