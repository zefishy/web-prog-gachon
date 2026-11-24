function Greeting() {
  return <h2>Hello, World!</h2>;
}

const Greeting = () => <h2>Hello, World!</h2>;

function App() {
  return (
    <div>
      <Greeting />
      <Greeting />
    </div>
  );
}

function UserCard() {
  return (
    <>
      <h3>Zulfiya Karimova</h3>
      <p>Computer Engineering · Year 3</p>
    </>
  );
}
