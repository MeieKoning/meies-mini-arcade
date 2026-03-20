import Link from "next/link";
import type { Game } from "@/lib/games";

export default function GameCard({ game }: { game: Game }) {
  const isLive = game.status === "live";

  const card = (
    <div
      className={`group border border-gray-200 rounded-2xl p-6 bg-white transition-all duration-200 ${
        isLive
          ? "hover:border-gray-400 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
          : "opacity-60 cursor-not-allowed"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl">{game.emoji}</span>
        {!isLive && (
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
            Soon
          </span>
        )}
      </div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1 leading-snug">
        {game.title}
      </h2>
      <p className="text-sm text-gray-500">{game.tagline}</p>
    </div>
  );

  if (!isLive) return card;

  return <Link href={`/games/${game.slug}`}>{card}</Link>;
}
