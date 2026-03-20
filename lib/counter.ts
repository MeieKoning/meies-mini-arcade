import type { Activity } from "./activities";

/** Total human-hours being spent on this activity right now, globally. */
export function hoursNow(activity: Activity): number {
  const concurrentUsers = activity.globalUsersMillions * 1_000_000;
  const fractionOfDay = activity.avgHoursPerDay / 24;
  return concurrentUsers * fractionOfDay;
}

/** How many additional human-hours accumulate every real second. */
export function hoursPerSecond(activity: Activity): number {
  const concurrentUsers = activity.globalUsersMillions * 1_000_000;
  return concurrentUsers / 3600;
}

/** Human lifetimes (80yr) consumed per minute at the current rate. */
export function lifetimesPerMinute(activity: Activity): number {
  const hoursPerMin = hoursPerSecond(activity) * 60;
  const hoursPerLifetime = 80 * 365.25 * 24;
  return hoursPerMin / hoursPerLifetime;
}

/** Format a large number with commas, no decimals. */
export function formatHours(n: number): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);
}
