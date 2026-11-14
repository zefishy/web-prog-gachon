export default function FilterBar({ filters, active, onChange }) {
  return (
    <div
      className="filter-bar"
      role="group"
      aria-label="Filter projects by technology"
    >
      <span className="filter-bar__label" aria-hidden="true">
        Technology
      </span>
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          className="filter-bar__btn"
          data-filter={filter}
          aria-pressed={filter === active}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
