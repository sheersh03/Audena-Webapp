import { Header } from "@/components/layout/Header";
import { AppFooter } from "@/components/layout/AppFooter";
import { getStitchMainContent } from "@/lib/stitch-html";

export default function ContactPage() {
  const mainContent = getStitchMainContent("book-demo");

  return (
    <div className="min-h-screen flex flex-col font-body bg-background-light dark:bg-background-dark text-graphite dark:text-gray-100 antialiased">
      <Header />
      <main
        className="flex-1 pt-16"
        dangerouslySetInnerHTML={{ __html: mainContent }}
      />
      <AppFooter />
    </div>
  );
}