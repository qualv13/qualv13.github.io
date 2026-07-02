import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { currentAge, profile, projects, skillGroups } from "../data/content";

const CV_URL = `${import.meta.env.BASE_URL}${profile.cvFile}`;

type Line = { text: string; kind: "input" | "output" | "accent" | "warn" | "error" };

const BANNER: Line[] = [
  { text: "netdeck v2.077 — jack in.", kind: "warn" },
  { text: "type 'help' to list quickhacks, 'exit' or Esc to jack out", kind: "output" },
];

type Actions = { openBreach: () => void };

/** Each command returns lines to print; "CLEAR"/"EXIT" are control signals. */
function runCommand(raw: string, actions: Actions): Line[] | "CLEAR" | "EXIT" {
  const command = raw.trim().toLowerCase();

  switch (command) {
    case "":
      return [];
    case "help":
      return [
        { text: "available commands:", kind: "output" },
        { text: "  whoami        who is this merc", kind: "output" },
        { text: "  breach        run the breach protocol minigame", kind: "output" },
        { text: "  quickhacks    list installed quickhacks", kind: "output" },
        { text: "  scan          scan the current visitor", kind: "output" },
        { text: "  projects      list deployed daemons", kind: "output" },
        { text: "  skills        dump the cyberware", kind: "output" },
        { text: "  contact       open a channel", kind: "output" },
        { text: "  cv            open the PDF resume", kind: "output" },
        { text: "  neofetch      system info", kind: "output" },
        { text: "  sudo hire_me  you know you want to", kind: "output" },
        { text: "  clear · exit", kind: "output" },
      ];
    case "whoami":
      return [
        { text: `${profile.name} — ${profile.role}`, kind: "accent" },
        { text: `${profile.education} · ${profile.location}`, kind: "output" },
        { text: profile.tagline, kind: "output" },
      ];
    case "breach":
      actions.openBreach();
      return [{ text: "initializing breach protocol ...", kind: "warn" }];
    case "quickhacks":
      return [
        { text: "installed quickhacks:", kind: "output" },
        { text: "  PING            1 RAM — checks if a recruiter is online", kind: "accent" },
        { text: "  DATAMINE        3 RAM — extracts CV.pdf (try 'cv')", kind: "accent" },
        { text: "  SHORT_CIRCUIT   2 RAM — fries imposter syndrome [cooldown: 24h]", kind: "accent" },
        { text: "  REBOOT_OPTICS   2 RAM — see this site in the light-theme draft", kind: "accent" },
        { text: "type 'reboot_optics' to execute the last one. careful.", kind: "output" },
      ];
    case "reboot_optics":
      window.location.href = `${import.meta.env.BASE_URL}?draft=light`;
      return [{ text: "rebooting optics ... photosensitivity warning", kind: "warn" }];
    case "scan":
      return [
        { text: "scanning visitor ...", kind: "output" },
        { text: "[ corpo badge detected — probability: recruiter 87% ]", kind: "warn" },
        { text: "adjusting buzzword emitters ... done", kind: "output" },
        { text: "recommendation: run 'sudo hire_me'", kind: "accent" },
      ];
    case "projects":
      return projects.map((project) => ({
        text: `▹ ${project.name} (${project.year}) — ${project.links.github ?? project.links.demo ?? "private build"}`,
        kind: "output" as const,
      }));
    case "skills":
      return skillGroups.map((group) => ({
        text: `${group.dir}: ${group.skills.map((skill) => skill.name).join(", ")}`,
        kind: "output" as const,
      }));
    case "contact":
      return [
        { text: `email:    ${profile.email}`, kind: "output" },
        { text: `github:   ${profile.links.github}`, kind: "output" },
        { text: `linkedin: ${profile.links.linkedin}`, kind: "output" },
        { text: "● status: open_to_work — junior java backend", kind: "accent" },
      ];
    case "cv":
      window.open(CV_URL, "_blank");
      return [{ text: "opening Jakub-Kierznowski-CV.pdf ...", kind: "accent" }];
    case "neofetch": {
      const age = currentAge();
      return [
        { text: "jakub@netrunner", kind: "warn" },
        { text: "---------------", kind: "output" },
        { text: "os:       student/intern hybrid (Night City build)", kind: "output" },
        { text: "host:     AGH Kraków · IBM Software Lab", kind: "output" },
        { text: "kernel:   java-spring with python modules", kind: "output" },
        { text: `uptime:   ${age} years — 3rd year of CS & Intelligent Systems`, kind: "output" },
        { text: "packages: 25 certifications", kind: "output" },
        { text: "gpu:      caffeine-accelerated", kind: "output" },
        { text: `ram:      ${age - 2}/${age} (2 reserved for hackathons)`, kind: "output" },
      ];
    }
    case "sudo hire_me":
    case "hire_me":
      window.location.href = `mailto:${profile.email}?subject=Let's talk about a Java role`;
      return [
        { text: "[sudo] password for recruiter: ********", kind: "output" },
        { text: "ACCESS GRANTED — opening mail client ...", kind: "accent" },
      ];
    case "clear":
      return "CLEAR";
    case "exit":
    case "quit":
      return "EXIT";
    default:
      return [
        { text: `command not found: ${command} — try 'help'`, kind: "error" },
      ];
  }
}

const LINE_CLASS: Record<Line["kind"], string> = {
  input: "text-white/80",
  output: "text-white/55",
  accent: "text-cyber-cyan",
  warn: "text-cyber-yellow",
  error: "text-cyber-red",
};

export default function TerminalOverlay(props: {
  open: boolean;
  onClose: () => void;
  onBreach: () => void;
}) {
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lock page scroll and focus the prompt while open.
  useEffect(() => {
    if (!props.open) return;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [props.open]);

  // Keep the latest line in view.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines, props.open]);

  const submit = () => {
    const result = runCommand(input, { openBreach: props.onBreach });
    if (result === "CLEAR") {
      setLines([]);
    } else if (result === "EXIT") {
      props.onClose();
    } else {
      setLines((previous) => [...previous, { text: `$ ${input}`, kind: "input" }, ...result]);
    }
    if (input.trim()) {
      setHistory((previous) => [input, ...previous].slice(0, 30));
    }
    setHistoryIndex(-1);
    setInput("");
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      submit();
    } else if (event.key === "Escape") {
      props.onClose();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      if (history[next]) {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = historyIndex - 1;
      setHistoryIndex(Math.max(next, -1));
      setInput(next >= 0 ? history[next] : "");
    }
  };

  return (
    <AnimatePresence>
      {props.open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={props.onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Interactive terminal"
            initial={{ scale: 0.96, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 12 }}
            className="clip-corner flex max-h-[70vh] w-full max-w-2xl flex-col border border-cyber-cyan/30 bg-cyber-bg shadow-[0_0_80px_rgba(0,240,255,0.15)]"
            onClick={(event) => {
              event.stopPropagation();
              inputRef.current?.focus();
            }}
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="size-3 rounded-full bg-cyber-red/70" />
              <span className="size-3 rounded-full bg-cyber-yellow/70" />
              <span className="size-3 rounded-full bg-cyber-cyan/70" />
              <span className="ml-3 text-xs text-white/40">~/jakub — netdeck</span>
              <button
                type="button"
                onClick={props.onClose}
                className="ml-auto text-white/40 transition hover:text-cyber-red"
                aria-label="Close terminal"
              >
                [x]
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-1.5 overflow-y-auto px-5 py-4 text-[13px] leading-relaxed">
              {lines.map((line, i) => (
                <p key={`${i}-${line.text.slice(0, 16)}`} className={LINE_CLASS[line.kind]}>
                  {line.text}
                </p>
              ))}
            </div>

            <div className="flex items-center gap-2 border-t border-white/10 px-5 py-3 text-[13px]">
              <span className="text-cyber-yellow">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={onKeyDown}
                className="flex-1 bg-transparent text-white/85 caret-cyber-cyan outline-none placeholder:text-white/25"
                placeholder="help"
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
