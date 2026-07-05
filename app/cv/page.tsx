import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { education, experience, skills } from "@/content/cv";

function EntryList({ entries }: { entries: { period: string; title: string; place: string; detail?: string }[] }) {
  return (
    <ul className="space-y-6">
      {entries.map((entry, i) => (
        <li key={i} className="flex flex-col sm:flex-row sm:gap-6">
          <span className="font-mono text-xs uppercase tracking-wider text-muted shrink-0 sm:w-32 pt-1">
            {entry.period}
          </span>
          <div>
            <h3 className="font-serif text-lg text-ink">{entry.title}</h3>
            <p className="text-[14px] text-ink-soft">{entry.place}</p>
            {entry.detail && (
              <p className="mt-1 text-[14px] text-ink-soft leading-relaxed">
                {entry.detail}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function CVPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-12">
        <PageHeader
          kicker="Résumé"
          title="CV"
          dek="Education, experience, and skills. Full history in the downloadable PDF."
        />
        <Link
          href="/cv.pdf"
          className="font-mono text-xs uppercase tracking-wider border border-border-strong text-ink px-4 py-2.5 hover:bg-ink hover:text-paper transition-colors shrink-0"
        >
          Download PDF
        </Link>
      </div>

      <section className="mb-12">
        <h2 className="font-mono text-xs uppercase tracking-[0.15em] text-muted mb-5">
          Education
        </h2>
        <EntryList entries={education} />
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-xs uppercase tracking-[0.15em] text-muted mb-5">
          Experience
        </h2>
        <EntryList entries={experience} />
      </section>

      <section>
        <h2 className="font-mono text-xs uppercase tracking-[0.15em] text-muted mb-5">
          Skills
        </h2>
        <div className="space-y-3">
          {skills.map((group) => (
            <div key={group.category} className="flex flex-col sm:flex-row sm:gap-6">
              <span className="font-mono text-xs uppercase tracking-wider text-muted shrink-0 sm:w-32 pt-0.5">
                {group.category}
              </span>
              <p className="text-[15px] text-ink-soft">{group.items.join(", ")}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
