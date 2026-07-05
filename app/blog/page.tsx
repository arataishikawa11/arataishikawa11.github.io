import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { posts } from "@/content/posts";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <PageHeader
        kicker="Writing"
        title="Blog"
        dek="Notes, write-ups, and the occasional research diary entry."
      />

      {sorted.length === 0 ? (
        <p className="text-ink-soft">Nothing posted yet — check back soon.</p>
      ) : (
        <ul className="divide-y divide-border">
          {sorted.map((post) => (
            <li key={post.slug} className="py-6 first:pt-0">
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-6">
                  <time
                    dateTime={post.date}
                    className="font-mono text-xs uppercase tracking-wider text-muted shrink-0 sm:w-28"
                  >
                    {formatDate(post.date)}
                  </time>
                  <div>
                    <h2 className="font-serif text-2xl text-ink group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-1.5 text-[15px] text-ink-soft leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
