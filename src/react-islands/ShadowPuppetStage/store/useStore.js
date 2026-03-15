import { create } from 'zustand';
import * as THREE from 'three';

const useStore = create((set, get) => ({
  // 视角锁定
  viewLocked: false,
  setViewLocked: (locked) => set({ viewLocked: locked }),
  
  // 皮影状态
  puppetState: {
    torso: { rotation: { x: 0, y: 0, z: 0 }, position: { x: 0, y: 0, z: 0 } },
    head: { rotation: { x: 0, y: 0, z: 0 }, position: { x: 0, y: 0, z: 0 } },
    leftArmUpper: { rotation: { x: 0, y: 0, z: 0 }, position: { x: 0, y: 0, z: 0 } },
    leftArmLower: { rotation: { x: 0, y: 0, z: 0 }, position: { x: 0, y: 0, z: 0 } },
    rightArmUpper: { rotation: { x: 0, y: 0, z: 0 }, position: { x: 0, y: 0, z: 0 } },
    rightArmLower: { rotation: { x: 0, y: 0, z: 0 }, position: { x: 0, y: 0, z: 0 } },
    leftLegUpper: { rotation: { x: 0, y: 0, z: 0 }, position: { x: 0, y: 0, z: 0 } },
    leftLegLower: { rotation: { x: 0, y: 0, z: 0 }, position: { x: 0, y: 0, z: 0 } },
    rightLegUpper: { rotation: { x: 0, y: 0, z: 0 }, position: { x: 0, y: 0, z: 0 } },
    rightLegLower: { rotation: { x: 0, y: 0, z: 0 }, position: { x: 0, y: 0, z: 0 } },
  },
  
  // 设置关节旋转
  setJointRotation: (partName, rotation) => set((state) => ({
    puppetState: {
      ...state.puppetState,
      [partName]: {
        ...state.puppetState[partName],
        rotation: {
          ...state.puppetState[partName]?.rotation,
          ...rotation,
        },
      },
    },
  })),
  
  // 光照参数
  lightParams: {
    position: new THREE.Vector3(0, 2, -6),
    color: new THREE.Color('#fffef5'),
    intensity: 2.0,
  },
  setLightParams: (params) => set((state) => ({
    lightParams: { ...state.lightParams, ...params },
  })),
}));

export default useStore;