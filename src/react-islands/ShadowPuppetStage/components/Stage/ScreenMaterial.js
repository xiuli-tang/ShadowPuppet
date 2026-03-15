// src/components/Stage/ScreenMaterial.js
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

/**
 * 透光幕布材质
 * 模拟非常薄的、透光的布，观众透过它观看皮影
 */
const ScreenMaterial = shaderMaterial(
  {
    uOpacity: 0.85,  // 幕布不透明度（0.85 = 85%不透明，15%透明）
    uBlur: 0.02,     // 轻微模糊效果（模拟布的质感）
    uLightPos: new THREE.Vector3(0, 2, -6), // 光源位置
    uLightColor: new THREE.Color('#fff5e1'), // 光源颜色
    uLightIntensity: 2.0, // 光源强度（提高，让幕布后面的点光源更明显）
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vWorldPosition;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment Shader
  `
    uniform float uOpacity;
    uniform float uBlur;
    uniform vec3 uLightPos;
    uniform vec3 uLightColor;
    uniform float uLightIntensity;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vWorldPosition;

    // 简单的噪声函数（模拟布的纹理）
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      // 幕布本身不发光，只有被后方的点光源照射到的部分才亮暗黄光
      
      // 计算光源方向（从幕布指向光源）
      vec3 L = normalize(uLightPos - vWorldPosition);
      vec3 N = normalize(vNormal);
      
      // 计算光照强度（点光源衰减）
      float dist = length(uLightPos - vWorldPosition);
      float attenuation = 1.0 / (1.0 + 0.1 * dist + 0.01 * dist * dist); // 降低距离衰减，让光源影响范围更大
      
      // 计算光照角度（法线朝向光源的部分）
      // 注意：幕布是双面的，需要考虑两个方向
      float lightDot = max(0.0, dot(N, L));
      float lightDotBack = max(0.0, dot(-N, L)); // 背面也可能被照射
      float lightDotCombined = max(lightDot, lightDotBack * 0.3); // 背面光照较弱
      
      // 只有被光源照射到的部分才亮，其他部分几乎不亮
      float lightFactor = lightDotCombined * attenuation * uLightIntensity;
      
      // 模拟布的轻微纹理
      float fabricNoise = random(vUv * 50.0) * 0.01;
      
      // 计算最终不透明度（幕布是半透明的，让后面的光透过来）
      float finalOpacity = uOpacity + fabricNoise * 0.03;
      finalOpacity = clamp(finalOpacity, 0.70, 0.85);
      
      // 幕布基础颜色 - 非常暗，几乎不发光（接近黑色）
      vec3 baseColor = vec3(0.02, 0.02, 0.02); // 非常暗的基础色
      
      // 只有被光源照射到的部分才显示暗黄光
      // 暗黄色：稍微亮一点，让点光源更明显
      vec3 litColor = vec3(0.35, 0.30, 0.20); // 稍微亮一点的暗黄色
      
      // 混合基础色和光照色，根据光照强度
      // 使用平滑过渡，让光照效果更自然
      float lightMix = smoothstep(0.0, 0.4, lightFactor); // 降低阈值，让光照更明显
      vec3 fabricColor = mix(baseColor, litColor, lightMix * 0.9); // 提高光照混合权重，让点光源更明显
      
      // 应用光源颜色（暖白色），增强
      vec3 lightTint = mix(vec3(1.0), uLightColor.rgb, 0.5); // 增强光源颜色影响
      fabricColor = fabricColor * mix(vec3(1.0), lightTint, lightMix * 0.7); // 增强光源颜色混合
      
      // 提高最大亮度限制，让点光源更明显
      fabricColor = clamp(fabricColor, vec3(0.0), vec3(0.45)); // 提高最大亮度
      
      // 输出 - 幕布本身几乎不发光，只有被光源照射到的部分才亮暗黄光
      gl_FragColor = vec4(fabricColor, finalOpacity);
    }
  `
);

extend({ ScreenMaterial });
export { ScreenMaterial };
