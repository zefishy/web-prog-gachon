export default function ProjectCard({
  title,
  description,
  tech,
  github,
  demo,
}) {
  return (
    <article className="project-card">
      <h2 className="project-card__title">{title}</h2>
      <p className="project-card__desc">{description}</p>

      <ul className="chips" aria-label="Tech stack">
        {tech.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <p className="project-card__links">
        {github && (
          <a href={github} rel="noopener noreferrer">
            GitHub
          </a>
        )}
        {demo && (
          <a href={demo} rel="noopener noreferrer">
            Live demo
          </a>
        )}
      </p>
    </article>
  );
}
