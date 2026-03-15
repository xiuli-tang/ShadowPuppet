// src/ShadowPuppetMaterial.js
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

/**
 * 智赋千影专用材质
 * 实现次表面散射 (SSS)、包裹光照 (Wrap Lighting) 和菲涅尔边缘光
 */
const ShadowPuppetMaterial = shaderMaterial(
  {
    tDiffuse: null,
    tThickness: null,
    uLightPos: new THREE.Vector3(0, 5, -10),

    uColor: new THREE.Color('#ffcc99'),
    uLightColor: new THREE.Color('#fffef5'),
    uSSSColor: new THREE.Color('#ff4400'), // 次表面散射光晕色 (红橙色)

    uWrap: 0.6,            // 包裹光系数：模拟光线绕过半透明物体的温润感
    uThicknessPower: 2.5,  // 透光集中度：控制背光光斑的锐利程度
    uDensity: 0.25,        // 材质密度：控制光线穿透皮革的深度
    uNoiseStrength: 0.12,  // 纤维纹理强度：模拟牛皮内部的不均匀纤维
    uFresnel: 0.3          // 边缘光强度：增强轮廓感
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewPosition;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment Shader
  `
    uniform sampler2D tDiffuse;
    uniform sampler2D tThickness;
    uniform vec3 uLightPos;
    uniform vec3 uColor;
    uniform vec3 uLightColor;
    uniform vec3 uSSSColor;
    uniform float uWrap;
    uniform float uThicknessPower;
    uniform float uDensity;
    uniform float uNoiseStrength;
    uniform float uFresnel;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewPosition;

    // 伪随机函数，用于模拟纤维噪声
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    // 计算亮度
    float getLuminance(vec3 color) {
        return dot(color, vec3(0.299, 0.587, 0.114));
    }

    void main() {
      // 1. 基础纹理采样
      vec4 texColor = texture2D(tDiffuse, vUv);
      if (texColor.a < 0.1) discard; // 丢弃完全透明区域
      
      float thicknessMap = texture2D(tThickness, vUv).r;
      float luminance = getLuminance(texColor.rgb);

      // 2. 核心向量计算
      vec3 V = normalize(vViewPosition); 
      vec3 L = normalize(uLightPos - vWorldPosition); 
      vec3 N = normalize(vNormal);

      // 3. 改进的包裹漫反射 (Wrap Lighting)
      // 模拟光线在微观层面的散射，让皮影即使在侧光下也显得通透不僵硬
      float wrapNDotL = max(0.0, (dot(N, L) + uWrap) / ((1.0 + uWrap) * (1.0 + uWrap)));
      
      // 4. 核心透射计算 (Transmission)
      // 计算背光因子：观众视线越接近光轴，透光越强
      float backlightFactor = max(0.0, dot(V, -L));
      backlightFactor = pow(backlightFactor, uThicknessPower);

      // 模拟牛皮纤维噪声，增加有机感
      float noise = random(vUv * 150.0);
      float effectiveThickness = mix(thicknessMap, noise, uNoiseStrength);
      
      // 基于 Beer's Law (贝尔定律) 模拟透光衰减
      float transmission = exp(-effectiveThickness * uDensity * 8.0);
      
      // 蒙版处理：黑色勾线（Ink）部分由于含碳量高，透光极弱
      float translucencyMask = mix(0.02, 1.0, smoothstep(0.1, 0.4, luminance));

      // 5. 次表面散射色偏 (SSS Color Shift)
      // 模拟光线在牛皮内部多次散射后，短波光被吸收，长波(红/橙)光透出的效果
      vec3 sssShift = mix(uSSSColor, uLightColor, transmission);
      
      // 计算透射贡献
      vec3 transmittedLight = sssShift * texColor.rgb * backlightFactor * translucencyMask * transmission * 6.0;

      // 6. 菲涅尔边缘光 (Fresnel Rim)
      // 增强轮廓感，模拟光线在半透明边缘的聚集
      float fresnel = pow(1.0 - max(0.0, dot(N, V)), 3.0) * uFresnel;
      vec3 fresnelLight = uLightColor * fresnel * translucencyMask;

      // 7. 最终合成
      // 基础漫反射(表面感) + 核心透射(通透感) + 边缘光(轮廓感)
      vec3 baseDiffuse = uColor * texColor.rgb * wrapNDotL * 0.15;
      vec3 finalColor = baseDiffuse + transmittedLight + fresnelLight;

      // 动态色彩平衡：在强光处稍微增加饱和度
      finalColor = mix(finalColor, finalColor * 1.1, backlightFactor * 0.5);
      
      // 保持原始 Alpha
      vec4 outputColor = vec4(finalColor, texColor.a);
      
      // 伽马校正：确保色彩在不同显示器上的表现一致且物理正确
      outputColor.rgb = pow(outputColor.rgb, vec3(1.0/2.2));
      
      gl_FragColor = outputColor;
    }
  `
);

extend({ ShadowPuppetMaterial });
export { ShadowPuppetMaterial };