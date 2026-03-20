"use client";

import { useState, useEffect, useRef } from "react";
import { activities, type Activity } from "@/lib/activities";
import {
  hoursNow,
  hoursPerSecond,
  lifetimesPerMinute,
  formatHours,
} from "@/lib/counter";

export default function HowLongGame() {
  const [selected, setSelected] = useState<Activity | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [ticking, setTicking] = useState(false);
  const tickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!selected) return;
    setElapsed(0);

    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
      setTicking(true);
      if (tickTimeout.current) clearTimeout(tickTimeout.current);
      tickTimeout.current = setTimeout(() => setTicking(false), 300);
    }, 1000);

    return () => {
      clearInterval(interval);
      if (tickTimeout.current) clearTimeout(tickTimeout.current);
    };
  }, [selected]);

  function handleSelect(activity: Activity) {
    setSelected(activity);
  }

  function handleBack() {
    setSelected(null);
    setElapsed(0);
  }

  if (!selected) {
    return (
      <div>
        <div className="mb-8 animate-fade-in-up">
          <h1 className="font-display text-4xl sm:text-5xl text-gray-900 leading-tight">
            How Long Will You Live...
          </h1>
          <h2 className="font-display text-4xl sm:text-5xl text-gray-400 leading-tight">
            Doing This?
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-xl">
            Pick an activity. A live counter shows how many collective
            human-hours are being spent on it right now, globally.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 animate-fade-in-up-delay-1">
          {activities.map((activity) => (
            <button
              key={activity.id}
              onClick={() => handleSelect(activity)}
              className="group border border-gray-200 rounded-2xl p-4 bg-white text-left transition-all duration-200 hover:border-gray-400 hover:-translate-y-1 hover:shadow-md cursor-pointer"
            >
              <span className="text-3xl mb-2 block">{activity.emoji}</span>
              <p className="text-sm font-semibold text-gray-900 leading-snug">
                {activity.label}
              </p>
              <p className="text-xs text-gray-400 mt-1 leading-snug">
                {activity.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const baseHours = hoursNow(selected);
  const rate = hoursPerSecond(selected);
  const lifetimes = lifetimesPerMinute(selected);
  const currentHours = baseHours + rate * elapsed;
  const shareText = `Right now, ${formatHours(currentHours)} human-hours are being spent ${selected.label.toLowerCase()}. That's ${lifetimes.toFixed(1)} human lifetimes per minute. 🕰️\n\nMeie's Mini Arcade`;

  return (
    <div className="animate-fade-in-up">
      <button
        onClick={handleBack}
        className="mb-8 text-sm text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
      >
        ← Back
      </button>

      <div className="mb-6">
        <span className="text-6xl">{selected.emoji}</span>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl text-gray-900">
          {selected.label}
        </h1>
        <p className="text-gray-500 mt-1">{selected.description}</p>
      </div>

      <div className="border border-gray-200 rounded-3xl p-8 bg-white mb-6">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-medium">
          Human-hours being spent right now
        </p>
        <div
          className={`font-display text-5xl sm:text-7xl tabular-nums ${ticking ? "counter-tick" : ""}`}
          style={{ color: selected.accentColor }}
        >
          {formatHours(currentHours)}
        </div>
        <p className="text-gray-400 text-sm mt-3">
          hours of human life, globally, at this moment
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in-up-delay-1">
        <div className="border border-gray-100 rounded-2xl p-6 bg-white">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
            Every second
          </p>
          <p className="font-display text-3xl text-gray-900">
            {formatHours(rate)}
          </p>
          <p className="text-sm text-gray-500 mt-1">more human-hours tick by</p>
        </div>

        <div className="border border-gray-100 rounded-2xl p-6 bg-white">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
            Per minute
          </p>
          <p className="font-display text-3xl text-gray-900">
            {lifetimes.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            human lifetimes (80yr) consumed
          </p>
        </div>

        <div className="border border-gray-100 rounded-2xl p-6 bg-white">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
            Right now
          </p>
          <p className="font-display text-3xl text-gray-900">
            {(selected.globalUsersMillions * 1_000_000).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">people doing this globally</p>
        </div>
      </div>

      <div className="mt-6 flex gap-3 animate-fade-in-up-delay-2">
        <button
          onClick={() => navigator.clipboard?.writeText(shareText)}
          className="px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Copy to share
        </button>
        <button
          onClick={handleBack}
          className="px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Try another
        </button>
      </div>
    </div>
  );
}
