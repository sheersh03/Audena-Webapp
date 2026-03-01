import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <Container>
        <div className="flex flex-col gap-12 py-12 md:flex-row md:justify-between">
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src={siteConfig.logo.lightBg}
                alt={siteConfig.name}
                width={120}
                height={32}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="mt-2 text-sm text-muted">
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap gap-12">
            {siteConfig.footerLinks.map((group) => (
              <div key={group.title}>
                <h4 className="mb-4 font-semibold">{group.title}</h4>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
