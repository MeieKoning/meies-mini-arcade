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
];
