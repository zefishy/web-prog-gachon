function App() {
  return (
    <div>
      <StudentCard name="Amir Tashkentov" year={2} />
      <StudentCard name="Gulnora Nazarova" year={3} />
    </div>
  );
}

function StudentCard(props) {
  return (
    <div className="card">
      <h3>{props.name}</h3>
      <p>Year {props.year}</p>
    </div>
  );
}

function StudentCard({ name, year }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>Year {year}</p>
    </div>
  );
}

function Button({ label = 'Click me', color = 'blue', disabled = false }) {
  return (
    <button style={{ background: color }} disabled={disabled}>
      {label}
    </button>
  );
}

<Button />
<Button label="Submit" />
<Button label="Delete" color="red" />

function Panel({ title, children }) {
  return (
    <div className="panel">
      <h2>{title}</h2>
      <div className="panel-body">{children}</div>
    </div>
  );
}

<Panel title="Week 11">
  <p>React session today</p>
  <ul><li>Components</li><li>Props</li></ul>
</Panel>
