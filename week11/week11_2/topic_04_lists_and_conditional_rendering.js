const courses = [
  { id: 1, name: 'Web Programming', credits: 3 },
  { id: 2, name: 'Databases', credits: 3 },
  { id: 3, name: 'Algorithms', credits: 4 },
];

function CourseList() {
  return (
    <ul>
      {courses.map(course => (
        <li key={course.id}>
          {course.name} — {course.credits} credits
        </li>
      ))}
    </ul>
  );
}

function UserGreeting({ isLoggedIn, username }) {
  return (
    <div>
      {isLoggedIn
        ? <h1>Welcome back, {username}!</h1>
        : <h1>Please log in</h1>
      }
      {isLoggedIn && <button>Log out</button>}
    </div>
  );
}

function Dashboard({ isAdmin }) {
  if (!isAdmin) return <p>Access denied</p>;
  return <AdminPanel />;
}
