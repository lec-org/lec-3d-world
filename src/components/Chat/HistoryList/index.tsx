import { MsgData } from "..";
import style from "./index.module.css";

interface HistoryListProps {
  msgDataList: Array<MsgData>;
  currentUserId: number | string;
}

const HistoryList = ({ msgDataList, currentUserId }: HistoryListProps) => {
  return (
    <div className={style.wrapper}>
      {msgDataList.map((msgData, index) => {
        const isCurrentUser = msgData.id === currentUserId;
        console.log(isCurrentUser, msgData.id, msgDataList);
        return (
          <div
            key={index}
            className={isCurrentUser ? style["right-side"] : style["left-side"]}
          >
            <div className={style.info}>
              <div className={style.user}>
                {isCurrentUser ? "我" : currentUserId}
              </div>
              <div className={style.msg}>
                <span>{msgData.msg}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryList;
