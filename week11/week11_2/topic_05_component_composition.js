function Avatar({ src, alt }) {
  return <img src={src} alt={alt} style={{ borderRadius: '50%', width: 48 }} />;
}

function Badge({ text, color = '#0891b2' }) {
  return (
    <span style={{ background: color, color: '#fff', padding: '2px 8px', borderRadius: 4 }}>
      {text}
    </span>
  );
}

function StudentCard({ name, studentId, year, avatarUrl }) {
  return (
    <div className="card">
      <Avatar src={avatarUrl} alt={name} />
      <h3>{name}</h3>
      <p>ID: {studentId}</p>
      <Badge text={`Year ${year}`} />
    </div>
  );
}

function App() {
  return (
    <div className="student-list">
      <StudentCard name="Amir" studentId="202011234" year={3} avatarUrl="/img/amir.jpg" />
      <StudentCard name="Zulfiya" studentId="202012345" year={2} avatarUrl="/img/zulfiya.jpg" />
    </div>
  );
}
