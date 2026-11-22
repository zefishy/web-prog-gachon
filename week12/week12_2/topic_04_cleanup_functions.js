function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <p>{time.toLocaleTimeString('ko-KR')}</p>;
}

useEffect(() => {
  const controller = new AbortController();

  async function fetchUser() {
    try {
      const res = await fetch(
        `https://api.github.com/users/${username}`,
        { signal: controller.signal }
      );
      const data = await res.json();
      setUser(data);
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError(err.message);
    }
  }
  fetchUser();
  return () => controller.abort();
}, [username]);
