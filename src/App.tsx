import { useState } from "react";
import "./App.css";
import Bubble from "./components/Bubble";
import Canvas3d from "./components/Canvas3d";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Canvas3d></Canvas3d>
    </>
  );
};

export default App;
