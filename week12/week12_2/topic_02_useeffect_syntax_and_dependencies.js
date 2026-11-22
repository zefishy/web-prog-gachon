import { useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log('Component rendered!');

    return () => {
      console.log('Cleanup before next run or unmount');
    };
  }, [/* dependency array */]);

  return <div>{JSON.stringify(data)}</div>;
}
