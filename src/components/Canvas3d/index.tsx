import { useEffect, useRef } from "react";
import lec3d from "@trickle/lec3d";
import style from "./index.module.css";

const Canvas3d = () => {
  const elementRef = useRef(null);
  const handleMove = (e, model, speed) => {
    const p = model.position;
    const key = e.key.toLowerCase();
    switch (key) {
      case "w":
        p.z += speed;
        break;
      case "s":
        p.z -= speed;
        break;
      case "a":
        p.x += speed;
        break;
      case "d":
        p.x -= speed;
        break;
      case " ":
        p.y += speed;
        setTimeout(() => (model.position.y = 0), 1000);
        break;
      default:
        console.log(e.key);
    }
  };

  useEffect(() => {
    const { scene, renderer, camera, mountTo, refresh, addControls } =
      lec3d.init({
        axesHelperConfigs: {
          length: 10000,
        },
      });

    // 导入 GLTF 3d 模型文件
    lec3d.loadGLTF({
      modelPath: "models/human/scene.gltf",
      options: {
        position: {},
        rotation: {},
      },
      callback: (gltf, model) => {
        // 添加到场景中
        scene.add(model);
        document.addEventListener("keydown", (e: KeyboardEvent) => {
          handleMove(e, model, 10);
        });
      },
    });

    addControls();

    // 挂载到一个 DOM 元素上
    mountTo(elementRef.current);
    // 添加键盘事件监听器
  }, []);

  return (
    <>
      <div className={style["canvas-3d"]} ref={elementRef}></div>
    </>
  );
};

export default Canvas3d;
