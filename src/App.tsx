import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Canvas3d from "./components/Canvas3d";

const App = () => {
  const [isShow, setIsShow] = useState(false);
  const [id, setId] = useState<string | number>();

  useEffect(() => {
    const uid = window.prompt("请输入用户名");
    setId(uid);
  }, []);

  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.key == "i" && e.ctrlKey) {
        setIsShow(!isShow);
      }
    };
  }, [isShow]);
  return (
    <div>
      {<Chat isShow={isShow} id={id}></Chat>}
      <Canvas3d></Canvas3d>
    </div>
  );
};

export default App;
