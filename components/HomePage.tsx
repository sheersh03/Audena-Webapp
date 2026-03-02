"use client";

import { StitchPage } from "@/components/StitchPage";

interface HomePageProps {
  html: string;
}

export function HomePage({ html }: HomePageProps) {
  return <StitchPage html={html} />;
}
