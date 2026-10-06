export type Post = {
  slug: string;
  title: string;
  date: string; // ISO format
  excerpt: string;
  body: string[]; // one string per paragraph
};

export const posts: Post[] = [
  {
    slug: "introduction",
    title: "Hello, world",
    date: "2026-07-16",
    excerpt:
      "A short introduction.",
    body: [
      "Hi, my name is Arata. I entered Berkeley as an Astrophysics student, then pivoted to Physics, then pivoted again and changed colleges to now becoming an Engineering Physics student!",
      "Right now, I'm very interested in computational methodologies as applied to science (scientific computing)."
      // "This is placeholder body text for your first post. Each entry in content/posts.ts has a body array — one string per paragraph — that renders here.",
      // "Replace this file's contents with your own writing, or wire the blog up to a CMS or MDX pipeline later if you outgrow a plain data file.",
    ],
  },
  // {
  //   slug: "notes-on-a-recent-paper",
  //   title: "Notes on a recent paper",
  //   date: "2026-03-02",
  //   excerpt:
  //     "A short placeholder for a reading note, a conference recap, or a technical write-up.",
  //   body: [
  //     "Use posts like this for reading notes, conference recaps, or short technical write-ups.",
  //     "Delete or edit freely — this is just here to show the layout with more than one entry.",
  //   ],
  // },
];
