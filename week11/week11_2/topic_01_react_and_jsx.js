const element = <h1 className="title">Hello, {name}!</h1>;

const element = React.createElement('h1', { className: 'title' }, 'Hello, ' + name + '!');

function App() {
  const user = 'Amir';
  return (
    <div className="app">
      <h1>Welcome, {user}!</h1>
      <p>Today: {new Date().toDateString()}</p>
      <img src="photo.jpg" alt="Profile" />
    </div>
  );
}
