// src/components/Stage/Backdrop.jsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useStore from '../../store/useStore';
// 确保 ScreenMaterial 被导入并注册
import './ScreenMaterial';

/**
 * 透光幕布组件
 * 模拟非常薄的、透光的布，观众透过它观看皮影
 * 
 * 场景层次（从观众到光源）：
 * 1. 观众（相机）在 z > 0
 * 2. 幕布在 z = 0（中间）
 * 3. 皮影在 z < 0（幕布后面）
 * 4. 光源在 z << 0（皮影后面）
 * 
 * @param {Object} props
 * @param {number} props.width - 幕布宽度（默认 40）
 * @param {number} props.height - 幕布高度（默认 32）
 * @param {number} props.opacity - 幕布不透明度（默认 0.85，15%透明）
 * @param {Array<number>} props.position - 幕布位置 [x, y, z]（默认 [0, 0, 0]）
 */
export function Backdrop({
  width = 40,
  height = 32,
  opacity = 0.85,
  position = [0, 0, 0],
}) {
  const meshRef = useRef();

  // 从 Store 读取光照参数
  const lightParams = useStore((state) => state.lightParams);

  // 可选：添加轻微的动画效果（模拟幕布轻微摆动）
  useFrame((state) => {
    if (meshRef.current) {
      // 非常轻微的摆动，模拟布的柔软
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.005;
    }
  });

  // 获取光源参数
  const lightPos = lightParams.position instanceof THREE.Vector3
    ? lightParams.position.clone()
    : new THREE.Vector3(
      lightParams.position?.x ?? 0,
      lightParams.position?.y ?? 2,
      lightParams.position?.z ?? -6
    );

  const lightColor = lightParams.color instanceof THREE.Color
    ? lightParams.color.clone()
    : new THREE.Color(lightParams.color || '#fff5e1');

  const lightIntensity = lightParams.intensity || 2.0;

  return (
    <mesh
      ref={meshRef}
      position={position}
      renderOrder={1}  // 确保幕布在皮影前面渲染
    >
      <planeGeometry args={[width, height]} />
      <screenMaterial
        uOpacity={opacity}
        uBlur={0.02}
        uLightPos={lightPos}
        uLightColor={lightColor}
        uLightIntensity={lightIntensity}
        transparent={true}
        side={THREE.DoubleSide}
        depthWrite={false}  // 允许透过幕布看到后面的皮影
      // 幕布本身不发光，只有被后方的点光源照射到的部分才亮暗黄光
      />
    </mesh>
  );
}

// 添加默认导出，确保兼容性
export default Backdrop;
