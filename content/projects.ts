export type Project = {
  title: string;
  period: string; // e.g. "2025–present"
  description: string;
  tags: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    title: "Project One",
    period: "2025 – present",
    description:
      "A short description of the project: what problem it addresses, what you built, and what's notable about the approach.",
    tags: ["Python", "Machine Learning"],
    href: "#",
  },
  {
    title: "Project Two",
    period: "2024",
    description:
      "Another project summary. Replace with real work — research code, tools, or applications you want to highlight.",
    tags: ["TypeScript", "Web"],
    href: "#",
  },
];
