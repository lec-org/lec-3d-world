import { useEffect, useRef, useState } from "react";
import lec3d from "@trickle/lec3d";
import style from "./index.module.css";

const Canvas3d = () => {
  const elementRef = useRef(null);
  const handleMove = (e, target) => {
    const p = target.position;
    switch (e.key) {
      case "w":
        p.x++;
        break;
      case "s":
        break;
      case "a":
        break;
      case "d":
        break;
    }
  };

  useEffect(() => {
    const { scene, renderer, camera, mountTo, refresh, addControls } =
      lec3d.init({
        axesHelperConfigs: {
          length: 10000,
        },
      });

    // 添加鼠标控制，缩放、旋转等
    addControls();

    // 导入 GLTF 3d 模型文件
    lec3d.loadGLTF({
      modelPath: "models/human/scene.gltf",
      options: {
        position: {
          x: 1,
          y: 1,
          z: 1,
        },
        rotation: {},
      },
      callback: (gltf, model) => {
        // 添加到场景中
        scene.add(model, model);
        document.addEventListener("keydown", (e) => {
          handleMove(e, model);
        });
      },
    });

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
