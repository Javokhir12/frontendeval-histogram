import { useEffect, useState } from "react";
import "./App.css";
import Plot from "./components/Plot";

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new"
        );
        const textData = await response.text();
        const numsHash = textData.split("").reduce((acc, curr) => {
          if (curr === "\n") return acc;
          acc[curr] = acc[curr] || 0;
          acc[curr]++;
          return acc;
        }, {});
        setData(numsHash);
      } catch (error) {
        console.warn(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const plotData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Number frequency",
        data: Object.values(data),
        backgroundColor: "rgba(0, 0, 0, .5)",
      },
    ],
  };

  if (loading) return <h2 className="loading">Loading...</h2>;
  return (
    <div className="App">
      <Plot data={plotData} />
    </div>
  );
}

export default App;
