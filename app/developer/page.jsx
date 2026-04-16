"use client";

import { useMemo, useState } from "react";
import styles from "./developer.module.css";

const projectData = [
  {
    id: "chess-cnn",
    title: "Chess CNN",
    description:
      "Computer vision pipeline using convolutional neural networks to identify chessboard states and piece classes from image inputs.",
    tech: ["Python", "TensorFlow", "OpenCV", "NumPy"],
    github: "https://github.com/",
    preview: "AI/ML vision workflow for board-state recognition.",
    details:
      "Built a reproducible training + inference flow to classify pieces and board occupancy. Focused on clean dataset processing and low-latency inference.",
  },
  {
    id: "webrtc-project",
    title: "WebRTC Project",
    description:
      "Real-time communication system for low-latency peer video/audio exchange with collaborative implementation support.",
    tech: ["WebRTC", "Node.js", "Socket.IO", "React"],
    github: "https://github.com/neutron420",
    preview: "Peer connection management and signaling architecture.",
    details:
      "Designed signaling flow, TURN/STUN fallback handling, and resilient room lifecycle behavior. Collaboration reference: neutron420.",
  },
  {
    id: "sharebite",
    title: "Sharebite",
    description:
      "Full-stack food redistribution platform that connects donors, operators, and distribution points with practical workflow tracking.",
    tech: ["Next.js", "PostgreSQL", "Express", "Map APIs"],
    github: "https://github.com/",
    preview: "Logistics-first platform for social impact distribution.",
    details:
      "Implemented role-based data flows, scheduling primitives, and route-oriented records to reduce operational friction for redistribution networks.",
  },
  {
    id: "notique",
    title: "Notique",
    description:
      "Productivity-focused notes and organization system designed for low cognitive overhead and quick retrieval.",
    tech: ["React", "TypeScript", "Local DB", "PWA"],
    github: "https://github.com/",
    preview: "Minimal notes interface with clear focus states.",
    details:
      "Focused on frictionless capture, structured tagging, and durable offline-first behavior so users can maintain flow during deep work sessions.",
  },
];

const skillGroups = [
  { name: "Languages", values: ["JavaScript", "TypeScript", "Python", "SQL", "C++"] },
  { name: "Frameworks", values: ["Next.js", "React", "Node.js", "Express", "TensorFlow"] },
  { name: "Tools", values: ["Git", "Docker", "Postman", "Figma", "VS Code"] },
];

const experience = [
  {
    year: "2026",
    title: "Independent Full-Stack + ML Builder",
    description: "Shipping end-to-end products that combine clean UX with applied machine intelligence.",
  },
  {
    year: "2025",
    title: "Collaborative Systems Development",
    description: "Worked on real-time communication and social impact platforms with distributed contributors.",
  },
  {
    year: "2024",
    title: "Interface + Product Foundations",
    description: "Built portfolio projects focused on frontend quality, information architecture, and consistent design systems.",
  },
];

export default function DeveloperPage() {
  const [activeProjectId, setActiveProjectId] = useState(projectData[0].id);

  const activeProject = useMemo(
    () => projectData.find((project) => project.id === activeProjectId) || projectData[0],
    [activeProjectId]
  );

  return (
    <div className={styles.pageWrap}>
      <section id="home" className={styles.hero}>
        <p className={styles.kicker}>Developer Mode</p>
        <h1>Building reliable systems with clean architecture and practical impact.</h1>
        <p>
          I design and ship products across frontend, backend, and ML workflows. My focus is clear
          structure, measurable outcomes, and maintainable implementation.
        </p>
        <div className={styles.statRow}>
          <article>
            <p>Projects</p>
            <strong>12+</strong>
          </article>
          <article>
            <p>Years Building</p>
            <strong>3+</strong>
          </article>
          <article>
            <p>Collaborations</p>
            <strong>8</strong>
          </article>
        </div>
      </section>

      <section id="projects" className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.kicker}>Main Focus</p>
          <h2>Projects</h2>
        </div>

        <div className={styles.projectsLayout}>
          <div className={styles.projectGrid}>
            {projectData.map((project) => (
              <button
                key={project.id}
                type="button"
                className={`${styles.projectCard} ${activeProjectId === project.id ? styles.activeCard : ""}`}
                onClick={() => setActiveProjectId(project.id)}
              >
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className={styles.techList}>
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          <aside className={styles.projectPanel}>
            <p className={styles.kicker}>Project Detail</p>
            <h3>{activeProject.title}</h3>
            <p>{activeProject.details}</p>
            <p className={styles.preview}>{activeProject.preview}</p>
            <a href={activeProject.github} target="_blank" rel="noreferrer">
              Open GitHub
            </a>
          </aside>
        </div>
      </section>

      <section id="skills" className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.kicker}>Capability Map</p>
          <h2>Skills</h2>
        </div>

        <div className={styles.skillsGrid}>
          {skillGroups.map((group) => (
            <article key={group.name} className={styles.skillCard}>
              <h3>{group.name}</h3>
              <div className={styles.skillTokens}>
                {group.values.map((value) => (
                  <span key={value}>{value}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.kicker}>Timeline</p>
          <h2>Experience</h2>
        </div>

        <div className={styles.timeline}>
          {experience.map((item) => (
            <article key={item.year + item.title} className={styles.timelineItem}>
              <span>{item.year}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
