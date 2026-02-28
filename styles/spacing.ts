/**
 * Spacing system for consistent layout
 * Use these values in Tailwind: spacing-{key}
 */
export const spacing = {
  section: {
    sm: "4rem", // 64px
    md: "6rem", // 96px
    lg: "8rem", // 128px
  },
  container: {
    padding: "1rem", // 16px - mobile
    paddingMd: "1.5rem", // 24px - tablet
    paddingLg: "2rem", // 32px - desktop
  },
} as const;
