import Link from "next/link";

export default function Nav() {
  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl tracking-wide text-gray-900 hover:text-gray-600 transition-colors"
        >
          Meie&apos;s Mini Arcade
        </Link>
        <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">
          Mini Games
        </span>
      </div>
    </nav>
  );
}
