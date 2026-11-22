function ProfileForm() {
  const [user, setUser] = useState({ name: '', email: '', bio: '' });

  const handleChange = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form>
      <input value={user.name} onChange={e => handleChange('name', e.target.value)} />
      <input value={user.email} onChange={e => handleChange('email', e.target.value)} />
      <textarea value={user.bio} onChange={e => handleChange('bio', e.target.value)} />
    </form>
  );
}

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const addTodo = () => {
    if (!input.trim()) return;
    setTodos(prev => [...prev, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };
  const removeTodo = (id) =>
    setTodos(prev => prev.filter(t => t.id !== id));
  const toggleTodo = (id) =>
    setTodos(prev => prev.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
}
