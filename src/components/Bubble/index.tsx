import "./index.module.css";
import initWebSocket from "../../utils/request";
import { useEffect, useState } from "react";
const Bubble = () => {
  // const sendmsg = useRef(() => {})
  const [socket, setSocket] = useState<WebSocket>();
  useEffect(() => {
    const s = initWebSocket(
      "ws://localhost:2333",
      (msg) => {
        console.log(msg);
      },
      (err) => {
        console.log(err);
      }
    );
    setSocket(s);
  }, []);

  return (
    <div className="container">
      <div className="info">信息</div>
      <button
        className="send"
        onClick={() => {
          socket.send("123");
        }}
      >
        发送
      </button>
    </div>
  );
};

export default Bubble;
