"use client";

import { useState } from "react";
import { pairings, type FitPairing } from "@/lib/fit-data";

// ─── helpers ───────────────────────────────────────────────────────────────

function formatNumber(n: number): string {
  const s = (v: number) =>
    v >= 100 ? String(Math.round(v)) : String(+(v.toFixed(1)));
  if (n >= 1e24) return `${s(n / 1e24)} septillion`;
  if (n >= 1e21) return `${s(n / 1e21)} sextillion`;
  if (n >= 1e18) return `${s(n / 1e18)} quintillion`;
  if (n >= 1e15) return `${s(n / 1e15)} quadrillion`;
  if (n >= 1e12) return `${s(n / 1e12)} trillion`;
  if (n >= 1e9) return `${s(n / 1e9)} billion`;
  if (n >= 1e6) return `${s(n / 1e6)} million`;
  return Math.round(n).toLocaleString();
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateOptions(correct: number): number[] {
  const multipliers =
    correct >= 100 ? [0.1, 0.33, 3, 10] : correct >= 10 ? [0.25, 0.5, 2, 5] : [2, 4, 8, 20];

  const candidates = multipliers
    .map((m) => Math.max(1, Math.round(correct * m)))
    .filter((n) => {
      // ensure it formats differently from the correct answer
      return formatNumber(n) !== formatNumber(correct);
    });

  const unique = [...new Set(candidates)].slice(0, 3);
  return shuffle([correct, ...unique]);
}

const QUESTIONS_PER_GAME = 10;

// ─── component ────────────────────────────────────────────────────────────

type Phase = "idle" | "playing" | "revealed" | "done";

export default function HowManyFitGame() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [questions, setQuestions] = useState<FitPairing[]>([]);
  const [options, setOptions] = useState<number[][]>([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  function startGame() {
    const q = shuffle(pairings).slice(0, QUESTIONS_PER_GAME);
    setQuestions(q);
    setOptions(q.map((p) => generateOptions(p.count)));
    setIndex(0);
    setPicked(null);
    setScore(0);
    setAnswers([]);
    setPhase("playing");
  }

  function handlePick(n: number) {
    if (phase !== "playing") return;
    const correct = questions[index].count;
    const isRight = n === correct;
    setPicked(n);
    setScore((s) => s + (isRight ? 1 : 0));
    setAnswers((a) => [...a, isRight]);
    setPhase("revealed");
  }

  function handleNext() {
    if (index + 1 >= QUESTIONS_PER_GAME) {
      setPhase("done");
    } else {
      setIndex((i) => i + 1);
      setPicked(null);
      setPhase("playing");
    }
  }

  // ── idle / intro ─────────────────────────────────────────────────────────

  if (phase === "idle") {
    return (
      <div className="animate-fade-in-up">
        <div className="mb-8">
          <h1 className="font-display text-4xl sm:text-5xl text-gray-900 leading-tight">
            How Many Fit?
          </h1>
          <p className="mt-4 text-gray-500 text-lg max-w-xl">
            How many tennis balls fit in a Boeing 747? How many Earths fit in
            the Sun? Guess the right order of magnitude — 10 questions, no
            calculators.
          </p>
        </div>

        {/* teaser cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10 animate-fade-in-up-delay-1">
          {[
            { a: "🎾", b: "✈️", label: "Tennis balls in a 747" },
            { a: "🌍", b: "☀️", label: "Earths in the Sun" },
            { a: "🍕", b: "🧊", label: "Pizza boxes in a fridge" },
            { a: "🐋", b: "🚢", label: "Blue whales in the Titanic" },
            { a: "🏀", b: "📦", label: "Basketballs in a container" },
            { a: "🪙", b: "🛁", label: "Pennies in a bathtub" },
          ].map((t) => (
            <div
              key={t.label}
              className="border border-gray-100 rounded-2xl p-4 bg-white text-center"
            >
              <p className="text-2xl mb-1">
                {t.a} → {t.b}
              </p>
              <p className="text-xs text-gray-400 leading-snug">{t.label}</p>
            </div>
          ))}
        </div>

        <button
          onClick={startGame}
          className="px-8 py-3 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors cursor-pointer animate-fade-in-up-delay-2"
        >
          Start Quiz →
        </button>
      </div>
    );
  }

  // ── done / results ────────────────────────────────────────────────────────

  if (phase === "done") {
    const pct = score / QUESTIONS_PER_GAME;
    const message =
      score === QUESTIONS_PER_GAME
        ? "Perfect score! You have the spatial reasoning of a NASA engineer."
        : pct >= 0.7
        ? "Sharp intuition. Most people have no idea."
        : pct >= 0.4
        ? "Not bad — you're within the right order of magnitude, at least."
        : "The universe is bigger (and smaller) than it looks.";

    const shareText = `I scored ${score}/${QUESTIONS_PER_GAME} on How Many Fit? 📦\n${message}\n\nMeie's Mini Arcade`;

    return (
      <div className="animate-fade-in-up max-w-lg">
        <p className="text-sm text-gray-400 uppercase tracking-widest mb-4 font-medium">
          Results
        </p>
        <p className="font-display text-7xl text-gray-900 mb-2">
          {score}
          <span className="text-gray-300">/{QUESTIONS_PER_GAME}</span>
        </p>
        <p className="text-gray-600 text-lg mb-8">{message}</p>

        {/* per-question breakdown */}
        <div className="space-y-2 mb-8">
          {questions.map((q, i) => (
            <div key={q.id} className="flex items-center gap-3 text-sm">
              <span className="text-base">{answers[i] ? "✅" : "❌"}</span>
              <span className="text-gray-500">
                {q.object.emoji} in {q.container.emoji}
              </span>
              <span className="text-gray-400 ml-auto">
                {formatNumber(q.count)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigator.clipboard?.writeText(shareText)}
            className="px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Copy score
          </button>
          <button
            onClick={startGame}
            className="px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer"
          >
            Play again →
          </button>
        </div>
      </div>
    );
  }

  // ── playing / revealed ────────────────────────────────────────────────────

  const q = questions[index];
  const correct = q.count;
  const opts = options[index];
  const isCorrect = picked === correct;
  const isLast = index + 1 >= QUESTIONS_PER_GAME;

  return (
    <div className="max-w-xl animate-fade-in-up">
      {/* progress bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1">
          {Array.from({ length: QUESTIONS_PER_GAME }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-6 rounded-full transition-colors ${
                i < index
                  ? answers[i]
                    ? "bg-green-400"
                    : "bg-red-300"
                  : i === index
                  ? "bg-gray-900"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-gray-400 font-medium">
          {index + 1} / {QUESTIONS_PER_GAME}
        </span>
      </div>

      {/* question */}
      <div className="border border-gray-200 rounded-3xl p-8 bg-white mb-6">
        <div className="text-4xl mb-4 flex gap-3 items-center">
          <span>{q.object.emoji}</span>
          <span className="text-gray-300 text-2xl">→</span>
          <span>{q.container.emoji}</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 leading-snug">
          How many{" "}
          <span className="text-gray-600">{q.object.label}s</span> fit inside{" "}
          <span className="text-gray-600">{q.container.label}</span>?
        </h2>
      </div>

      {/* options */}
      <div className="grid grid-cols-1 gap-2 mb-6">
        {opts.map((n) => {
          let style =
            "border border-gray-200 bg-white text-gray-900 hover:border-gray-400 hover:bg-gray-50";

          if (phase === "revealed") {
            if (n === correct) {
              style = "border-2 border-green-500 bg-green-50 text-green-800";
            } else if (n === picked) {
              style = "border-2 border-red-400 bg-red-50 text-red-700";
            } else {
              style = "border border-gray-100 bg-gray-50 text-gray-400";
            }
          }

          return (
            <button
              key={n}
              onClick={() => handlePick(n)}
              disabled={phase === "revealed"}
              className={`w-full text-left px-6 py-4 rounded-2xl text-sm font-semibold transition-all ${style} ${
                phase === "playing" ? "cursor-pointer" : "cursor-default"
              }`}
            >
              {formatNumber(n)}
            </button>
          );
        })}
      </div>

      {/* reveal panel */}
      {phase === "revealed" && (
        <div className="border border-gray-100 rounded-2xl p-6 bg-white mb-6 animate-fade-in-up">
          <p
            className={`text-sm font-semibold mb-3 ${isCorrect ? "text-green-600" : "text-red-500"}`}
          >
            {isCorrect ? "✅ Correct!" : `❌ The answer is ${formatNumber(correct)}`}
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">{q.explanation}</p>
          {q.funFact && (
            <p className="text-gray-400 text-sm mt-2 italic">{q.funFact}</p>
          )}
        </div>
      )}

      {/* next button */}
      {phase === "revealed" && (
        <button
          onClick={handleNext}
          className="px-6 py-3 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors cursor-pointer animate-fade-in-up"
        >
          {isLast ? "See results →" : "Next question →"}
        </button>
      )}
    </div>
  );
}
