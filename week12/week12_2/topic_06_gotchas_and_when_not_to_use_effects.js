useEffect(() => { setCount(count + 1); }, [count]);

useEffect(() => { setCount(c => c + 1); }, []);

useEffect(() => setFullName(first + ' ' + last), [first, last]);

const fullName = first + ' ' + last;
