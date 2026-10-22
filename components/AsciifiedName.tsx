"use client";

import { site } from "@/content/site";
import AsciifiedHeading from "@/components/AsciifiedHeading";

interface AsciifiedNameProps {
  className?: string;
}

export default function AsciifiedName({ className = "" }: AsciifiedNameProps) {
  return (
    <AsciifiedHeading
      text={site.name}
      as="h1"
      className={`font-serif text-5xl sm:text-6xl text-ink tracking-tight leading-[1.05] ${className}`}
    />
  );
}
