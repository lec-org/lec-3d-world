import style from "./index.module.css";
import { useEffect, useState, useRef } from "react";
import HistoryList from "./HistoryList";

export interface MsgData {
  id: number | string;
  msg: string;
}

interface BubbleProps {
  isShow: boolean;
  id: string | number;
}

const Chat = ({ isShow, id }: BubbleProps) => {
  // const sendmsg = useRef(() => {})
  const idRef = useRef<string | number>();
  const [socket, setSocket] = useState<WebSocket>();
  const [msgDataList, setMsgDataList] = useState<Array<MsgData>>([]);
  const msgRef = useRef("");
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (id) {
      const url = `ws://192.168.124.44:2333?id=${id}`;
      const s = new window.WebSocket(url);

      s.onopen = () => {
        s.send(`${id}`);
        console.log("连接建立成功", url);
      };

      s.onmessage = (v) => {
        // const msg = JSON.parse(json);
        const data = JSON.parse(v.data);
        if (data.msg && data.id) {
          const newList = [
            ...msgDataList,
            { msg: `${data.msg}`, id: `${data.id}` },
          ];
          setMsgDataList(newList);
        }
      };

      setSocket(s);
    }
  }, [id, msgDataList]);

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
            const newList = [
              ...msgDataList,
              { msg: msgRef.current, id: idRef.current },
            ];
            setMsgDataList(newList);
            socket.send(msgRef.current);
            // inputRef.current.value = "";
          }}
        >
          发送
        </button>
      </div>
    </div>
  );
};

export default Chat;
