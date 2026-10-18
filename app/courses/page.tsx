import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CoursesList from "@/components/CoursesList";
import { courses } from "@/content/courses";

export const metadata: Metadata = {
  title: "Courses",
  description: "Courses taken, ratings, and reflections.",
};

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <PageHeader
        kicker="Academics"
        title="Courses"
        dek="A review and ranking of coursework taken so far, evaluated on difficulty, workload, fun/interest, and practical usefulness."
      />
      <CoursesList courses={courses} />
    </div>
  );
}
