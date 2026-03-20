import Nav from "@/components/Nav";
import GameCard from "@/components/GameCard";
import { games } from "@/lib/games";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12">
        <div className="mb-10 animate-fade-in-up">
          <h1 className="font-display text-5xl sm:text-6xl text-gray-900 mb-2">
            Pick a game.
          </h1>
          <p className="text-gray-500 text-lg">
            Mildly existential. Very shareable.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in-up-delay-1">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </main>
    </>
  );
}
