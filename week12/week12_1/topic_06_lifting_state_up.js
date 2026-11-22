function SearchPage() {
  const [query,   setQuery]   = useState('');
  const [results, setResults] = useState([]);
  const handleSearch = async (q) => {
    setQuery(q);
    const data = await fetchResults(q);
    setResults(data);
  };
  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <ResultList query={query} results={results} />
    </>
  );
}
function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');
  return <input value={input} onChange={e => {
    setInput(e.target.value);
    onSearch(e.target.value);
  }} />;
}
