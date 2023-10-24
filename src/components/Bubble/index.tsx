import "./index.module.css";
import initWebSocket from "../../utils/request";
import { useEffect, useState } from "react";
const Bubble = () => {
  // const sendmsg = useRef(() => {})
  const [socket, setSocket] = useState<WebSocket>();
  useEffect(() => {
    const url = "ws://localhost:2333";
    // const s = initWebSocket(
    //   url,
    //   (msg) => {
    //     console.log("success", msg);
    //   },
    //   (err) => {
    //     console.log("err", err);
    //   }
    // );
    const s = new window.WebSocket(url);
    s.onopen = () => {
      console.log("连接建立成功", url);
    };

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
