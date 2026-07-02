import { motion } from "framer-motion";
import { projects, profile } from "../data/content";
import { fadeUp, viewportOnce } from "../lib/motion";
import Section from "./ui/Section";
import Tag from "./ui/Tag";
import { GitHubIcon } from "./icons";

/** Corner brackets that light up cyan when the card is hovered. */
function CornerBrackets() {
  const corner = "absolute size-3.5 border-cyber-cyan/30 transition group-hover:border-cyber-cyan";
  return (
    <>
      <span aria-hidden className={`${corner} left-0 top-0 border-l border-t`} />
      <span aria-hidden className={`${corner} right-0 top-0 border-r border-t`} />
      <span aria-hidden className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span aria-hidden className={`${corner} bottom-0 right-0 border-b border-r`} />
    </>
  );
}

export default function Projects() {
  return (
    <Section id="projects" index={3} title="Projects" sub="deployed_daemons">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <motion.article
            key={project.name}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="group relative flex flex-col border border-white/10 bg-cyber-panel/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyber-cyan/40 hover:shadow-[0_0_40px_rgba(0,240,255,0.1)]"
          >
            <CornerBrackets />

            <header className="flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-bold text-white transition group-hover:text-cyber-cyan">
                {project.name}
              </h3>
              <span className="text-xs text-white/35">{project.year}</span>
            </header>

            {project.badge && (
              <p className="clip-corner-sm mt-2 w-fit border border-cyber-yellow/50 px-2 py-0.5 text-[11px] text-cyber-yellow">
                ★ {project.badge}
              </p>
            )}

            <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">{project.description}</p>

            {project.stats && (
              <p className="mt-3 text-xs text-cyber-cyan/80">{project.stats}</p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>

            <footer className="mt-5 flex items-center gap-5 text-xs">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-white/50 transition hover:text-cyber-cyan"
                >
                  <GitHubIcon className="size-4" /> source ↗
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/50 transition hover:text-cyber-cyan"
                >
                  live_demo ↗
                </a>
              )}
              {project.private && <span className="text-white/30">[ private_build ]</span>}
            </footer>
          </motion.article>
        ))}
      </div>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-8 text-sm text-white/40"
      >
        <span className="text-cyber-cyan">$</span> more on{" "}
        <a href={profile.links.github} target="_blank" rel="noreferrer" className="text-cyber-cyan underline-offset-4 hover:underline">
          github.com/qualv13 ↗
        </a>
      </motion.p>
    </Section>
  );
}
