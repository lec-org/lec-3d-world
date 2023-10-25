import style from "./index.module.css";
import { useEffect, useState, useRef } from "react";
import HistoryList from "./HistoryList";

export interface MsgData {
  id: number | string;
  msg: string;
}

interface BubbleProps {
  isShow: boolean;
}

const Chat = ({ isShow }: BubbleProps) => {
  // const sendmsg = useRef(() => {})
  const idRef = useRef<string | number>();
  const [socket, setSocket] = useState<WebSocket>();
  const [msgDataList, setMsgDataList] = useState<Array<MsgData>>([
    { msg: "123", id: "1" },
    { msg: "123", id: "1" },
    { msg: "123", id: "1" },
    { msg: "哈哈哈哈", id: "2" },
    { msg: "123", id: "1" },
    { msg: "123", id: "1" },
    { msg: "123", id: "1" },
  ]);
  const msgRef = useRef("");
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    idRef.current = sessionStorage.getItem("uuid");

    const url = `ws://192.168.124.44:2333?id=${idRef.current}`;
    const s = new window.WebSocket(url);

    s.onopen = () => {
      s.send(`${idRef.current}`);
      console.log("连接建立成功", url);
    };

    s.onmessage = (msg) => {
      console.log(msg.data);
    };

    setSocket(s);
  }, []);

  useEffect(() => {
    if (isShow) {
      inputRef.current.disabled = false;
      inputRef.current?.focus();
    } else {
      inputRef.current.disabled = true;
    }
  }, [isShow]);

  return (
    <div className={style.container} style={{ opacity: isShow ? "1" : "0" }}>
      <div className={style.info}>
        <HistoryList
          msgDataList={msgDataList}
          currentUserId={idRef.current}
        ></HistoryList>
      </div>

      <div className={style.operation}>
        <input
          ref={inputRef}
          type="text"
          onChange={(e) => {
            msgRef.current = e.target.value;
          }}
        />
        <button
          className="send"
          onClick={() => {
            console.log(msgRef.current);
            socket.send(msgRef.current);
          }}
        >
          发送
        </button>
      </div>
    </div>
  );
};

export default Chat;
