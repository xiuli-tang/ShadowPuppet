// src/components/Stage/StageLights.jsx
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import useStore from '../../store/useStore';
import * as THREE from 'three';

/**
 * 舞台灯光系统组件
 * 管理皮影场景的光源，从 Store 读取光照参数并实时更新
 * 
 * @param {Object} props
 * @param {boolean} props.enableAnimation - 是否启用光源动画（可选）
 * @param {number} props.ambientIntensity - 环境光强度（默认 0.1）
 */
export function StageLights({
  enableAnimation = false,
  ambientIntensity = 0.1
}) {
  const pointLightRef = useRef();

  // 从 Store 读取光照参数
  const lightParams = useStore((state) => state.lightParams);

  // 实时更新光源位置和属性
  useFrame(() => {
    if (pointLightRef.current && lightParams) {
      // 更新光源位置（从 Store）
      const pos = lightParams.position || new THREE.Vector3(0, 5, -10);
      if (pos instanceof THREE.Vector3) {
        pointLightRef.current.position.copy(pos);
      } else {
        pointLightRef.current.position.set(
          pos?.x ?? 0,
          pos?.y ?? 5,
          pos?.z ?? -10
        );
      }

      // 更新光源颜色
      const color = lightParams.color || '#fffef5';
      if (color instanceof THREE.Color) {
        pointLightRef.current.color.copy(color);
      } else {
        pointLightRef.current.color.set(color);
      }

      // 更新光强
      pointLightRef.current.intensity = lightParams.intensity ?? 5.0;

      // 可选：添加轻微的动画效果（模拟油灯摇曳）
      if (enableAnimation) {
        const time = Date.now() * 0.001;
        pointLightRef.current.position.x += Math.sin(time * 0.5) * 0.1;
        pointLightRef.current.position.y += Math.cos(time * 0.7) * 0.1;
      }
    }
  });

  return (
    <>
      {/* 环境光：降低环境光强度，让主光源效果更明显 */}
      <ambientLight intensity={ambientIntensity * 1.5} />

      {/* 主光源：点光源，模拟皮影戏的强光油灯 - 极致背光效果 */}
      <pointLight
        ref={pointLightRef}
        position={[
          lightParams?.position?.x ?? 0,
          lightParams?.position?.y ?? 2,
          lightParams?.position?.z ?? -6
        ]}
        intensity={lightParams?.intensity ?? 8.0}
        color={lightParams?.color || '#fffef5'}
        distance={250}
        decay={1.0}
        castShadow={true}
      />

      {/* 背景强光：从后方补光，暖白色光源透过幕布 */}
      <pointLight
        position={[0, 0, -10]}
        intensity={6.0}
        color="#fffef5"  // 更白的暖白色，避免过度偏黄
        distance={200}
        decay={1.0}
      />

      {/* 中心强光：在皮影正后方，暖白色光源 */}
      <pointLight
        position={[0, 1, -4]}
        intensity={5.0}
        color="#fffef5"  // 更白的暖白色，避免过度偏黄
        distance={150}
        decay={1.2}
      />
    </>
  );
}
