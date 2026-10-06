export type Project = {
  title: string;
  period: string; // e.g. "2025–present"
  description: string;
  tags: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    title: "Visualizing Lorenz Attractors",
    period: "2025",
    description:
      "Simple and fun program to visualize Lorenz equations (with pygame)! This came after being inspired by the book <em><a href=https://around.com/chaos/>Chaos</a></em> by <a href=https://around.com/about/>James Gleick</a>, and seeing the beautiful phase space representations of Lorenz equations.",
    tags: ["Python", "Lorenz Attractors", "Chaos Theory"],
    href: "#",
  },
  // {
  //   title: "Project Two",
  //   period: "2024",
  //   description:
  //     "Another project summary. Replace with real work — research code, tools, or applications you want to highlight.",
  //   tags: ["TypeScript", "Web"],
  //   href: "#",
  // },
];
