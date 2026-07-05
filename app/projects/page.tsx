import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { projects } from "@/content/projects";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <PageHeader
        kicker="Selected work"
        title="Projects"
        dek="A curated set of things I've built or led — see Repositories for the full list of public code."
      />

      {projects.length === 0 ? (
        <p className="text-ink-soft">Nothing to show yet.</p>
      ) : (
        <div className="space-y-10">
          {projects.map((project, i) => (
            <article
              key={i}
              className="pb-10 border-b border-border last:border-none last:pb-0"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="font-serif text-2xl text-ink">
                  {project.href && project.href !== "#" ? (
                    <Link
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                    >
                      {project.title}
                    </Link>
                  ) : (
                    project.title
                  )}
                </h2>
                <span className="font-mono text-xs text-muted">
                  {project.period}
                </span>
              </div>
              <p className="mt-2 text-[15px] text-ink-soft leading-relaxed max-w-xl">
                {project.description}
              </p>
              {project.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs uppercase tracking-wider text-accent-strong bg-accent-tint px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
