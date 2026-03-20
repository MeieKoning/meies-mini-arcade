export type Game = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  emoji: string;
  status: "live" | "coming-soon";
};

export const games: Game[] = [
  {
    id: "how-long",
    slug: "how-long",
    title: "How Long Will You Live... Doing This?",
    tagline: "Pick an activity. Watch humanity's time evaporate.",
    emoji: "⏳",
    status: "live",
  },
  {
    id: "how-many-fit",
    slug: "how-many-fit",
    title: "How Many Fit?",
    tagline: "Tennis balls in a 747. Earths in the Sun. Guess the number.",
    emoji: "📦",
    status: "live",
  },
  {
    id: "temple-dash",
    slug: "temple-dash",
    title: "Temple Dash",
    tagline: "Run through ancient ruins. Dodge, jump, slide. Don't die.",
    emoji: "🏛️",
    status: "live",
  },
];
