export type Course = {
  code: string;          // e.g. "PHYS 105"
  title: string;         // e.g. "Analytic Mechanics"
  term: string;          // e.g. "Fall 2024"
  instructor: string;    // e.g. "Prof. Robert Littlejohn"
  difficulty: number;    // 1 to 5 scale
  workload: number;      // 1 to 5 scale
  interest: number;      // 1 to 5 scale (Fun / Interesting)
  usefulness: number;    // 1 to 5 scale
  comments: string;      // Brief personal review / reflections
  tags?: string[];       // e.g. ["Physics", "Mechanics"]
};

export const courses: Course[] = [
  {
    code: "PHYS 105",
    title: "Analytic Mechanics",
    term: "Spring 2024",
    instructor: "Prof. Edgar Knobloch",
    difficulty: 5,
    workload: 5,
    interest: 5,
    usefulness: 5,
    comments:
      "Lagrangian and Hamiltonian mechanics, variational calculus, central force motion, and rigid body dynamics. Extremely rewarding course with deep physical intuition and elegant mathematical formulation.",
    tags: ["Physics", "Classical Mechanics"],
  },
  {
    code: "PHYS 137A",
    title: "Quantum Mechanics",
    term: "Fall 2024",
    instructor: "Prof. Chien-I Chiang",
    difficulty: 3,
    workload: 4,
    interest: 3,
    usefulness: 3,
    comments:
      "Postulates of quantum mechanics, wave mechanics, harmonic oscillator, hydrogen atom, and angular momentum. Challenging conceptual shifts, but very fun once operator formalisms click.",
    tags: ["Physics", "Quantum"],
  },
  {
    code: "MATH 53",
    title: "Multivariable Calculus",
    term: "Fall 2023",
    instructor: "Prof. Maciej Zworski",
    difficulty: 3,
    workload: 2,
    interest: 3,
    usefulness: 4,
    comments:
      "Parametric equations, vector fields, line integrals, Green's theorem, divergence theorem, and Stokes' theorem. Essential mathematical foundations for classical electrodynamics and continuum mechanics.",
    tags: ["Math", "Calculus"],
  },
  {
    code: "CS 61A",
    title: "Structure and Interpretation of Computer Programs",
    term: "Spring 2024",
    instructor: "Prof. John DeNero",
    difficulty: 3,
    workload: 4,
    interest: 4,
    usefulness: 4,
    comments:
      "Functional programming, recursion, OOP, interpreters, and scheme. Phenomenal introduction to computing principles and algorithmic thinking.",
    tags: ["Computer Science", "Programming"],
  },
];
