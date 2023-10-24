import style from './index.module.css'
import initWebSocket from '../../utils/request'
import { useEffect, useState, useRef } from 'react'

interface BubbleProps {
	isShow: boolean
}

const Bubble = ({ isShow }: BubbleProps) => {
	// const sendmsg = useRef(() => {})
	const [socket, setSocket] = useState<WebSocket>()
	useEffect(() => {
		const url = `ws://192.168.124.44:2333?id=${sessionStorage.getItem('uuid')}`
		// const s = initWebSocket(...
		//   url,
		//   (msg) => {
		//     console.log("success", msg);
		//   },
		//   (err) => {
		//     console.log("err", err);
		//   }
		// );
		const s = new window.WebSocket(url)
		s.onopen = () => {
			console.log(sessionStorage.getItem('uuid'))

			s.send(sessionStorage.getItem('uuid'))
			console.log('连接建立成功', url)
		}
		s.onmessage = msg => {
			console.log(msg.data)
		}
		setSocket(s)
	}, [])
	const msgRef = useRef('')
	return (
		<div
			className={style.container}
			style={{ opacity: isShow ? '1' : '0' }}
		>
			<div className='info'>信息</div>
			<input
				type='text'
				onChange={e => {
					msgRef.current = e.target.value
				}}
			/>
			{/* {message} */}
			<button
				className='send'
				onClick={() => {
					console.log(msgRef.current)

					socket.send(msgRef.current)
				}}
			>
				发送
			</button>
		</div>
	)
}

export default Bubble
