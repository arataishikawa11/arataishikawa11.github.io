export type Publication = {
  title: string;
  authors: string; // your name should be included, e.g. "A. Ishikawa, J. Doe"
  venue: string;
  year: number;
  links?: { label: string; href: string }[];
};

export const publications: Publication[] = [
  {
    title: "An Example Paper Title Goes Here",
    authors: "A. Ishikawa, Coauthor One, Coauthor Two",
    venue: "Venue / Journal / Conference Name",
    year: 2026,
    links: [
      { label: "PDF", href: "#" },
      { label: "Code", href: "#" },
    ],
  },
  {
    title: "A Second Example Publication",
    authors: "A. Ishikawa",
    venue: "Workshop or Preprint Server",
    year: 2025,
    links: [{ label: "arXiv", href: "#" }],
  },
];
