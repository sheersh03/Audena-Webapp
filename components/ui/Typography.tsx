import { cn } from "@/lib/cn";

type HeadingTag = "h1" | "h2" | "h3" | "h4";
type TextTag = "p" | "span";

interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "small" | "muted";
  children: React.ReactNode;
  className?: string;
  as?: HeadingTag | TextTag;
}

export function Typography({
  variant = "body",
  children,
  className,
  as,
}: TypographyProps) {
  const Component: HeadingTag | TextTag =
    as ?? (["h1", "h2", "h3", "h4"].includes(variant) ? (variant as HeadingTag) : "p");

  return (
    <Component
      className={cn(
        {
          "text-4xl font-bold md:text-5xl": variant === "h1",
          "text-3xl font-bold md:text-4xl": variant === "h2",
          "text-2xl font-semibold md:text-3xl": variant === "h3",
          "text-xl font-semibold": variant === "h4",
          "text-base": variant === "body",
          "text-sm": variant === "small",
          "text-sm text-muted": variant === "muted",
        },
        className
      )}
    >
      {children}
    </Component>
  );
}
