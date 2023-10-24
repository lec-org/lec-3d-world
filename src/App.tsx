import { useEffect, useState } from 'react'
import './App.css'
import Bubble from './components/Bubble'
import Canvas3d from './components/Canvas3d'

const App = () => {
	const [isShow, setIsShow] = useState(false)

	useEffect(() => {
		const uuid = sessionStorage.getItem('uuid')
		console.log(uuid)
		if (!uuid || uuid === 'null') {
			console.log(true)

			// setToShow(true)
			const id = window.prompt('请输入用户名')
			sessionStorage.setItem('uuid', id)
		}
	}, [])
	useEffect(() => {
		document.onkeydown = e => {
			if (e.key == 'i' && e.ctrlKey) {
				setIsShow(!isShow)
			}
		}
	}, [isShow])
	return (
		<div>
			{<Bubble isShow={isShow}></Bubble>}
			<Canvas3d></Canvas3d>
		</div>
	)
}

export default App
