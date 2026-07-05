import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { publications } from "@/content/publications";

export default function PublicationsPage() {
  const sorted = [...publications].sort((a, b) => b.year - a.year);
  const total = sorted.length;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <PageHeader
        kicker="Research"
        title="Publications"
        dek="Papers, preprints, and other written research output, newest first."
      />

      {sorted.length === 0 ? (
        <p className="text-ink-soft">Nothing published yet.</p>
      ) : (
        <ol className="space-y-8">
          {sorted.map((pub, i) => (
            <li key={i} className="flex gap-4">
              <span className="font-mono text-sm text-muted shrink-0 pt-0.5">
                [{total - i}]
              </span>
              <div>
                <p className="text-[15px] leading-relaxed">
                  <span className="text-ink-soft">{pub.authors}. </span>
                  <span className="font-serif italic text-ink text-[17px]">
                    {pub.title}.
                  </span>{" "}
                  <span className="text-ink-soft">
                    {pub.venue}, {pub.year}.
                  </span>
                </p>
                {pub.links && pub.links.length > 0 && (
                  <div className="mt-1.5 flex gap-4 font-mono text-xs uppercase tracking-wider">
                    {pub.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-accent hover:text-accent-strong underline decoration-border underline-offset-4"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
