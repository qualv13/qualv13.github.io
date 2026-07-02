import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "../data/content";

/**
 * Playable Breach Protocol minigame (the CP2077 hacking puzzle).
 *
 * Rules: pick bytes from the code matrix — first from the top row, then
 * alternating column/row of your last pick. Fill daemon sequences inside
 * the buffer before it fills up or time runs out. Puzzles are generated
 * around a guaranteed-solvable path.
 */

const BYTES = ["1C", "55", "BD", "E9", "7A", "FF"] as const;
const GRID_SIZE = 5;
const PATH_LENGTH = 6;
const BUFFER_SIZE = 7;
const TIME_LIMIT_S = 60;

const CV_URL = `${import.meta.env.BASE_URL}${profile.cvFile}`;

type Reward = "cv" | "contact" | "cred";
type Daemon = { name: string; seq: string[]; reward: Reward; done: boolean };
type Phase = "idle" | "running" | "over";

type Puzzle = { grid: string[]; daemons: Daemon[] };

const randomByte = () => BYTES[Math.floor(Math.random() * BYTES.length)];

/** Random grid with a valid alternating row/col path; daemons are slices of it. */
function generatePuzzle(): Puzzle {
  const grid = Array.from({ length: GRID_SIZE * GRID_SIZE }, randomByte);

  const used = new Set<number>();
  const path: number[] = [];
  let row = 0;
  let col = 0;
  let axis: "row" | "col" = "row";

  for (let step = 0; step < PATH_LENGTH; step++) {
    const candidates: number[] = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      const cell = axis === "row" ? row * GRID_SIZE + i : i * GRID_SIZE + col;
      if (!used.has(cell)) candidates.push(cell);
    }
    const cell = candidates[Math.floor(Math.random() * candidates.length)];
    used.add(cell);
    path.push(cell);
    row = Math.floor(cell / GRID_SIZE);
    col = cell % GRID_SIZE;
    axis = axis === "row" ? "col" : "row";
  }

  const bytes = path.map((cell) => grid[cell]);
  const daemons: Daemon[] = [
    { name: "DATAMINE_CV", seq: bytes.slice(0, 2), reward: "cv", done: false },
    { name: "ICEPICK_CONTACT", seq: bytes.slice(2, 5), reward: "contact", done: false },
    { name: "NETRUNNER_KEY", seq: bytes.slice(4, 6), reward: "cred", done: false },
  ];
  return { grid, daemons };
}

/** Is `seq` a contiguous run inside `buffer`? */
function matches(buffer: string[], seq: string[]): boolean {
  outer: for (let start = 0; start + seq.length <= buffer.length; start++) {
    for (let i = 0; i < seq.length; i++) {
      if (buffer[start + i] !== seq[i]) continue outer;
    }
    return true;
  }
  return false;
}

export default function BreachProtocol(props: { open: boolean; onClose: () => void }) {
  const [puzzle, setPuzzle] = useState<Puzzle>(generatePuzzle);
  const [used, setUsed] = useState<Set<number>>(new Set());
  const [buffer, setBuffer] = useState<string[]>([]);
  const [axis, setAxis] = useState<"row" | "col">("row");
  const [activeRow, setActiveRow] = useState(0);
  const [activeCol, setActiveCol] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT_S);

  const reset = () => {
    setPuzzle(generatePuzzle());
    setUsed(new Set());
    setBuffer([]);
    setAxis("row");
    setActiveRow(0);
    setActiveCol(0);
    setPhase("idle");
    setTimeLeft(TIME_LIMIT_S);
  };

  // Deal a fresh puzzle each time the modal is opened.
  useEffect(() => {
    if (props.open) reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  // Countdown while running.
  useEffect(() => {
    if (phase !== "running") return;
    const interval = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 0.1) {
          setPhase("over");
          return 0;
        }
        return t - 0.1;
      });
    }, 100);
    return () => window.clearInterval(interval);
  }, [phase]);

  // Esc closes.
  useEffect(() => {
    if (!props.open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") props.onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [props.open, props.onClose]);

  const selectable = (cell: number): boolean => {
    if (phase === "over" || used.has(cell) || buffer.length >= BUFFER_SIZE) return false;
    return axis === "row"
      ? Math.floor(cell / GRID_SIZE) === activeRow
      : cell % GRID_SIZE === activeCol;
  };

  const pick = (cell: number) => {
    if (!selectable(cell)) return;
    if (phase === "idle") setPhase("running");

    const nextBuffer = [...buffer, puzzle.grid[cell]];
    const nextUsed = new Set(used).add(cell);
    const nextDaemons = puzzle.daemons.map((daemon) =>
      daemon.done ? daemon : { ...daemon, done: matches(nextBuffer, daemon.seq) },
    );

    setBuffer(nextBuffer);
    setUsed(nextUsed);
    setPuzzle({ ...puzzle, daemons: nextDaemons });
    setActiveRow(Math.floor(cell / GRID_SIZE));
    setActiveCol(cell % GRID_SIZE);
    setAxis(axis === "row" ? "col" : "row");

    if (nextDaemons.every((daemon) => daemon.done) || nextBuffer.length >= BUFFER_SIZE) {
      setPhase("over");
    }
  };

  const uploaded = puzzle.daemons.filter((daemon) => daemon.done);
  const timeFraction = timeLeft / TIME_LIMIT_S;

  return (
    <AnimatePresence>
      {props.open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={props.onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Breach protocol minigame"
            initial={{ scale: 0.96, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 12 }}
            className="clip-corner w-full max-w-3xl border border-cyber-yellow/40 bg-cyber-bg shadow-[0_0_80px_rgba(252,238,10,0.15)]"
            onClick={(event) => event.stopPropagation()}
          >
            {/* title bar */}
            <div className="flex items-center justify-between border-b border-cyber-yellow/25 px-5 py-3">
              <p className="font-hud text-sm font-bold uppercase tracking-widest text-cyber-yellow">
                Breach Protocol <span className="text-white/35">// ICE: none</span>
              </p>
              <button
                type="button"
                onClick={props.onClose}
                className="text-white/40 transition hover:text-cyber-red"
                aria-label="Close breach protocol"
              >
                [x]
              </button>
            </div>

            {/* timer */}
            <div className="border-b border-white/10 px-5 py-3">
              <div className="flex items-center justify-between font-hud text-xs uppercase tracking-widest text-white/45">
                <span>breach time remaining</span>
                <span className={timeLeft < 15 ? "text-cyber-red" : "text-cyber-yellow"}>
                  {timeLeft.toFixed(1)}s
                </span>
              </div>
              <div className="mt-2 h-1.5 bg-white/10">
                <div
                  className={`h-full transition-[width] duration-100 ${
                    timeLeft < 15 ? "bg-cyber-red" : "bg-cyber-yellow"
                  }`}
                  style={{ width: `${timeFraction * 100}%` }}
                />
              </div>
            </div>

            <div className="grid gap-6 p-5 md:grid-cols-[auto_1fr]">
              {/* code matrix */}
              <div>
                <p className="mb-3 font-hud text-xs uppercase tracking-widest text-white/45">
                  code matrix — pick from highlighted {axis === "row" ? "row" : "column"}
                </p>
                <div className="grid w-fit grid-cols-5 gap-1.5">
                  {puzzle.grid.map((byte, cell) => {
                    const isUsed = used.has(cell);
                    const canPick = selectable(cell);
                    return (
                      <button
                        key={cell}
                        type="button"
                        disabled={!canPick}
                        onClick={() => pick(cell)}
                        className={`size-11 border font-mono text-sm transition md:size-12 ${
                          isUsed
                            ? "border-transparent text-white/15"
                            : canPick
                              ? "border-cyber-yellow/40 bg-cyber-yellow/5 text-cyber-yellow hover:border-cyber-yellow hover:bg-cyber-yellow/20 hover:shadow-[0_0_14px_rgba(252,238,10,0.35)]"
                              : "border-white/5 text-white/30"
                        }`}
                      >
                        {isUsed ? "--" : byte}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* buffer + daemons */}
              <div className="min-w-0">
                <p className="mb-3 font-hud text-xs uppercase tracking-widest text-white/45">buffer</p>
                <div className="flex flex-wrap gap-1.5">
                  {Array.from({ length: BUFFER_SIZE }, (_, i) => (
                    <span
                      key={i}
                      className={`flex size-9 items-center justify-center border font-mono text-xs ${
                        buffer[i]
                          ? "border-cyber-cyan/60 text-cyber-cyan"
                          : "border-dashed border-white/20 text-white/20"
                      }`}
                    >
                      {buffer[i] ?? "··"}
                    </span>
                  ))}
                </div>

                <p className="mb-3 mt-6 font-hud text-xs uppercase tracking-widest text-white/45">
                  daemons to upload
                </p>
                <div className="space-y-2.5">
                  {puzzle.daemons.map((daemon) => (
                    <div
                      key={daemon.name}
                      className={`flex flex-wrap items-center gap-x-4 gap-y-1 border px-3 py-2 ${
                        daemon.done ? "border-cyber-green/50 bg-cyber-green/5" : "border-white/10"
                      }`}
                    >
                      <span className="flex gap-1 font-mono text-xs">
                        {daemon.seq.map((byte, i) => (
                          <span key={i} className={daemon.done ? "text-cyber-green" : "text-cyber-yellow"}>
                            {byte}
                          </span>
                        ))}
                      </span>
                      <span className="font-hud text-sm font-semibold uppercase tracking-wider text-white/75">
                        {daemon.name}
                      </span>
                      <span className={`ml-auto text-xs ${daemon.done ? "text-cyber-green" : "text-white/30"}`}>
                        {daemon.done ? "UPLOADED" : "pending"}
                      </span>
                    </div>
                  ))}
                </div>

                {/* end-state panel */}
                {phase === "over" && (
                  <div
                    className={`mt-6 border p-4 ${
                      uploaded.length > 0 ? "border-cyber-green/50" : "border-cyber-red/60"
                    }`}
                  >
                    <p
                      className={`font-hud text-lg font-bold uppercase tracking-widest ${
                        uploaded.length > 0 ? "text-cyber-green" : "text-cyber-red"
                      }`}
                    >
                      {uploaded.length === puzzle.daemons.length
                        ? "breach complete — legend status"
                        : uploaded.length > 0
                          ? `breach partial — ${uploaded.length}/${puzzle.daemons.length} daemons uploaded`
                          : "flatlined — buffer wasted"}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3 text-sm">
                      {uploaded.some((daemon) => daemon.reward === "cv") && (
                        <a
                          href={CV_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="clip-corner-sm border border-cyber-yellow bg-cyber-yellow/10 px-4 py-2 font-hud font-semibold uppercase tracking-wider text-cyber-yellow transition hover:bg-cyber-yellow/25"
                        >
                          datamine: download CV
                        </a>
                      )}
                      {uploaded.some((daemon) => daemon.reward === "contact") && (
                        <a
                          href="#contact"
                          onClick={props.onClose}
                          className="clip-corner-sm border border-cyber-cyan px-4 py-2 font-hud font-semibold uppercase tracking-wider text-cyber-cyan transition hover:bg-cyber-cyan/10"
                        >
                          icepick: open channel
                        </a>
                      )}
                      {uploaded.some((daemon) => daemon.reward === "cred") && (
                        <p className="w-full text-cyber-green">
                          street cred +50 — you're a natural, choom.
                        </p>
                      )}
                      {uploaded.length === 0 && (
                        <p className="w-full text-white/50">
                          Even V failed sometimes. The CV is still in the navbar, no hacking required.
                        </p>
                      )}
                    </div>
                    <div className="mt-4 flex gap-3">
                      <button
                        type="button"
                        onClick={reset}
                        className="clip-corner-sm border border-white/25 px-4 py-2 font-hud text-sm font-semibold uppercase tracking-wider text-white/70 transition hover:border-white/60 hover:text-white"
                      >
                        retry breach
                      </button>
                      <button
                        type="button"
                        onClick={props.onClose}
                        className="clip-corner-sm border border-cyber-red/60 px-4 py-2 font-hud text-sm font-semibold uppercase tracking-wider text-cyber-red transition hover:bg-cyber-red/10"
                      >
                        jack out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
