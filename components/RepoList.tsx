"use client";

import { useEffect, useState } from "react";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
};

export default function RepoList({ username }: { username: string }) {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
        return res.json();
      })
      .then((data: Repo[]) => {
        if (!cancelled) setRepos(data.filter((r) => !r.fork));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  if (error) {
    return (
      <p className="text-ink-soft text-sm">
        Couldn&apos;t load repositories from GitHub right now ({error}). See
        them directly on{" "}
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline decoration-border underline-offset-4"
        >
          github.com/{username}
        </a>
        .
      </p>
    );
  }

  if (!repos) {
    return (
      <ul className="space-y-6 animate-pulse" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <li key={i} className="h-16 bg-paper-raised rounded-sm" />
        ))}
      </ul>
    );
  }

  if (repos.length === 0) {
    return <p className="text-ink-soft">No public repositories yet.</p>;
  }

  return (
    <ul className="divide-y divide-border">
      {repos.map((repo) => (
        <li key={repo.id} className="py-5 first:pt-0">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-mono text-[15px] text-ink group-hover:text-accent transition-colors">
                {repo.name}
              </h2>
              <span className="font-mono text-xs text-muted shrink-0">
                {repo.stargazers_count > 0 && `★ ${repo.stargazers_count}`}
              </span>
            </div>
            {repo.description && (
              <p className="mt-1 text-[14px] text-ink-soft leading-relaxed">
                {repo.description}
              </p>
            )}
            {repo.language && (
              <p className="mt-1.5 font-mono text-xs uppercase tracking-wider text-muted">
                {repo.language}
              </p>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
