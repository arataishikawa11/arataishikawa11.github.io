export default function PageHeader({
  kicker,
  title,
  dek,
}: {
  kicker: string;
  title: string;
  dek?: string;
}) {
  return (
    <div className="mb-12">
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent mb-3">
        {kicker}
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl text-ink tracking-tight">
        {title}
      </h1>
      {dek && (
        <p className="mt-4 text-ink-soft max-w-xl leading-relaxed">{dek}</p>
      )}
    </div>
  );
}
