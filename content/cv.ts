export type CVEntry = {
  period: string;
  title: string;
  place: string;
  detail?: string;
};

export const education: CVEntry[] = [
  {
    period: "20XX – 20XX",
    title: "Degree, Field of Study",
    place: "University Name",
    detail: "Thesis title or honors, if applicable.",
  },
];

export const experience: CVEntry[] = [
  {
    period: "20XX – present",
    title: "Role Title",
    place: "Organization Name",
    detail: "One line on scope or a key contribution.",
  },
];

export const skills: { category: string; items: string[] }[] = [
  { category: "Languages", items: ["Python", "TypeScript", "R"] },
  { category: "Tools", items: ["PyTorch", "Git", "Linux"] },
];
