import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/content/posts";
import AsciifiedHeading from "@/components/AsciifiedHeading";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
      <Link
        href="/blog"
        className="font-mono text-xs uppercase tracking-wider text-muted hover:text-accent transition-colors"
      >
        &larr; All posts
      </Link>

      <div className="mt-6">
        <AsciifiedHeading
          text={post.title}
          as="h1"
          className="font-serif text-4xl sm:text-5xl text-ink tracking-tight leading-tight"
        />
      </div>
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
