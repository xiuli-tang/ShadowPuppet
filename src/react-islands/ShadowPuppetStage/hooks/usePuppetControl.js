import { useRef, useCallback } from 'react';
import useStore from '../store/useStore';

const CONSTRAINTS = {
  head: { min: -0.8, max: 0.8 },
  leftArmUpper: { min: -2.6, max: 1.0 },
  leftArmLower: { min: -0.2, max: 2.6 },
  rightArmUpper: { min: -1.0, max: 2.6 },
  rightArmLower: { min: -2.6, max: 0.2 },
  leftLegUpper: { min: -2.0, max: 0.8 },
  leftLegLower: { min: 0, max: 2.6 },
  rightLegUpper: { min: -0.8, max: 2.0 },
  rightLegLower: { min: -2.6, max: 0 },
  torso: { min: -0.5, max: 0.5 },
};

const IK_CHAINS = {
  leftHandIK: ['leftArmUpper', 'leftArmLower'],
  rightHandIK: ['rightArmUpper', 'rightArmLower'],
  leftFootIK: ['leftLegUpper', 'leftLegLower'],
  rightFootIK: ['rightLegUpper', 'rightLegLower'],
};

export function usePuppetControl(partName) {
  const setJointRotation = useStore(state => state.setJointRotation);
  const puppetState = useStore(state => state.puppetState);

  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    startZ: 0,
    chain: null,
  });

  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
  const isIK = partName?.endsWith('IK');
  const chain = isIK ? IK_CHAINS[partName] : null;

  const handlePointerDown = useCallback((e) => {
    e.stopPropagation();
    if (e.pointerType === 'mouse') e.target.setPointerCapture(e.pointerId);

    if (isIK && chain) {
      dragRef.current = {
        isDragging: true,
        startX: e.pointer.x,
        startY: e.pointer.y,
        startZ: 0,
        chain: chain,
      };
      return;
    }

    const rot = puppetState[partName]?.rotation ?? { x: 0, y: 0, z: 0 };
    dragRef.current = {
      isDragging: true,
      startX: e.pointer.x,
      startY: e.pointer.y,
      startZ: rot.z ?? 0,
      chain: null,
    };
  }, [partName, isIK, chain, puppetState]);

  const handlePointerMove = useCallback((e) => {
    if (!dragRef.current.isDragging) return;

    const { startX, startY, startZ, chain } = dragRef.current;
    const deltaX = e.pointer.x - startX;
    const deltaY = e.pointer.y - startY;

    if (isIK && chain) {
      // 关键修复：提高灵敏度！原来是0.02，现在0.08（4倍）
      const sensitivity = 0.08;
      const targetAngle = (deltaX + deltaY) * sensitivity;

      const upper = chain[0];
      const lower = chain[1];

      const c1 = CONSTRAINTS[upper];
      const c2 = CONSTRAINTS[lower];

      // 大臂/大腿承担主要旋转
      let upperAngle = targetAngle * 0.7;
      if (c1) upperAngle = clamp(upperAngle, c1.min, c1.max);

      // 小臂/小腿跟随弯曲，幅度更大
      let lowerAngle;
      if (partName.includes('Hand')) {
        // 手臂：肘关节向内弯曲
        lowerAngle = -Math.abs(targetAngle * 0.8);
        if (partName.includes('left')) lowerAngle = -lowerAngle; // 左手镜像
      } else {
        // 腿部：膝盖向后弯曲
        lowerAngle = Math.abs(targetAngle * 0.6);
      }
      if (c2) lowerAngle = clamp(lowerAngle, c2.min, c2.max);

      setJointRotation(upper, { z: upperAngle });
      setJointRotation(lower, { z: lowerAngle });

    } else {
      // FK灵敏度也提高
      const sensitivity = 0.03;
      const rawAngle = startZ + deltaX * sensitivity;
      const c = CONSTRAINTS[partName];
      const constrainedAngle = c ? clamp(rawAngle, c.min, c.max) : rawAngle;
      setJointRotation(partName, { z: constrainedAngle });
    }
  }, [partName, isIK, setJointRotation]);

  const handlePointerUp = useCallback((e) => {
    if (e.pointerType === 'mouse') e.target.releasePointerCapture(e.pointerId);
    dragRef.current.isDragging = false;
  }, []);

  const handlePointerLeave = useCallback((e) => {
    if (!dragRef.current.isDragging) return;
    e.target.releasePointerCapture?.(e.pointerId);
    dragRef.current.isDragging = false;
  }, []);

  if (!partName) return {};

  return {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
    onPointerLeave: handlePointerLeave,
  };
}

export default usePuppetControl;