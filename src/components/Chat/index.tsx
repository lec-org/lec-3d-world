import style from './index.module.css'
import { useEffect, useState, useRef, useCallback } from 'react'
import HistoryList from './HistoryList'

export interface MsgData {
	id: number | string
	msg: string
}

interface BubbleProps {
	isShow: boolean
	id: string | number
}

const Chat = ({ isShow, id }: BubbleProps) => {
	// const sendmsg = useRef(() => {})
	const [socket, setSocket] = useState<WebSocket>()
	const [msgDataList, setMsgDataList] = useState<Array<MsgData>>([])
	const msgDataListRef = useRef(msgDataList)
	const inputRef = useRef<HTMLInputElement>()
	const btnRef = useRef<HTMLButtonElement>()
	const infoWrapperRef = useRef<HTMLDivElement>()

	useEffect(() => {
		if (id && !socket) {
			const url = `ws://localhost:2333?id=${id}`
			const s = new window.WebSocket(url)

			s.onopen = () => {
				// s.send(`${id}`)
				console.log('连接建立成功', url)
			}
			s.onmessage = (v) => {
				const data = JSON.parse(v.data)
				if (data.msg && data.id) {
					msgDataListRef.current = [
						...msgDataListRef.current,
						{ msg: `${data.msg}`, id: `${data.id}` },
					]
					setMsgDataList(msgDataListRef.current)
					console.log(msgDataListRef.current)
				}
			},
				setSocket(s)
		}
	}, [id, msgDataList])

	useEffect(() => {
		if (isShow) {
			inputRef.current.disabled = false
			inputRef.current?.focus()
		} else {
			inputRef.current.disabled = true
		}
	}, [isShow])

	return (
		<div
			className={style.container}
			style={{ opacity: isShow ? '1' : '0' }}
		>
			<div
				className={style.info}
				ref={infoWrapperRef}
			>
				<HistoryList
					msgDataList={msgDataList}
					currentUserId={id}
				></HistoryList>
			</div>

			<div className={style.operation}>
				<input
					ref={inputRef}
					type='text'
					onKeyDown={(e) => {
						if (e.code === 'Enter') {
							btnRef.current.click()
						}
					}}
					onChange={(e) => {
						inputRef.current.value = e.target.value
					}}
				/>
				<button
					className='send'
					ref={btnRef}
					onClick={() => {
						// const newList = [
						// 	...msgDataList,
						// 	{ msg: inputRef.current.value, id },
						// ]
						// setMsgDataList(newList)
						// console.log(msgDataList)

  return (
    <div className={style.container} style={{ opacity: isShow ? "1" : "0" }}>
      <div className={style.info} ref={infoWrapperRef}>
        <HistoryList msgDataList={msgDataList} currentUserId={id}></HistoryList>
      </div>

      <div className={style.operation}>
        <input
          ref={inputRef}
          type="text"
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              btnRef.current.click();
            }
          }}
          onChange={(e) => {
            inputRef.current.value = e.target.value;
          }}
        />
        <button
          className="send"
          ref={btnRef}
          onClick={() => {
            const newList = [
              ...msgDataList,
              { msg: inputRef.current.value, id },
            ];
            setMsgDataList(newList);
            socket.send(inputRef.current.value);
            infoWrapperRef.current.scrollTop =
              infoWrapperRef.current.scrollHeight * 2;
            inputRef.current.value = "";
          }}
        >
          发送
        </button>
      </div>
    </div>
  );
};

export default Chat
