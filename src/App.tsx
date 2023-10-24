import { useState } from "react";
import "./App.css";
import Bubble from "./components/Bubble";
import Canvas3d from "./components/Canvas3d";

const App = () => {
  const [isShow, setIsShow] = useState(false);
  document.onkeydown = (e) => {
    console.log(e.key);

    if (e.key == "i" && e.ctrlKey) {
      setIsShow(!isShow);
    }
  };
  return (
    <>
      {isShow && <Bubble></Bubble>}
      <Canvas3d></Canvas3d>
    </>
  );
};

export default App;
