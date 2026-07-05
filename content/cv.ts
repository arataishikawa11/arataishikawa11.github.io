export type CVEntry = {
  period: string;
  title: string;
  place: string;
  PI?: string;
  detail?: string;
};

export const education: CVEntry[] = [
  {
    period: "2023 - 2027",
    title: "B.S., Engineering Physics",
    place: "University of California, Berkeley",
    // detail: "Thesis title or honors, if applicable.",
  },
];

export const experience: CVEntry[] = [
  {
    period: "2026 – present",
    title: "Moncrief Research Intern @ Oden Institute for CS&E",
    place: "University of Texas, Austin",
    PI: "PI: Michael S. Sacks",
    detail: "Project: 3D kinematic study of normal and diseased hearts using refined B-splined surface and volumetric mappings.",
  },
];

export const skills: { category: string; items: string[] }[] = [
  { category: "Languages", items: ["Python", "TypeScript", "R"] },
  { category: "Tools", items: ["JAX", "Git", "Linux"] },
];
