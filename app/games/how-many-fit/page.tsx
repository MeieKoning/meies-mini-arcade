import type { Metadata } from "next";
import Nav from "@/components/Nav";
import HowManyFitGame from "@/components/HowManyFitGame";

export const metadata: Metadata = {
  title: "How Many Fit? | Meie's Mini Arcade",
  description:
    "How many tennis balls fit in a Boeing 747? How many Earths in the Sun? Guess the number — 10 questions.",
};

export default function HowManyFitPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12">
        <HowManyFitGame />
      </main>
    </>
  );
}
