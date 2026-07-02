export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-white/35 md:flex-row">
        <p>© 2026 jakub.kierznowski</p>
        <p>
          <span className="text-cyber-cyan/60">$</span> echo "thanks for scrolling"
        </p>
        <p>built with react + vite + ☕</p>
      </div>
    </footer>
  );
}
