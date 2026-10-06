"use client";

import { useMemo, useState } from "react";
import type { Course } from "@/content/courses";

type SortOption =
  | "default"
  | "difficulty-desc"
  | "difficulty-asc"
  | "workload-desc"
  | "workload-asc"
  | "interest-desc"
  | "usefulness-desc"
  | "code-asc";

function RatingBar({
  value,
  max = 5,
  label,
}: {
  value: number;
  max?: number;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-1 min-w-[70px]">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-muted text-[11px] uppercase tracking-wider">{label}</span>
        <span className="text-ink font-semibold">{value}/{max}</span>
      </div>
      <div className="flex gap-1" aria-label={`${label}: ${value} out of ${max}`}>
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-xs transition-colors ${
              i < value ? "bg-accent" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function CoursesList({ courses }: { courses: Course[] }) {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  // Collect all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    courses.forEach((c) => c.tags?.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, [courses]);

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    const q = search.trim().toLowerCase();

    const filtered = courses.filter((c) => {
      const matchesSearch =
        !q ||
        c.code.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q) ||
        c.term.toLowerCase().includes(q) ||
        c.comments.toLowerCase().includes(q) ||
        c.tags?.some((t) => t.toLowerCase().includes(q));

      const matchesTag =
        selectedTag === "All" || (c.tags && c.tags.includes(selectedTag));

      return matchesSearch && matchesTag;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "difficulty-desc":
          return b.difficulty - a.difficulty;
        case "difficulty-asc":
          return a.difficulty - b.difficulty;
        case "workload-desc":
          return b.workload - a.workload;
        case "workload-asc":
          return a.workload - b.workload;
        case "interest-desc":
          return b.interest - a.interest;
        case "usefulness-desc":
          return b.usefulness - a.usefulness;
        case "code-asc":
          return a.code.localeCompare(b.code);
        case "default":
        default:
          return 0; // Preserves content/courses.ts order
      }
    });
  }, [courses, search, selectedTag, sortBy]);

  return (
    <div className="space-y-8">
      {/* Search and Filters Controls */}
      <div className="p-4 sm:p-5 rounded-lg border border-border bg-paper-raised/60 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-2">
            <label htmlFor="course-search" className="sr-only">
              Search courses
            </label>
            <input
              id="course-search"
              type="text"
              placeholder="Search code, title, professor, or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-paper border border-border rounded text-ink placeholder:text-muted focus:border-accent focus:outline-none transition-colors"
            />
          </div>

          {/* Sort Dropdown */}
          <div>
            <label htmlFor="course-sort" className="sr-only">
              Sort by
            </label>
            <select
              id="course-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full px-3.5 py-2 text-sm bg-paper border border-border rounded text-ink focus:border-accent focus:outline-none cursor-pointer transition-colors"
            >
              <option value="default">Sort: Default order</option>
              <option value="interest-desc">Interest (Highest first)</option>
              <option value="usefulness-desc">Usefulness (Highest first)</option>
              <option value="difficulty-desc">Difficulty (Hardest first)</option>
              <option value="difficulty-asc">Difficulty (Easiest first)</option>
              <option value="workload-desc">Workload (Heaviest first)</option>
              <option value="workload-asc">Workload (Lightest first)</option>
              <option value="code-asc">Course Code (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Tag Pills */}
        {allTags.length > 1 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-border/70">
            <span className="font-mono text-xs uppercase tracking-wider text-muted mr-1.5">
              Subject:
            </span>
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`font-mono text-xs px-2.5 py-1 rounded transition-colors ${
                  selectedTag === tag
                    ? "bg-accent text-paper font-medium"
                    : "bg-paper text-ink-soft border border-border hover:border-accent hover:text-ink"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Courses List */}
      {filteredCourses.length === 0 ? (
        <div className="py-12 text-center text-ink-soft border border-dashed border-border rounded-lg">
          <p className="text-sm">No courses match your current search or filters.</p>
          {(search || selectedTag !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedTag("All");
              }}
              className="mt-3 text-xs font-mono uppercase tracking-wider text-accent underline underline-offset-4 hover:text-accent-strong"
            >
              Reset filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center text-xs font-mono text-muted">
            <span>
              Showing {filteredCourses.length} of {courses.length} courses
            </span>
          </div>

          <div className="space-y-6">
            {filteredCourses.map((course) => (
              <article
                key={course.code}
                className="p-6 rounded-lg border border-border bg-paper transition-shadow hover:border-accent/40"
              >
                {/* Header: Code, Title, Term & Instructor */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-y-1 gap-x-4 border-b border-border/60 pb-4">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-sm font-semibold tracking-wider text-accent">
                        {course.code}
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl text-ink mt-0.5">
                      {course.title}
                    </h2>
                  </div>
                  <div className="text-left sm:text-right font-mono text-xs text-muted shrink-0 space-y-0.5">
                    <div>{course.term}</div>
                    <div className="text-ink-soft">{course.instructor}</div>
                  </div>
                </div>

                {/* Ratings Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-border/60 bg-paper-raised/30 px-3 -mx-3 my-3 rounded">
                  <RatingBar label="Difficulty" value={course.difficulty} />
                  <RatingBar label="Workload" value={course.workload} />
                  <RatingBar label="Interest" value={course.interest} />
                  <RatingBar label="Usefulness" value={course.usefulness} />
                </div>

                {/* Comments / Reflections */}
                {course.comments && (
                  <p className="mt-3 text-[15px] text-ink-soft leading-relaxed">
                    {course.comments}
                  </p>
                )}

                {/* Tags */}
                {course.tags && course.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5 pt-2">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] uppercase tracking-wider text-accent-strong bg-accent-tint px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
