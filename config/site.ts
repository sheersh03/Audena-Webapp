export const siteConfig = {
  name: "Audena",
  description: "Automated AI voice calls that sound human.",
  /** Logo paths (in /public). Use light-bg on light backgrounds, dark-bg on dark. */
  logo: {
    lightBg: "/logo/audena-logo-light-bg.png",
    darkBg: "/logo/audena-logo-dark-bg.png",
    iconLightBg: "/logo/audena-icon-light-bg.png",
    iconDarkBg: "/logo/audena-icon-dark-bg.png",
  },
  navItems: [
    { label: "Platform", href: "/#features" },
    { label: "Features", href: "/features" },
    { label: "Methodology", href: "/#how-it-works" },
    { label: "Pricing", href: "/pricing" },
  ],
  footerLinks: [
    {
      title: "Product",
      links: [
        { label: "Agent Canvas", href: "/features" },
        { label: "Voice Analytics", href: "/features" },
        { label: "Integrations", href: "/features" },
        { label: "Security", href: "/features" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Trust Center", href: "/about" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/about" },
        { label: "API Docs", href: "/developer-portal" },
        { label: "Case Studies", href: "/about" },
        { label: "Guides", href: "/about" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/about" },
        { label: "Terms of Service", href: "/about" },
      ],
    },
  ],
  signInHref: "/login",
  bookDemoHref: "/book-demo",
};
