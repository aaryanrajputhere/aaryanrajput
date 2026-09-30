"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "../data/projects";

type ProjectsProps = {
  projects: Project[];
};

export default function Projects({ projects }: ProjectsProps) {
  const [activeDemo, setActiveDemo] = useState<Project | null>(null);

  return (
    <section className="mb-12">
      <h2 className="mb-3 text-[15px]">projects</h2>
      <div className="border-y border-[var(--line)]">
        {projects.map((project) => (
          <div key={project.name} className="border-b border-[var(--line)] last:border-b-0">
            {project.demoVideo ? (
              <button
                type="button"
                onClick={() => setActiveDemo(project)}
                className="group block w-full cursor-pointer py-4 text-left"
                aria-label={`Play ${project.name} demo video`}
              >
                <ProjectDetails project={project} showDemoLabel />
                {project.image ? <ProjectImage project={project} interactive /> : null}
              </button>
            ) : project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="group block py-4"
              >
                <ProjectDetails project={project} />
              </a>
            ) : (
              <div className="py-4">
                <ProjectDetails project={project} />
              </div>
            )}
            {!project.demoVideo && project.image && project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${project.name}`}
                className="block"
              >
                <ProjectImage project={project} />
              </a>
            ) : !project.demoVideo && project.image ? (
              <ProjectImage project={project} />
            ) : null}
          </div>
        ))}
      </div>
      {activeDemo ? (
        <VideoModal project={activeDemo} onClose={() => setActiveDemo(null)} />
      ) : null}
    </section>
  );
}

function ProjectDetails({
  project,
  showDemoLabel = false,
}: {
  project: Project;
  showDemoLabel?: boolean;
}) {
  return (
    <>
      <div className="mb-1 flex items-baseline justify-between gap-4 text-[15px]">
        <span className="font-medium group-hover:underline">
          {project.name}
        </span>
        {showDemoLabel ? (
          <span className="demo-label shrink-0" aria-hidden="true">
            <span className="demo-play-icon">▶</span> play demo
          </span>
        ) : (
          <span className="shrink-0 text-right text-[var(--text-muted)]">
            {project.type}
          </span>
        )}
      </div>
      <p className="max-w-[580px] text-[14px] leading-6 text-[var(--text-muted)]">
        {project.description}
      </p>
    </>
  );
}

function ProjectImage({
  project,
  interactive = false,
}: {
  project: Project;
  interactive?: boolean;
}) {
  if (!project.image) return null;

  return (
    <Image
      src={project.image.src}
      alt={project.image.alt}
      width={project.image.width}
      height={project.image.height}
      unoptimized
      className={`project-preview mb-5 ${interactive ? "project-preview-interactive" : ""}`}
    />
  );
}

function VideoModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="demo-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="demo-modal-content">
        <div className="demo-modal-header">
          <div>
            <p className="demo-eyebrow">product walkthrough</p>
            <h3 id="demo-title" className="demo-title">
              {project.name}
            </h3>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="demo-close"
            aria-label="Close demo video"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="demo-video-shell">
          <video
            className="demo-video"
            src={project.demoVideo}
            controls
            autoPlay
            playsInline
            preload="metadata"
          >
            Your browser does not support HTML video.
          </video>
        </div>
      </div>
    </div>
  );
}
