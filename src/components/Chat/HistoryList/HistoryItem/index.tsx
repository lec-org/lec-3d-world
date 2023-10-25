import { useEffect, useRef } from 'react'
import { MsgData } from '../..'
import style from './index.module.css'

interface HistoryItemProps {
	isCurrentUser: boolean
	isLastItem: boolean
	msgData: MsgData
}

const HistoryItem = ({
	isCurrentUser,
	isLastItem,
	msgData,
}: HistoryItemProps) => {
	const wrapperRef = useRef<HTMLDivElement>()

	useEffect(() => {
		if (isLastItem) {
			wrapperRef.current.scrollIntoView()
		}
	}, [isLastItem])

	return (
		<div
			ref={wrapperRef}
			className={isCurrentUser ? style['right-side'] : style['left-side']}
			onLoad={(e) => {
				if (isLastItem) {
					// e.target.scrollInfoView
					console.log('这是最后一个', e.target)
				}
			}}
		>
			<div className={style.info}>
				<div className={style.user}>
					{isCurrentUser ? '我' : decodeURI(msgData.id.toString())}
				</div>
				<div className={style.msg}>
					<span>{msgData.msg}</span>
				</div>
			</div>
		</div>
	)
}

export default HistoryItem
