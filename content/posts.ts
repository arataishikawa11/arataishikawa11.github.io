export type Post = {
  slug: string;
  title: string;
  date: string; // ISO format
  excerpt: string;
  body: string[]; // one string per paragraph
};

export const posts: Post[] = [
  {
    slug: "hello-world",
    title: "Hello, world",
    date: "2026-01-15",
    excerpt:
      "The first post on this site — replace this with a real entry, or delete it once you have your own writing.",
    body: [
      "This is placeholder body text for your first post. Each entry in content/posts.ts has a body array — one string per paragraph — that renders here.",
      "Replace this file's contents with your own writing, or wire the blog up to a CMS or MDX pipeline later if you outgrow a plain data file.",
    ],
  },
  {
    slug: "notes-on-a-recent-paper",
    title: "Notes on a recent paper",
    date: "2026-03-02",
    excerpt:
      "A short placeholder for a reading note, a conference recap, or a technical write-up.",
    body: [
      "Use posts like this for reading notes, conference recaps, or short technical write-ups.",
      "Delete or edit freely — this is just here to show the layout with more than one entry.",
    ],
  },
];
