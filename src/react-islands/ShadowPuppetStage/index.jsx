import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { StageLights } from './components/Stage/StageLights';
import { Backdrop } from './components/Stage/Backdrop';
import PuppetRoot from './components/Puppet/PuppetRoot';
import './ShadowPuppetMaterial';
import './components/Stage/ScreenMaterial';
import * as THREE from 'three';
import useStore from './store/useStore';
import { useActionPlayer } from './hooks/useIKSystem';

export default function ShadowPuppetStage() {
  const [currentAction, setCurrentAction] = useState(null);

  const { playAction, stopAction, ACTION_LIBRARY } = useActionPlayer();

  const handlePlayAction = (actionName) => {
    if (currentAction === actionName) {
      stopAction();
      setCurrentAction(null);
    } else {
      playAction(actionName, () => setCurrentAction(null));
      setCurrentAction(actionName);
    }
  };

  const actions = [
    { key: 'walk', label: '行走', icon: '🚶' },
    { key: 'greet', label: '打招呼', icon: '👋' },
    { key: 'cheer', label: '欢呼', icon: '🎉' },
    { key: 'nod', label: '点头', icon: '✅' },
    { key: 'shakeHead', label: '摇头', icon: '❌' },
    { key: 'point', label: '指向', icon: '👉' },
    { key: 'stepBack', label: '后退', icon: '🔙' },
  ];

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#000', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
      <Canvas
        camera={{
          position: [0, 1, 14], // 固定最佳观演位置 (稍微拉远)
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
        shadows
        gl={{
          antialias: true,
          toneMappingExposure: 1.2,
          alpha: false,
          premultipliedAlpha: false
        }}
      >
        <StageLights enableAnimation={false} ambientIntensity={0.02} />
        <Backdrop width={40} height={32} position={[0, 0, 0]} opacity={0.80} />
        <PuppetRoot
          position={[0, -2, -2]} // 向下移动以显示全身
          scale={[0.8, 0.8, 0.8]} // 稍微缩小一点
          materialOptions={{
            uColor: new THREE.Color('#ffcc99'),
            uWrap: 0.5,
            uDensity: 0.3,
            uThicknessPower: 3.0,
            uNoiseStrength: 0.15,
          }}
        />
      </Canvas>

      {/* 底部居中动作预设按钮 */}
      <div style={{
        position: 'absolute',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '12px',
        zIndex: 10,
        background: 'rgba(0,0,0,0.6)',
        padding: '12px 24px',
        borderRadius: '24px',
        backdropFilter: 'blur(4px)'
      }}>
        <div style={{ marginRight: 12, color: '#fff', fontSize: 14, alignSelf: 'center', fontWeight: 'bold' }}>🎭 动作库</div>
        {actions.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => handlePlayAction(key)}
            style={{
              padding: '8px 16px',
              fontSize: 14,
              background: currentAction === key ? '#4ecdc4' : 'rgba(255,255,255,0.2)',
              color: '#fff',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.2s ease',
              outline: 'none',
            }}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
