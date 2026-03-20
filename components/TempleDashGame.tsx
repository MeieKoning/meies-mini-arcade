"use client";

import { useEffect, useRef, useState } from "react";

/* ═══════════════════ constants ═══════════════════ */

const W = 400, H = 630;
const VP_X = W / 2, VP_Y = 160, FLOOR_Y = 515;
const LANE_SPREAD = 110; // lane x spacing at z=1

// perspective helpers
const pX = (laneF: number, z: number) => VP_X + (laneF - 1) * LANE_SPREAD * z;
const pY = (z: number) => VP_Y + (FLOOR_Y - VP_Y) * z;

const JUMP_V = 17;
const GRAVITY = 1.15;
const LANE_SPD = 1 / 10; // lane transition speed (fraction per frame)
const SLIDE_DUR = 22;    // frames of slide

/* ═══════════════════ types ════════════════════ */

type Phase = "idle" | "playing" | "dead";
type ObType = "block" | "beam";
type Obstacle = { id: number; lane: number; z: number; type: ObType };
type Coin = { id: number; lane: number; z: number; taken: boolean };

interface GS {
  phase: Phase;
  lane: number;      // target lane 0/1/2
  laneFrom: number;  // lane we're animating from (can be float)
  laneT: number;     // 0→1 transition progress
  jumpH: number;     // pixels above ground
  jumpV: number;     // vertical velocity
  slideT: number;    // frames remaining in slide
  obstacles: Obstacle[];
  coins: Coin[];
  speed: number;
  score: number;
  frame: number;
  obTimer: number;
  coinTimer: number;
  uid: number;
}

const fresh = (): GS => ({
  phase: "idle",
  lane: 1, laneFrom: 1, laneT: 1,
  jumpH: 0, jumpV: 0, slideT: 0,
  obstacles: [], coins: [],
  speed: 0.006, score: 0, frame: 0,
  obTimer: 110, coinTimer: 55, uid: 0,
});

/* ═══════════════════ drawing ══════════════════ */

function drawBg(ctx: CanvasRenderingContext2D) {
  const sky = ctx.createLinearGradient(0, 0, 0, VP_Y);
  sky.addColorStop(0, "#fde68a");
  sky.addColorStop(1, "#fef9ee");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, VP_Y);

  // distant temple silhouette
  ctx.fillStyle = "rgba(217,172,100,0.22)";
  ctx.fillRect(VP_X - 11, VP_Y - 56, 22, 56);  // main tower
  ctx.fillRect(VP_X - 52, VP_Y - 38, 17, 38);  // left tower
  ctx.fillRect(VP_X + 35, VP_Y - 38, 17, 38);  // right tower
  ctx.fillRect(VP_X - 80, VP_Y - 14, 160, 14); // base plinth
}

function drawTrack(ctx: CanvasRenderingContext2D, frame: number) {
  // track surface
  const surf = ctx.createLinearGradient(0, VP_Y, 0, FLOOR_Y);
  surf.addColorStop(0, "#f3e8d8");
  surf.addColorStop(1, "#e8dac8");
  ctx.fillStyle = surf;
  ctx.beginPath();
  ctx.moveTo(VP_X - 28, VP_Y);
  ctx.lineTo(VP_X + 28, VP_Y);
  ctx.lineTo(W - 18, FLOOR_Y);
  ctx.lineTo(18, FLOOR_Y);
  ctx.closePath();
  ctx.fill();

  // below floor (track side)
  ctx.fillStyle = "#d4c4b0";
  ctx.fillRect(18, FLOOR_Y, W - 36, H - FLOOR_Y);

  // scrolling perspective grid (speed lines)
  for (let i = 0; i < 10; i++) {
    const t = ((i / 10) + frame * 0.009) % 1;
    const z = Math.max(0.06, t);
    const y = pY(z);
    const lx = pX(0, z) - 50 * z;
    const rx = pX(2, z) + 50 * z;
    ctx.strokeStyle = `rgba(180,155,130,${z * 0.32})`;
    ctx.lineWidth = z * 1.5;
    ctx.beginPath();
    ctx.moveTo(lx, y);
    ctx.lineTo(rx, y);
    ctx.stroke();
  }

  // lane dividers (dashed)
  ctx.setLineDash([8, 14]);
  ctx.strokeStyle = "#c8b49c";
  ctx.lineWidth = 1;
  for (const lf of [0.5, 1.5]) {
    ctx.beginPath();
    ctx.moveTo(VP_X, VP_Y);
    ctx.lineTo(pX(lf, 1), FLOOR_Y);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  // outer edges
  ctx.strokeStyle = "#a89480";
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(VP_X - 28, VP_Y); ctx.lineTo(18, FLOOR_Y); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(VP_X + 28, VP_Y); ctx.lineTo(W - 18, FLOOR_Y); ctx.stroke();
}

function drawBlock(ctx: CanvasRenderingContext2D, o: Obstacle) {
  const x = pX(o.lane, o.z), gy = pY(o.z), s = o.z;
  const w = 52 * s, h = 72 * s;

  // front face
  ctx.fillStyle = "#3d2b1f";
  ctx.fillRect(x - w / 2, gy - h, w, h);

  // top face
  ctx.fillStyle = "#553d2b";
  ctx.beginPath();
  ctx.moveTo(x - w / 2, gy - h);
  ctx.lineTo(x + w / 2, gy - h);
  ctx.lineTo(x + w / 2 - 4 * s, gy - h - 8 * s);
  ctx.lineTo(x - w / 2 + 4 * s, gy - h - 8 * s);
  ctx.closePath();
  ctx.fill();

  // right side
  ctx.fillStyle = "#2a1e14";
  ctx.beginPath();
  ctx.moveTo(x + w / 2, gy - h);
  ctx.lineTo(x + w / 2 - 4 * s, gy - h - 8 * s);
  ctx.lineTo(x + w / 2 + 5 * s, gy - 4 * s);
  ctx.lineTo(x + w / 2 + 1 * s, gy);
  ctx.closePath();
  ctx.fill();

  // stone groove lines
  for (let r = 1; r <= 2; r++) {
    ctx.strokeStyle = "rgba(0,0,0,0.18)";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    const ry = gy - h + h * r / 2.8;
    ctx.moveTo(x - w / 2 + 2, ry);
    ctx.lineTo(x + w / 2 - 2, ry);
    ctx.stroke();
  }
}

function drawBeam(ctx: CanvasRenderingContext2D, o: Obstacle) {
  const x = pX(o.lane, o.z), gy = pY(o.z), s = o.z;
  const bw = 88 * s, bh = 18 * s;
  const beamY = gy - 66 * s;

  // two stone pillars
  ctx.fillStyle = "#4a3420";
  for (const sx of [-1, 1]) {
    ctx.fillRect(x + sx * (bw / 2 - 9 * s), gy - 66 * s, 10 * s, 66 * s);
  }

  // horizontal crossbeam
  ctx.fillStyle = "#5c4030";
  ctx.fillRect(x - bw / 2, beamY, bw, bh);

  // top face
  ctx.fillStyle = "#7a5540";
  ctx.fillRect(x - bw / 2, beamY - 5 * s, bw, 5 * s);

  // carved line detail
  ctx.strokeStyle = "rgba(0,0,0,0.2)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x - bw / 2 + 5, beamY + bh / 2);
  ctx.lineTo(x + bw / 2 - 5, beamY + bh / 2);
  ctx.stroke();
}

function drawObstacle(ctx: CanvasRenderingContext2D, o: Obstacle) {
  if (o.type === "block") drawBlock(ctx, o);
  else drawBeam(ctx, o);
}

function drawCoin(ctx: CanvasRenderingContext2D, c: Coin, frame: number) {
  const x = pX(c.lane, c.z), gy = pY(c.z), s = c.z;
  const bob = Math.sin(frame * 0.12 + c.id * 1.3) * 3 * s;
  const cy = gy - 38 * s + bob;
  const r = 9 * s;

  // glow
  const grd = ctx.createRadialGradient(x, cy, 0, x, cy, r * 2.5);
  grd.addColorStop(0, "rgba(251,191,36,0.35)");
  grd.addColorStop(1, "rgba(251,191,36,0)");
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.arc(x, cy, r * 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#f59e0b";
  ctx.beginPath();
  ctx.arc(x, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // highlight
  ctx.fillStyle = "#fde68a";
  ctx.beginPath();
  ctx.arc(x - r * 0.3, cy - r * 0.3, r * 0.38, 0, Math.PI * 2);
  ctx.fill();
}

function drawPlayer(
  ctx: CanvasRenderingContext2D,
  laneF: number,
  jumpH: number,
  slideT: number,
  frame: number,
  phase: Phase,
) {
  const x = pX(laneF, 1.0);
  const gy = FLOOR_Y;
  const y = gy - jumpH;
  const sliding = slideT > 0;
  const dead = phase === "dead";
  const bodyColor = dead ? "#ef4444" : "#1f2937";
  const rf = Math.floor(frame / 7) % 2;

  // ground shadow
  ctx.fillStyle = "rgba(0,0,0,0.12)";
  ctx.beginPath();
  ctx.ellipse(x, gy + 2, sliding ? 22 : 15, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  if (sliding) {
    // low crouch body
    ctx.fillStyle = bodyColor;
    ctx.fillRect(x - 22, y - 18, 44, 18);
    // tucked head
    ctx.fillStyle = dead ? bodyColor : "#f5e6d3";
    ctx.beginPath();
    ctx.arc(x + 14, y - 12, 9, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  const la = jumpH > 0 ? 0.5 : rf === 0 ? 0.3 : -0.3;

  // legs
  ctx.strokeStyle = bodyColor;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x - 4, y - 12);
  ctx.lineTo(x - 8 - Math.sin(la) * 9, y + 10 + Math.cos(la) * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + 4, y - 12);
  ctx.lineTo(x + 8 + Math.sin(la) * 9, y + 10 - Math.cos(la) * 2);
  ctx.stroke();

  // body
  ctx.fillStyle = bodyColor;
  ctx.fillRect(x - 11, y - 44, 22, 32);

  // arms
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x - 11, y - 36);
  ctx.lineTo(x - 21 - Math.sin(la) * 8, y - 25 + Math.cos(la) * 5);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + 11, y - 36);
  ctx.lineTo(x + 21 + Math.sin(la) * 8, y - 25 - Math.cos(la) * 5);
  ctx.stroke();

  // head (skin tone)
  ctx.fillStyle = dead ? bodyColor : "#f5e6d3";
  ctx.beginPath();
  ctx.arc(x, y - 54, 10, 0, Math.PI * 2);
  ctx.fill();

  if (!dead) {
    // hat brim
    ctx.fillStyle = "#3d2b1f";
    ctx.beginPath();
    ctx.ellipse(x, y - 63, 14, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();
    // hat top
    ctx.fillRect(x - 9, y - 76, 18, 13);
    ctx.fillStyle = "#2a1e14";
    ctx.fillRect(x - 7, y - 76, 14, 4); // indent
  }
}

function drawHUD(ctx: CanvasRenderingContext2D, score: number) {
  ctx.font = "bold 18px Inter, sans-serif";
  ctx.textAlign = "right";
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.fillText(Math.round(score).toLocaleString(), W - 13, 31);
  ctx.fillStyle = "#1f2937";
  ctx.fillText(Math.round(score).toLocaleString(), W - 14, 30);
}

/* ═══════════════════ component ════════════════ */

export default function TempleDashGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gsRef = useRef<GS>(fresh());
  const rafRef = useRef<number>(0);
  const hsRef = useRef(0);
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // stable action refs — functions only mutate gsRef, so no stale closure issues
  const acts = useRef({
    moveLeft() {
      const g = gsRef.current;
      if (g.phase !== "playing" || g.lane === 0) return;
      g.laneFrom = g.laneFrom + (g.lane - g.laneFrom) * g.laneT;
      g.lane -= 1;
      g.laneT = 0;
    },
    moveRight() {
      const g = gsRef.current;
      if (g.phase !== "playing" || g.lane === 2) return;
      g.laneFrom = g.laneFrom + (g.lane - g.laneFrom) * g.laneT;
      g.lane += 1;
      g.laneT = 0;
    },
    jump() {
      const g = gsRef.current;
      if (g.phase !== "playing" || g.jumpH > 0) return;
      g.jumpV = JUMP_V;
    },
    slide() {
      const g = gsRef.current;
      if (g.phase !== "playing") return;
      g.slideT = SLIDE_DUR;
    },
    start() {
      const g = fresh();
      g.phase = "playing";
      gsRef.current = g;
      setPhase("playing");
      setScore(0);
    },
  });

  // main loop — runs once, uses only refs
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const stored = localStorage.getItem("temple-dash-hs");
    if (stored) {
      const v = parseInt(stored);
      hsRef.current = v;
      setHighScore(v);
    }

    function update() {
      const g = gsRef.current;
      if (g.phase !== "playing") return;

      g.frame++;
      g.speed = Math.min(0.02, 0.006 + g.frame * 0.0000045);
      g.score += g.speed * 700;

      // transitions
      g.laneT = Math.min(1, g.laneT + LANE_SPD);
      if (g.slideT > 0) g.slideT--;

      // jump physics
      if (g.jumpV > 0 || g.jumpH > 0) {
        g.jumpH = Math.max(0, g.jumpH + g.jumpV);
        g.jumpV -= GRAVITY;
        if (g.jumpH <= 0) { g.jumpH = 0; g.jumpV = 0; }
      }

      // advance objects
      for (const o of g.obstacles) o.z += g.speed;
      for (const c of g.coins) { if (!c.taken) c.z += g.speed; }

      // effective lane (float, for collision)
      const lf = g.laneFrom + (g.lane - g.laneFrom) * g.laneT;

      // collision check
      for (const o of g.obstacles) {
        if (o.z < 0.80 || o.z > 1.01) continue;
        if (Math.abs(lf - o.lane) >= 0.62) continue; // different lane

        if (o.type === "block" && g.jumpH >= 30) continue; // jumped over
        if (o.type === "beam"  && g.slideT > 0)  continue; // slid under

        // hit!
        g.phase = "dead";
        const final = Math.round(g.score);
        setPhase("dead");
        setScore(final);
        if (final > hsRef.current) {
          hsRef.current = final;
          setHighScore(final);
          localStorage.setItem("temple-dash-hs", String(final));
        }
        return;
      }

      // collect coins
      for (const c of g.coins) {
        if (c.taken || c.z < 0.79 || c.z > 0.98) continue;
        if (Math.abs(lf - c.lane) < 0.62) {
          c.taken = true;
          g.score += 50;
        }
      }

      // cleanup
      g.obstacles = g.obstacles.filter(o => o.z < 1.2);
      g.coins     = g.coins.filter(c => c.z < 1.2);

      // spawn obstacles
      g.obTimer--;
      if (g.obTimer <= 0) {
        const lane = Math.floor(Math.random() * 3);
        const type: ObType = g.frame > 200 && Math.random() < 0.28 ? "beam" : "block";
        g.obstacles.push({ id: g.uid++, lane, z: 0.04, type });

        // occasional double block (after warmup)
        if (type === "block" && g.frame > 400 && Math.random() < 0.28) {
          const other = lane === 1 ? (Math.random() < 0.5 ? 0 : 2) : 1;
          g.obstacles.push({ id: g.uid++, lane: other, z: 0.04, type: "block" });
        }

        g.obTimer = Math.max(40, 100 - g.frame * 0.022) + Math.random() * 20;
      }

      // spawn coins (row of 3)
      g.coinTimer--;
      if (g.coinTimer <= 0) {
        const lane = Math.floor(Math.random() * 3);
        for (let i = 0; i < 3; i++) {
          g.coins.push({ id: g.uid++, lane, z: 0.04 - i * 0.055, taken: false });
        }
        g.coinTimer = 50 + Math.random() * 35;
      }
    }

    function render() {
      const g = gsRef.current;
      ctx.clearRect(0, 0, W, H);

      drawBg(ctx);
      drawTrack(ctx, g.frame);

      // draw coins first (behind obstacles and player)
      const visCoins = g.coins.filter(c => !c.taken).sort((a, b) => a.z - b.z);
      for (const c of visCoins) drawCoin(ctx, c, g.frame);

      // obstacles back→front
      const visObs = [...g.obstacles].sort((a, b) => a.z - b.z);
      for (const o of visObs) drawObstacle(ctx, o);

      const lf = g.laneFrom + (g.lane - g.laneFrom) * g.laneT;
      drawPlayer(ctx, lf, g.jumpH, g.slideT, g.frame, g.phase);

      if (g.phase !== "idle") drawHUD(ctx, g.score);
    }

    function loop() {
      update();
      render();
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // sync score display ~10× per second
  useEffect(() => {
    const iv = setInterval(() => {
      if (gsRef.current.phase === "playing") {
        setScore(Math.round(gsRef.current.score));
      }
    }, 100);
    return () => clearInterval(iv);
  }, []);

  // keyboard
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft"  || e.key === "a" || e.key === "A") acts.current.moveLeft();
      else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") acts.current.moveRight();
      else if (e.key === "ArrowUp" || e.key === " " || e.key === "w" || e.key === "W") {
        e.preventDefault();
        acts.current.jump();
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        acts.current.slide();
      } else if (e.key === "Enter" && gsRef.current.phase !== "playing") {
        acts.current.start();
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  // touch
  const onTouchStart = (e: React.TouchEvent) => {
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const ts = touchRef.current;
    if (!ts) return;
    const dx = e.changedTouches[0].clientX - ts.x;
    const dy = e.changedTouches[0].clientY - ts.y;
    touchRef.current = null;

    if (gsRef.current.phase !== "playing") { acts.current.start(); return; }

    if (Math.abs(dy) > Math.abs(dx)) {
      if (dy < -20) acts.current.jump();
      else if (dy > 20) acts.current.slide();
    } else {
      if (dx < -20) acts.current.moveLeft();
      else if (dx > 20) acts.current.moveRight();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xs text-gray-400 uppercase tracking-widest hidden sm:block">
        ← → to dodge · Space to jump · ↓ to slide
      </p>

      <div className="relative select-none" style={{ width: W, maxWidth: "100%" }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            borderRadius: 20,
            border: "1px solid #e5e7eb",
            touchAction: "none",
          }}
        />

        {phase === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[20px] bg-white/88 backdrop-blur-sm">
            <p className="font-display text-5xl text-gray-900 mb-1">Temple Dash</p>
            <p className="text-gray-500 text-sm mb-6">Run. Dodge. Don&apos;t die.</p>
            {highScore > 0 && (
              <p className="text-gray-400 text-xs mb-5">
                Best: {highScore.toLocaleString()}
              </p>
            )}
            <button
              onClick={acts.current.start}
              className="px-7 py-3 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors cursor-pointer"
            >
              Start →
            </button>
          </div>
        )}

        {phase === "dead" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[20px] bg-white/88 backdrop-blur-sm">
            <p className="font-display text-3xl text-gray-500 mb-1">Game Over</p>
            <p className="font-display text-6xl text-gray-900 mb-2">
              {score.toLocaleString()}
            </p>
            {score > 0 && score >= highScore ? (
              <p className="text-amber-500 text-xs font-semibold mb-5">🏆 New high score!</p>
            ) : (
              <p className="text-gray-400 text-xs mb-5">
                Best: {highScore.toLocaleString()}
              </p>
            )}
            <button
              onClick={acts.current.start}
              className="px-7 py-3 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors cursor-pointer"
            >
              Run again →
            </button>
          </div>
        )}
      </div>

      {/* mobile d-pad */}
      <div className="flex items-center gap-3 sm:hidden">
        <button
          onTouchStart={(e) => { e.preventDefault(); acts.current.moveLeft(); }}
          className="w-14 h-14 rounded-2xl border border-gray-200 bg-white text-xl flex items-center justify-center active:bg-gray-100"
        >←</button>
        <div className="flex flex-col gap-2">
          <button
            onTouchStart={(e) => { e.preventDefault(); acts.current.jump(); }}
            className="w-14 h-14 rounded-2xl border border-gray-200 bg-white text-xl flex items-center justify-center active:bg-gray-100"
          >↑</button>
          <button
            onTouchStart={(e) => { e.preventDefault(); acts.current.slide(); }}
            className="w-14 h-14 rounded-2xl border border-gray-200 bg-white text-xl flex items-center justify-center active:bg-gray-100"
          >↓</button>
        </div>
        <button
          onTouchStart={(e) => { e.preventDefault(); acts.current.moveRight(); }}
          className="w-14 h-14 rounded-2xl border border-gray-200 bg-white text-xl flex items-center justify-center active:bg-gray-100"
        >→</button>
      </div>
    </div>
  );
}
