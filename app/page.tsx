import Link from "next/link";
import { site } from "@/content/site";

const currently = [
  "I'm currently working with Dr. Sacks and Ben Thomas at the Willerson Center for Cardiovascular Modeling and Simulation. (UT Austin)",
  "I'm also partaking in research under Dr. Wong, Professor Marcus, and Dr. Shankar at the Space Sciences Laboratory. (UC Berkeley)",
];

const elsewhere = [
  { label: "Email", href: `mailto:${site.email}` },
  { label: "GitHub", href: site.social.github },
  // { label: "Google Scholar", href: site.social.googleScholar || "#" },
  { label: "CV", href: "/cv" },
].filter((l) => l.href && l.href !== "#");

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent mb-4">
        About
      </p>

      <h1 className="font-serif text-5xl sm:text-6xl text-ink tracking-tight leading-[1.05]">
        {site.name}
      </h1>
      <p className="mt-3 font-serif italic text-lg text-ink-soft">
        {site.role} · {site.affiliation}
      </p>

      <div className="mt-10 space-y-5 max-w-xl text-[15px] leading-relaxed text-ink-soft">
        <p>
          Hi, welcome to my page! I'm Arata and I'm currently a senior at UC Berkeley, majoring in Engineering Physics. 
        </p>
        <p>
          I'm broadly interested in various fields such as computational medicine and modeling, fluid dynamics, and space/planetary science!
        </p>
      </div>

      <div className="mt-12">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted mb-3">
          Currently
        </p>
        <ul className="space-y-2 max-w-xl">
          {currently.map((line, i) => (
            <li
              key={i}
              className="text-[15px] text-ink-soft leading-relaxed pl-4 border-l border-border"
            >
              {line}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted mb-3">
          Elsewhere
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
          {elsewhere.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-ink hover:text-accent underline decoration-border underline-offset-4 hover:decoration-accent transition-colors"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
