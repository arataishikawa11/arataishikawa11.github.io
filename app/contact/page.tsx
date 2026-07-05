import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { site } from "@/content/site";

const rows = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Location", value: site.location },
  { label: "GitHub", value: site.social.github?.replace("https://", ""), href: site.social.github },
  { label: "Google Scholar", value: site.social.googleScholar ? "Profile" : undefined, href: site.social.googleScholar },
  { label: "LinkedIn", value: site.social.linkedin ? "Profile" : undefined, href: site.social.linkedin },
].filter((r) => r.value);

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <PageHeader
        kicker="Get in touch"
        title="Contact"
        dek="The fastest way to reach me is email. I try to reply within a few days."
      />

      <dl className="divide-y divide-border max-w-md">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-4 py-4"
          >
            <dt className="font-mono text-xs uppercase tracking-wider text-muted">
              {row.label}
            </dt>
            <dd className="text-[15px] text-ink text-right">
              {row.href ? (
                <Link
                  href={row.href}
                  target={row.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    row.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="hover:text-accent underline decoration-border underline-offset-4 hover:decoration-accent transition-colors"
                >
                  {row.value}
                </Link>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-10 text-sm text-muted max-w-md leading-relaxed">
        Looking for a contact form instead of email? A static site like this
        one can add a working form via a service like Formspree without
        needing a backend — say the word and it can be wired in.
      </p>
    </div>
  );
}
