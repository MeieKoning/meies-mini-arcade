import type { Metadata } from "next";
import Nav from "@/components/Nav";
import HowLongGame from "@/components/HowLongGame";

export const metadata: Metadata = {
  title: "How Long Will You Live... Doing This? | Meie's Mini Arcade",
  description:
    "Pick an activity. A live counter shows how many collective human-hours are being spent on it right now, globally.",
};

export default function HowLongPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12">
        <HowLongGame />
      </main>
    </>
  );
}
