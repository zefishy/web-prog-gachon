import ProjectCard from './ProjectCard';

export default function ProjectList({ projects }) {
  if (projects.length === 0) {
    return <p className="gallery__empty">No projects use that technology yet.</p>;
  }

  return (
    <ul className="project-grid">
      {projects.map((project) => (
        <li key={project.id}>
          <ProjectCard {...project} />
        </li>
      ))}
    </ul>
  );
}
