import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/content/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  return { title: post ? post.title : "Post not found" };
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
      <Link
        href="/blog"
        className="font-mono text-xs uppercase tracking-wider text-muted hover:text-accent transition-colors"
      >
        &larr; All posts
      </Link>

      <h1 className="mt-6 font-serif text-4xl sm:text-5xl text-ink tracking-tight leading-tight">
        {post.title}
      </h1>
      <time
        dateTime={post.date}
        className="mt-4 block font-mono text-xs uppercase tracking-wider text-muted"
      >
        {formatDate(post.date)}
      </time>

      <div className="mt-10 space-y-5 text-[16px] leading-relaxed text-ink-soft">
        {post.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  );
}
