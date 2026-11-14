import { useState } from 'react';
import FilterBar from './components/FilterBar';
import ProjectList from './components/ProjectList';
import { projects } from './data/projects';
import './App.css';

const FILTERS = ['All', 'JavaScript', 'CSS', 'HTML'];

export default function App() {
  const [filter, setFilter] = useState('All');

  const visible =
    filter === 'All'
      ? projects
      : projects.filter((project) => project.tech.includes(filter));

  return (
    <div className="gallery">
      <header className="gallery__header">
        <h1 className="gallery__title">Ryan's projects</h1>
        <p className="gallery__lead">
          Coursework from the Web Programming Library, filtered by the
          technology each project uses.
        </p>
      </header>

      <FilterBar filters={FILTERS} active={filter} onChange={setFilter} />

      <p className="gallery__count" aria-live="polite">
        {visible.length} of {projects.length} projects
      </p>

      <ProjectList projects={visible} />
    </div>
  );
}
