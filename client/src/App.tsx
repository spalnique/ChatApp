import './App.css';

function App() {
  // const [count, setCount] = useState(0);
  // const [isFetching, setIsFetching] = useState<null | boolean>(null);
  // const [response, setResponse] = useState<null | Response>(null);

  // useEffect(() => {
  //   const fetchFn = async () => {
  //     try {
  //       const res = await fetch('http://localhost:3000/status');
  //       const data = await res.json();

  //       if (res.ok) setResponse(() => data);
  //       setCount((count) => count + 1);
  //     } catch (error) {
  //       console.error(error);
  //       setIsFetching(false);
  //     } finally {
  //       setIsFetching(false);
  //     }
  //   };
  //   if (isFetching) fetchFn();
  // }, [isFetching]);

  return <p>TEST</p>;
}

export default App;
