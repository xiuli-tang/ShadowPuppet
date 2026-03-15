import React from 'react';
import { PuppetLimb } from './PuppetLimb';
import { puppetParts, ROOT_PART_NAME } from '../../data/puppetData';
import * as THREE from 'three';

const defaultMaterialOptions = {
  uColor: new THREE.Color('#ffcc99'),
  uWrap: 0.5,
  uDensity: 0.3,
  uThicknessPower: 3.0,
  uNoiseStrength: 0.15,
};

const ikTargetMap = {
  leftArmLower: 'leftHandIK',
  rightArmLower: 'rightHandIK',
  leftLegLower: 'leftFootIK',
  rightLegLower: 'rightFootIK',
};

function LimbWithChildren({ partKey, materialOptions }) {
  const config = puppetParts[partKey];
  if (!config) {
    console.error(`Missing config for: ${partKey}`);
    return null;
  }

  const pivotPoint = Array.isArray(config.pivotPoint)
    ? config.pivotPoint.length >= 3
      ? config.pivotPoint
      : [config.pivotPoint[0], config.pivotPoint[1], 0]
    : [0.5, 0.5, 0];

  const ikTarget = ikTargetMap[partKey] || null;

  return (
    <group position={config.position}>
      <PuppetLimb
        scale={config.scale ?? 1}
        pivotPoint={pivotPoint}
        textureUrl={config.textureUrl}
        thicknessUrl={config.thicknessUrl}
        partName={config.partName}
        materialOptions={materialOptions ?? defaultMaterialOptions}
        position={[0, 0, 0]}
        ikTarget={ikTarget}
      >
        {config.children?.map((childKey) => (
          <LimbWithChildren key={childKey} partKey={childKey} materialOptions={materialOptions} />
        ))}
      </PuppetLimb>
    </group>
  );
}

export function PuppetRoot({ position = [0, 0, -2], materialOptions = defaultMaterialOptions }) {
  const rootConfig = puppetParts[ROOT_PART_NAME];
  if (!rootConfig) return null;

  const rootPivot = Array.isArray(rootConfig.pivotPoint)
    ? rootConfig.pivotPoint.length >= 3
      ? rootConfig.pivotPoint
      : [rootConfig.pivotPoint[0], rootConfig.pivotPoint[1], 0]
    : [0.5, 0.5, 0];

  const rootScale = 5;
  const assemblyOrigin = [0, 2, 0];

  return (
    <group position={position} renderOrder={0}>
      <group position={assemblyOrigin} scale={[rootScale, rootScale, rootScale]}>
        <group position={rootConfig.position}>
          <PuppetLimb
            scale={rootConfig.scale ?? 1}
            pivotPoint={rootPivot}
            textureUrl={rootConfig.textureUrl}
            thicknessUrl={rootConfig.thicknessUrl}
            partName={rootConfig.partName}
            materialOptions={materialOptions}
            position={[0, 0, 0]}
          />
        </group>

        {rootConfig.children?.map((childKey) => (
          <LimbWithChildren key={childKey} partKey={childKey} materialOptions={materialOptions} />
        ))}
      </group>
    </group>
  );
}

export default PuppetRoot;