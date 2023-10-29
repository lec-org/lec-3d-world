import { MsgData } from "..";
import HistoryItem from "./HistoryItem";
import style from "./index.module.css";

interface HistoryListProps {
  msgDataList: Array<MsgData>;
  currentUserId: number | string;
}

const HistoryList = ({ msgDataList, currentUserId }: HistoryListProps) => {
  return (
    <div className={style.wrapper}>
      {msgDataList.map((msgData, index) => {
        const isCurrentUser =
          decodeURI(msgData.id.toString()) === currentUserId.toString();
        const isLastItem = index === msgDataList.length - 1;

        return (
          <HistoryItem
            isCurrentUser={isCurrentUser}
            isLastItem={isLastItem}
            msgData={msgData}
            key={msgData.id.toString() + msgData.msg + index}
          ></HistoryItem>
        );
      })}
    </div>
  );
};

export default HistoryList;
