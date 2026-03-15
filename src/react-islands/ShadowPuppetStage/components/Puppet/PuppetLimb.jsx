import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useShadowMaterial } from '../../hooks/useShadowMaterial';
import { usePuppetControl } from '../../hooks/usePuppetControl';
import useStore from '../../store/useStore';
import * as THREE from 'three';

export function PuppetLimb({
  scale = 1,
  pivotPoint = [0, 0, 0],
  textureUrl,
  thicknessUrl,
  partName,
  materialOptions = {},
  position = [0, 0, 0],
  children,
  ikTarget = null,
}) {
  const groupRef = useRef();

  const rotation = useStore((state) =>
    partName ? state.puppetState[partName]?.rotation : { x: 0, y: 0, z: 0 }
  );
  const viewLocked = useStore((state) => state.viewLocked);

  const dragBind = usePuppetControl(partName);
  const ikBind = usePuppetControl(ikTarget);

  const materialProps = useShadowMaterial(textureUrl, thicknessUrl, materialOptions);

  const tex = materialProps?.tDiffuse;
  const img = tex?.image;
  let width = scale;
  let height = scale;

  if (img && img.width && img.height) {
    const w = img.width;
    const h = img.height;
    const max = Math.max(w, h);
    width = scale * (w / max);
    height = scale * (h / max);
  }

  const offsetX = -pivotPoint[0] * width;
  const offsetY = -pivotPoint[1] * height;
  const offsetZ = -pivotPoint[2] || 0;

  useFrame(() => {
    if (groupRef.current && rotation) {
      const targetZ = rotation.z || 0;
      const currentZ = groupRef.current.rotation.z;
      groupRef.current.rotation.z += (targetZ - currentZ) * 0.2;
      groupRef.current.rotation.x = rotation.x || 0;
      groupRef.current.rotation.y = rotation.y || 0;
    }
  });

  const isReady = materialProps && materialProps.tDiffuse && materialProps.tThickness;

  return (
    <group position={position}>
      <group ref={groupRef}>
        <mesh
          position={[offsetX, offsetY, offsetZ]}
          {...(partName && viewLocked ? { ...dragBind, cursor: 'grab' } : {})}
        >
          <planeGeometry args={[width, height]} />
          {isReady ? (
            <shadowPuppetMaterial {...materialProps} transparent side={THREE.DoubleSide} />
          ) : (
            <meshBasicMaterial color="#666" transparent opacity={0.5} side={THREE.DoubleSide} />
          )}
        </mesh>

        {children}

        {ikTarget && viewLocked && (
          <mesh
            position={[offsetX, offsetY - height * 0.5, offsetZ + 0.05]}
            {...ikBind}
            cursor="move"
          >
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial
              color={ikTarget.includes('Hand') ? '#ff6b6b' : '#4ecdc4'}
              transparent
              opacity={0.9}
            />
          </mesh>
        )}
      </group>
    </group>
  );
}

export default PuppetLimb;