import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="mx-auto max-w-3xl px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-xs text-muted">
        <p>
          &copy; {new Date().getFullYear()} {site.name}
        </p>
        <p>Built with Next.js, hosted on GitHub Pages.</p>
      </div>
    </footer>
  );
}
