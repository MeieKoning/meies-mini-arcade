import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meie's Mini Arcade",
  description: "A collection of fun, slightly existential mini games.",
  openGraph: {
    title: "Meie's Mini Arcade",
    description: "A collection of fun, slightly existential mini games.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
