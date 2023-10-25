import { useEffect, useRef } from "react";
import lec3d from "@trickle/lec3d";
import style from "./index.module.css";

const Canvas3d = () => {
  const elementRef = useRef(null);

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
          x: -200,
        },
        rotation: {},
      },
      callback: (gltf, model) => {
        // 添加到场景中
        scene.add(model);
      },
    });

    // 挂载到一个 DOM 元素上
    mountTo(elementRef.current);
  }, []);

  return (
    <>
      <div className={style["canvas-3d"]} ref={elementRef}></div>
    </>
  );
};

export default Canvas3d;
