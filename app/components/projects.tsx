import type { Project } from "../data/projects";

type ProjectsProps = {
  projects: Project[];
};

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-3 text-[15px]">projects</h2>
      <div className="border-y border-[var(--line)]">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="group block border-b border-[var(--line)] py-4 last:border-b-0"
          >
            <div className="mb-1 flex items-baseline justify-between gap-4 text-[15px]">
              <span className="font-medium group-hover:underline">
                {project.name}
              </span>
              <span className="shrink-0 text-right text-[var(--text-muted)]">
                {project.type}
              </span>
            </div>
            <p className="max-w-[580px] text-[14px] leading-6 text-[var(--text-muted)]">
              {project.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
