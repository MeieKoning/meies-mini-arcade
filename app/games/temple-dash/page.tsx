import type { Metadata } from "next";
import Nav from "@/components/Nav";
import TempleDashGame from "@/components/TempleDashGame";

export const metadata: Metadata = {
  title: "Temple Dash | Meie's Mini Arcade",
  description: "An endless runner through ancient ruins. Dodge stone blocks, slide under beams, collect gold.",
};

export default function TempleDashPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-10">
        <TempleDashGame />
      </main>
    </>
  );
}
