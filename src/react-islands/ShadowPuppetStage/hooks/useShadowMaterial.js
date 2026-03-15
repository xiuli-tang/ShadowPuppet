// src/hooks/useShadowMaterial.js
import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import useStore from '../store/useStore';
import * as THREE from 'three';

/**
 * 皮影材质 Hook
 * 封装 ShadowPuppetMaterial，自动从 Store 读取光照参数并绑定
 * 
 * @param {string} textureUrl - 漫反射贴图路径（彩图）
 * @param {string} thicknessUrl - 厚度贴图路径
 * @param {Object} options - 可选的自定义参数
 * @param {THREE.Color|string} options.uColor - 材质底色（默认 #ffcc99）
 * @param {number} options.uWrap - 光线包裹系数（默认 0.5）
 * @param {number} options.uDensity - 材质密度（默认 3.0）
 * @param {number} options.uThicknessPower - 厚度衰减指数（默认 5.0）
 * @param {number} options.uNoiseStrength - 噪点强度，模拟牛皮颗粒感（默认 0.15）
 * @returns {Object} 材质属性对象，可直接传递给 shadowPuppetMaterial 组件
 */
export function useShadowMaterial(textureUrl, thicknessUrl, options = {}) {
  // 从 Store 读取光照参数
  const lightParams = useStore((state) => state.lightParams);

  // 加载纹理（useTexture 会自动处理加载状态）
  // 注意：useTexture 返回的数组在纹理加载完成前可能包含 null
  const textures = useTexture([textureUrl, thicknessUrl]);
  const [diffuse, thickness] = textures;

  // 合并选项，允许覆盖默认值
  const {
    uColor = new THREE.Color('#ffcc99'),
    uWrap = 0.5,
    uDensity = 3.0,
    uThicknessPower = 5.0,
    uNoiseStrength = 0.15,
  } = options;

  // 使用 useMemo 优化，避免每次渲染都创建新对象
  const materialProps = useMemo(() => {
    // 确保 uColor 是 THREE.Color 实例
    const color = uColor instanceof THREE.Color 
      ? uColor.clone() 
      : new THREE.Color(uColor);

    // 从 Store 获取光源颜色，如果没有则使用默认值（更白的暖白色，避免过度偏黄）
    const lightColor = lightParams.color instanceof THREE.Color
      ? lightParams.color.clone()
      : new THREE.Color(lightParams.color || '#fffef5');

    // 从 Store 获取光源位置
    const lightPos = lightParams.position instanceof THREE.Vector3
      ? lightParams.position.clone()
      : new THREE.Vector3(
          lightParams.position?.x ?? 0,
          lightParams.position?.y ?? 2,
          lightParams.position?.z ?? -6
        );

    return {
      tDiffuse: diffuse,
      tThickness: thickness,
      uColor: color,
      uLightColor: lightColor,
      uLightPos: lightPos,
      uWrap,
      uDensity,
      uThicknessPower,
      uNoiseStrength,
      transparent: true,
      side: THREE.DoubleSide,
    };
  }, [
    diffuse,
    thickness,
    uColor,
    uWrap,
    uDensity,
    uThicknessPower,
    uNoiseStrength,
    lightParams,
  ]);

  // 返回材质属性对象
  return materialProps;
}
