const initWebSocket = (url: string, callback1, callback2) => {
	const socket = new window.WebSocket(url)
	socket.addEventListener('open', () => {
		console.log('连接建立成功', url)
	})
	socket.addEventListener('message', callback1)
	socket.addEventListener('close', callback2)
	// debugger
	return socket
}

export default initWebSocket
