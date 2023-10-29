import { useEffect, useRef, useState } from 'react'
import lec3d from '@trickle/lec3d'
import style from './index.module.css'

const Canvas3d = () => {
	const [position, setposition] = useState({ x: 0, y: 0, z: 0 })
	const elementRef = useRef(null)
	const handleMove = (e) => {
		switch (e.key) {
			case 'w':
			case 'W':
				setposition({ x: position.x++, y: position.y, z: position.z })
				break
			case 's':
			case 'S':
				setposition({ x: position.x--, y: position.y, z: position.z })
				break
			case 'a':
			case 'A':
				setposition({ x: position.x, y: position.y++, z: position.z })
				break
			case 'd':
			case 'D':
				setposition({ x: position.x, y: position.y--, z: position.z })
				break
		}
	}
	useEffect(() => {
		const { scene, renderer, camera, mountTo, refresh, addControls } =
			lec3d.init({
				axesHelperConfigs: {
					length: 10000,
				},
			})

		// 添加鼠标控制，缩放、旋转等
		addControls()

		// 导入 GLTF 3d 模型文件
		lec3d.loadGLTF({
			modelPath: 'models/human/scene.gltf',
			options: {
				position: {
					x: position.x,
					y: position.y,
					z: position.z,
				},
				rotation: {},
			},
			callback: (gltf, model) => {
				// 添加到场景中
				scene.add(model)
			},
		})

		// 挂载到一个 DOM 元素上
		mountTo(elementRef.current)
		// 添加键盘事件监听器
	}, [position])
	document.addEventListener('keydown', handleMove)
	return (
		<>
			<div
				className={style['canvas-3d']}
				ref={elementRef}
			></div>
		</>
	)
}

export default Canvas3d
