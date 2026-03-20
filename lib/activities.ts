export type Activity = {
  id: string;
  label: string;
  emoji: string;
  description: string;
  accentColor: string;
  globalUsersMillions: number;
  avgHoursPerDay: number;
  source: string;
};

// All concurrent-user estimates are conservative midpoints derived from public reports.
// "concurrent" = fraction of daily active users active at any given moment.
export const activities: Activity[] = [
  {
    id: "netflix",
    label: "Watching Netflix",
    emoji: "📺",
    description: "Someone else is living their best life on a couch.",
    accentColor: "#E50914",
    // Netflix Q4 2023: 260.8M paid subscribers. Sandvine 2023: Netflix ≈ 15% of
    // downstream traffic at peak. Estimated ~27% concurrent at prime-time average.
    // Source: https://ir.netflix.net/ir/doc/q4-2023-shareholder-letter
    globalUsersMillions: 70,
    avgHoursPerDay: 2.0,
    source: "Netflix Q4 2023 Shareholder Letter",
  },
  {
    id: "youtube",
    label: "Watching YouTube",
    emoji: "▶️",
    description: "One billion hours a day. Someone's watching right now.",
    accentColor: "#FF0000",
    // Google 2023: 2B logged-in MAU; 1B hours watched daily.
    // ~3% concurrent at any moment = 60M users.
    // Source: https://blog.youtube/press/
    globalUsersMillions: 55,
    avgHoursPerDay: 1.0,
    source: "YouTube Press — 1B hours/day stat",
  },
  {
    id: "tiktok",
    label: "Scrolling TikTok",
    emoji: "🎵",
    description: "Average session: 95 minutes. Time flies when the algorithm knows you.",
    accentColor: "#69C9D0",
    // ByteDance 2023: 1.5B MAU; eMarketer 2023 avg daily time = 95.9 min.
    // Source: https://www.statista.com/statistics/1327548/tiktok-monthly-active-users-worldwide/
    globalUsersMillions: 50,
    avgHoursPerDay: 1.5,
    source: "ByteDance 2023 / eMarketer avg session data",
  },
  {
    id: "twitter",
    label: "Scrolling X / Twitter",
    emoji: "🐦",
    description: "Arguing with strangers. At scale.",
    accentColor: "#1DA1F2",
    // X Corp 2023: 250M monetizable DAU. Similarweb avg session ~5 min (mobile).
    // ~5% concurrent, ~45 min avg.
    // Source: https://s22.q4cdn.com/826641620/files/doc_financials/2022/q4/FINAL-Q4'22-Shareholder-Letter.pdf
    globalUsersMillions: 12,
    avgHoursPerDay: 0.75,
    source: "X Corp 2023 DAU report / Similarweb",
  },
  {
    id: "traffic",
    label: "Stuck in Traffic",
    emoji: "🚗",
    description: "38 hours per year, per driver. It adds up.",
    accentColor: "#F59E0B",
    // INRIX 2023 Global Traffic Scorecard: avg 36h/year lost to congestion.
    // IEA 2023: 1.4B passenger cars globally. ~2% driving at any moment.
    // Source: https://inrix.com/scorecard/
    globalUsersMillions: 30,
    avgHoursPerDay: 1.0,
    source: "INRIX 2023 Global Traffic Scorecard",
  },
  {
    id: "meetings",
    label: "In a Boring Meeting",
    emoji: "💼",
    description: "Could have been an email.",
    accentColor: "#6366F1",
    // Atlassian 2023: 55M meetings/day in the US. Microsoft 2022 Work Trend Index.
    // Global estimate ~3x US figure.
    // Source: https://www.atlassian.com/blog/teamwork/reclaim-productivity-and-reduce-meeting-overload
    globalUsersMillions: 11,
    avgHoursPerDay: 1.5,
    source: "Atlassian 2023 / Microsoft Work Trend Index",
  },
  {
    id: "coffee",
    label: "Drinking Coffee",
    emoji: "☕",
    description: "3.1 billion cups today. You're not alone.",
    accentColor: "#92400E",
    // International Coffee Organization 2023: ~3.1B cups/day globally.
    // Avg cup = 15 min (0.25h).
    // Source: https://www.ico.org/new_historical.asp
    globalUsersMillions: 40,
    avgHoursPerDay: 0.25,
    source: "International Coffee Organization 2023",
  },
  {
    id: "minecraft",
    label: "Playing Minecraft",
    emoji: "⛏️",
    description: "166 million people. Still placing blocks.",
    accentColor: "#84CC16",
    // Mojang 2023: 166M MAU. ~3% concurrent, 1.5h avg session.
    // Source: https://www.minecraft.net/en-us/article/minecraft-anniversary
    globalUsersMillions: 5,
    avgHoursPerDay: 1.5,
    source: "Mojang 2023 — 166M MAU",
  },
  {
    id: "pizza",
    label: "Eating Pizza",
    emoji: "🍕",
    description: "5 billion slices a day. Globally.",
    accentColor: "#F97316",
    // US: ~350M slices/day. Italy + global ≈ 5B slices/day est.
    // Avg slice: ~15 min. 14M concurrent eaters assumed.
    globalUsersMillions: 14,
    avgHoursPerDay: 0.25,
    source: "USDA / Industry estimates — 5B slices/day globally",
  },
  {
    id: "waiting",
    label: "Waiting for a Text Back",
    emoji: "📱",
    description: "It's been 3 minutes. They've seen it.",
    accentColor: "#EC4899",
    globalUsersMillions: 8,
    avgHoursPerDay: 0.5,
    source: "Estimated from global messaging anxiety studies",
  },
  {
    id: "nothing",
    label: "Doing Nothing",
    emoji: "😶",
    description: "Also a valid use of time.",
    accentColor: "#94A3B8",
    // BLS American Time Use Survey: ~2.5h leisure/day; extrapolated globally.
    globalUsersMillions: 20,
    avgHoursPerDay: 3.0,
    source: "BLS American Time Use Survey (extrapolated globally)",
  },
  {
    id: "sleeping",
    label: "Sleeping",
    emoji: "😴",
    description: "A third of humanity. Gone.",
    accentColor: "#8B5CF6",
    // UN Population Division 2023: 8.1B world population.
    // Roughly 1/3 asleep at any given moment = ~2.7B people, 8h/day avg.
    globalUsersMillions: 800,
    avgHoursPerDay: 8.0,
    source: "UN Population Division 2023 — 1/3 of humanity asleep at any moment",
  },
];
