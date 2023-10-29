import { useEffect, useRef } from 'react'
import lec3d from '@trickle/lec3d'
import style from './index.module.css'

const Canvas3d = () => {
	const elementRef = useRef(null)
	const handleMove = (e, model, speed) => {
		console.log(e)

		console.log(model.position)

		switch (e.key) {
			case 'w':
			case 'W':
				model.position.z += speed * 2
				break
			case 's':
			case 'S':
				model.position.z -= speed * 2
				break
			case 'a':
			case 'A':
				model.position.x += speed * 2
				break
			case 'd':
			case 'D':
				model.position.x -= speed * 2
				break
			case ' ':
				model.position.y += speed * 2
				setTimeout(() => (model.position.y = 0), 1000)
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
				position: {},
				rotation: {},
			},
			callback: (gltf, model) => {
				// 添加到场景中
				scene.add(model)
				document.addEventListener('keydown', (e: KeyboardEvent) => {
					handleMove(e, model, 10)
				})
			},
		})

		// 挂载到一个 DOM 元素上
		mountTo(elementRef.current)
		// 添加键盘事件监听器
	}, [])
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
