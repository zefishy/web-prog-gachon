function UserForm() {
  const [name,      setName]      = useState('');
  const [email,     setEmail]     = useState('');
  const [age,       setAge]       = useState(0);
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }
  if (submitted) {
    return <p>Thanks, {name}! Email: {email}, Age: {age}</p>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)}
        placeholder="Name" />
      <input value={email} onChange={e => setEmail(e.target.value)}
        placeholder="Email" />
      <button>Submit</button>
    </form>
  );
}
