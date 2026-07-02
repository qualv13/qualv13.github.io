/**
 * Fixed HUD chrome around the viewport: thin corner brackets plus tiny
 * status labels, like a netrunner's optics overlay. Desktop only.
 */
export default function HudFrame() {
  const bracket = "absolute size-6 border-cyber-cyan/40";
  return (
    <div className="pointer-events-none fixed inset-3 z-[65] hidden md:block" aria-hidden="true">
      <span className={`${bracket} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${bracket} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${bracket} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${bracket} bottom-0 right-0 border-b-2 border-r-2`} />

      <p className="absolute bottom-0.5 left-8 font-hud text-[11px] font-semibold uppercase tracking-[0.2em] text-cyber-cyan/50">
        JK://netrunner_portfolio · RAM 14/16 <span className="text-cyber-yellow">▮▮▮▮▮▮▮</span>▯
      </p>
      <p className="absolute bottom-0.5 right-8 font-hud text-[11px] font-semibold uppercase tracking-[0.2em] text-cyber-cyan/50">
        build v2.077
      </p>
    </div>
  );
}
