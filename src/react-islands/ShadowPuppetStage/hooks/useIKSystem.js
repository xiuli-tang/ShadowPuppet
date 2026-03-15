import { useRef, useCallback } from 'react';
import useStore from '../store/useStore';

/**
 * 连贯动作库
 */

// 肢体约束（角度限制和阻尼）
const CONSTRAINTS = {
  head: { min: -0.6, max: 0.6, damping: 0.8 },
  leftArmUpper: { min: -2.8, max: 0.8, damping: 0.9 },
  leftArmLower: { min: -0.1, max: 2.8, damping: 0.85 },
  rightArmUpper: { min: -2.8, max: 0.8, damping: 0.9 },
  rightArmLower: { min: -2.8, max: 0.1, damping: 0.85 },
  leftLegUpper: { min: -2.2, max: 0.9, damping: 0.9 },
  leftLegLower: { min: 0, max: 2.8, damping: 0.85 },
  rightLegUpper: { min: -0.9, max: 2.2, damping: 0.9 },
  rightLegLower: { min: -2.8, max: 0, damping: 0.85 },
  torso: { min: -0.4, max: 0.4, damping: 0.95 }
};

// 动作库
export const ACTION_LIBRARY = {
  // 行走 - 腿部保持连贯，几乎伸直的小幅度行走
  walk: {
    duration: 2000,
    loop: true,
    keyframes: [
      {
        time: 0,
        joints: {
          // 右腿向前（大腿微抬，小腿几乎伸直跟随）
          rightLegUpper: { z: 0.15 }, rightLegLower: { z: 0.15 },
          // 左腿向后支撑（大腿微摆，小腿伸直）
          leftLegUpper: { z: -0.12 }, leftLegLower: { z: 0.05 },

          // 手臂小幅度摆动
          leftArmUpper: { z: 0.15 }, leftArmLower: { z: -0.1 },
          rightArmUpper: { z: -0.15 }, rightArmLower: { z: 0.1 },

          // 躯干微动
          torso: { z: 0.015, y: 0 },
          head: { z: 0.005 }
        }
      },
      {
        time: 0.25,
        joints: {
          // 双腿直立并拢
          rightLegUpper: { z: 0.03 }, rightLegLower: { z: 0.08 },
          leftLegUpper: { z: -0.03 }, leftLegLower: { z: 0.08 },

          // 双臂下垂
          leftArmUpper: { z: 0.03 }, leftArmLower: { z: -0.05 },
          rightArmUpper: { z: -0.03 }, rightArmLower: { z: 0.05 },

          torso: { z: 0, y: 0.005 },
          head: { z: 0 }
        }
      },
      {
        time: 0.5,
        joints: {
          // 左腿向前（大腿微抬，小腿几乎伸直跟随）
          leftLegUpper: { z: 0.15 }, leftLegLower: { z: 0.15 },
          // 右腿向后支撑
          rightLegUpper: { z: -0.12 }, rightLegLower: { z: 0.05 },

          // 手臂反向摆动
          rightArmUpper: { z: 0.15 }, rightArmLower: { z: -0.1 },
          leftArmUpper: { z: -0.15 }, leftArmLower: { z: 0.1 },

          torso: { z: -0.015, y: 0 },
          head: { z: -0.005 }
        }
      },
      {
        time: 0.75,
        joints: {
          // 双腿直立并拢
          rightLegUpper: { z: -0.03 }, rightLegLower: { z: 0.08 },
          leftLegUpper: { z: 0.03 }, leftLegLower: { z: 0.08 },

          // 双臂下垂
          rightArmUpper: { z: 0.03 }, rightArmLower: { z: -0.05 },
          leftArmUpper: { z: -0.03 }, rightArmLower: { z: 0.05 },

          torso: { z: 0, y: 0.005 },
          head: { z: 0 }
        }
      },
      {
        time: 1,
        joints: {
          // 回到起点
          rightLegUpper: { z: 0.15 }, rightLegLower: { z: 0.15 },
          leftLegUpper: { z: -0.12 }, leftLegLower: { z: 0.05 },

          leftArmUpper: { z: 0.15 }, leftArmLower: { z: -0.1 },
          rightArmUpper: { z: -0.15 }, rightArmLower: { z: 0.1 },

          torso: { z: 0.015, y: 0 },
          head: { z: 0.005 }
        }
      }
    ]
  },

  // 打招呼 - 手臂只在身体前方挥动，保持连贯
  greet: {
    duration: 2400,
    loop: true,
    keyframes: [
      {
        time: 0,
        joints: {
          torso: { z: 0 },
          // 手臂自然下垂
          rightArmUpper: { z: 0 },
          rightArmLower: { z: 0 }
        }
      },
      {
        time: 0.3,
        joints: {
          torso: { z: 0.03 },
          // 上臂抬起（向前上方，不是向后）
          rightArmUpper: { z: -0.8 },
          // 前臂弯曲配合
          rightArmLower: { z: 0.5 }
        }
      },
      {
        time: 0.5,
        joints: {
          torso: { z: 0.05 },
          // 举高
          rightArmUpper: { z: -1.2 },
          // 前臂伸直挥手
          rightArmLower: { z: 0.2 }
        }
      },
      {
        time: 0.7,
        joints: {
          torso: { z: 0.03 },
          // 稍微降低
          rightArmUpper: { z: -1.0 },
          // 前臂弯曲
          rightArmLower: { z: 0.6 }
        }
      },
      {
        time: 0.9,
        joints: {
          torso: { z: 0.05 },
          // 再举高
          rightArmUpper: { z: -1.2 },
          // 前臂伸直
          rightArmLower: { z: 0.2 }
        }
      },
      {
        time: 1.1,
        joints: {
          torso: { z: 0.03 },
          rightArmUpper: { z: -1.0 },
          rightArmLower: { z: 0.6 }
        }
      },
      {
        time: 1.4,
        joints: {
          torso: { z: 0 },
          // 放下
          rightArmUpper: { z: 0 },
          rightArmLower: { z: 0 }
        }
      },
      {
        time: 1.6,
        joints: {
          torso: { z: 0 },
          rightArmUpper: { z: 0 },
          rightArmLower: { z: 0 }
        }
      }
    ]
  },

  // 欢呼
  cheer: {
    duration: 1800,
    loop: true,
    keyframes: [
      {
        time: 0,
        joints: {
          torso: { z: 0, y: 0 },
          leftArmUpper: { z: 0, x: 0, y: 0 }, leftArmLower: { z: 0, x: 0, y: 0 },
          rightArmUpper: { z: 0, x: 0, y: 0 }, rightArmLower: { z: 0, x: 0, y: 0 },
          leftLegUpper: { z: 0 }, leftLegLower: { z: 0 },
          rightLegUpper: { z: 0 }, rightLegLower: { z: 0 }
        }
      },
      {
        time: 0.25,
        joints: {
          torso: { z: 0.015, y: 0.008 },
          // 👇 左臂比右臂略低（z: -0.75 vs -0.9）
          leftArmUpper: { z: -0.75, x: 0.1, y: 0.05 },
          leftArmLower: { z: 0.05, x: -0.15, y: 0.05 },
          // 👉 右臂保持原高度（更高、更活跃）
          rightArmUpper: { z: -0.9, x: 0.1, y: 0.1 },
          rightArmLower: { z: 0.1, x: -0.2, y: 0.1 },
          leftLegUpper: { z: -0.05 }, leftLegLower: { z: 0.05 },
          rightLegUpper: { z: -0.05 }, rightLegLower: { z: 0.05 }
        }
      },
      {
        time: 0.5,
        joints: {
          torso: { z: -0.005, y: 0.002 },
          // 👇 左臂稍低
          leftArmUpper: { z: -0.6, x: 0.12, y: 0.1 },
          leftArmLower: { z: 0.2, x: -0.25, y: 0.15 },
          // 👉 右臂更高
          rightArmUpper: { z: -0.7, x: 0.15, y: 0.15 },
          rightArmLower: { z: 0.3, x: -0.3, y: 0.2 },
          leftLegUpper: { z: -0.02 }, leftLegLower: { z: 0.02 },
          rightLegUpper: { z: -0.02 }, rightLegLower: { z: 0.02 }
        }
      },
      {
        time: 0.75,
        joints: {
          torso: { z: 0.015, y: 0.008 },
          leftArmUpper: { z: -0.75, x: 0.1, y: 0.05 },
          leftArmLower: { z: 0.05, x: -0.15, y: 0.05 },
          rightArmUpper: { z: -0.9, x: 0.1, y: 0.1 },
          rightArmLower: { z: 0.1, x: -0.2, y: 0.1 },
          leftLegUpper: { z: -0.05 }, leftLegLower: { z: 0.05 },
          rightLegUpper: { z: -0.05 }, rightLegLower: { z: 0.05 }
        }
      },
      {
        time: 1,
        joints: {
          torso: { z: 0, y: 0 },
          leftArmUpper: { z: 0, x: 0, y: 0 }, leftArmLower: { z: 0, x: 0, y: 0 },
          rightArmUpper: { z: 0, x: 0, y: 0 }, rightArmLower: { z: 0, x: 0, y: 0 },
          leftLegUpper: { z: 0 }, leftLegLower: { z: 0 },
          rightLegUpper: { z: 0 }, rightLegLower: { z: 0 }
        }
      }
    ]
  },

  // --- 基础原子动作 ---

  // 点头 (nod)
  nod: {
    duration: 1000,
    loop: false,
    keyframes: [
      {
        time: 0,
        joints: { head: { z: 0 } }
      },
      {
        time: 0.25,
        joints: { head: { z: 0.25 } } // 向前俯
      },
      {
        time: 0.5,
        joints: { head: { z: -0.1 } } // 稍微向后仰
      },
      {
        time: 0.75,
        joints: { head: { z: 0.1 } }  // 再次向前
      },
      {
        time: 1,
        joints: { head: { z: 0 } }    // 回正
      }
    ]
  },

  // 摇头 (shakeHead)
  shakeHead: {
    duration: 1200,
    loop: false,
    keyframes: [
      {
        time: 0,
        joints: { head: { y: 0 } }   // 使用 y 轴或 x 轴扭动产生摇头的视觉效果
      },
      {
        time: 0.2,
        joints: { head: { y: 0.3, x: 0.1 } }
      },
      {
        time: 0.6,
        joints: { head: { y: -0.3, x: -0.1 } }
      },
      {
        time: 1,
        joints: { head: { y: 0.1, x: 0 } }
      },
      {
        time: 1.2,
        joints: { head: { y: 0, x: 0 } }
      }
    ]
  },

  // 指向 (point)
  point: {
    duration: 1500,
    loop: false,
    keyframes: [
      {
        time: 0,
        joints: {
          rightArmUpper: { z: 0 },
          rightArmLower: { z: 0 }
        }
      },
      {
        time: 0.4,
        joints: {
          rightArmUpper: { z: -1.2 }, // 抬起手臂
          rightArmLower: { z: 0.1 }   // 伸直前臂
        }
      },
      {
        time: 1.2,
        joints: {
          // 保持指向
          rightArmUpper: { z: -1.2 },
          rightArmLower: { z: 0.1 }
        }
      },
      {
        time: 1.5,
        joints: {
          // 放下
          rightArmUpper: { z: 0 },
          rightArmLower: { z: 0 }
        }
      }
    ]
  },

  // 后退 (stepBack)
  stepBack: {
    duration: 1200,
    loop: false,
    keyframes: [
      {
        time: 0,
        joints: {
          torso: { z: 0, y: 0 },
          leftLegUpper: { z: 0 }, leftLegLower: { z: 0 },
          rightLegUpper: { z: 0 }, rightLegLower: { z: 0 }
        }
      },
      {
        time: 0.3,
        joints: {
          // 身体后仰，左腿向后撤
          torso: { z: -0.1, y: 0.05 },
          leftLegUpper: { z: -0.4 }, leftLegLower: { z: 0.2 },
          rightLegUpper: { z: 0.1 }, rightLegLower: { z: 0.1 } // 右腿支撑
        }
      },
      {
        time: 0.6,
        joints: {
          // 左腿落地，右腿向后撤
          torso: { z: -0.15, y: 0.1 },
          leftLegUpper: { z: -0.2 }, leftLegLower: { z: 0.1 },
          rightLegUpper: { z: -0.3 }, rightLegLower: { z: 0.2 }
        }
      },
      {
        time: 1.2,
        joints: {
          // 恢复直立
          torso: { z: 0, y: 0 },
          leftLegUpper: { z: 0 }, leftLegLower: { z: 0 },
          rightLegUpper: { z: 0 }, rightLegLower: { z: 0 }
        }
      }
    ]
  }
};

// 三次缓动函数
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// 弹簧插值
function springLerp(current, target, stiffness = 0.15, damping = 0.8) {
  const delta = target - current;
  return current + delta * stiffness * damping;
}

export function useActionPlayer() {
  const setJointRotation = useStore(state => state.setJointRotation);
  const getState = useStore.getState;
  const animationRef = useRef(null);
  const currentActionRef = useRef(null);
  const animationStateRef = useRef({});

  const playAction = useCallback((actionName, onComplete) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const action = ACTION_LIBRARY[actionName];
    if (!action) {
      console.warn(`Action not found: ${actionName}`);
      return;
    }

    currentActionRef.current = actionName;
    const startTime = performance.now();

    // 初始化所有涉及的关节
    const allJoints = new Set();
    action.keyframes.forEach(kf => {
      Object.keys(kf.joints || {}).forEach(j => allJoints.add(j));
    });

    const currentPuppetState = getState().puppetState;
    allJoints.forEach(joint => {
      if (!animationStateRef.current[joint]) {
        animationStateRef.current[joint] = {
          z: currentPuppetState[joint]?.rotation?.z || 0,
          x: currentPuppetState[joint]?.rotation?.x || 0,
          y: currentPuppetState[joint]?.rotation?.y || 0
        };
      }
    });

    const animate = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / action.duration, 1);
      const loopedProgress = action.loop ? ((elapsed % action.duration) / action.duration) : progress;

      // 找到当前帧和下一帧
      const frames = action.keyframes;
      let currentFrame = frames[0];
      let nextFrame = frames[frames.length - 1];
      let localT = 0;

      for (let i = 0; i < frames.length - 1; i++) {
        if (loopedProgress >= frames[i].time && loopedProgress <= frames[i + 1].time) {
          currentFrame = frames[i];
          nextFrame = frames[i + 1];
          const duration = frames[i + 1].time - frames[i].time;
          localT = duration > 0 ? (loopedProgress - frames[i].time) / duration : 0;
          break;
        }
      }

      // 使用三次缓动
      const easedT = easeInOutCubic(localT);

      // 计算并应用每个关节的角度
      const jointsToUpdate = new Set([
        ...Object.keys(currentFrame.joints || {}),
        ...Object.keys(nextFrame.joints || {})
      ]);

      jointsToUpdate.forEach(jointName => {
        const current = currentFrame.joints?.[jointName] || { z: 0, x: 0, y: 0 };
        const next = nextFrame.joints?.[jointName] || current;

        const axes = ['z', 'x', 'y'];
        const newRotation = {};

        axes.forEach(axis => {
          const targetVal = current[axis] + (next[axis] - current[axis]) * easedT;

          // 应用约束
          const constraint = CONSTRAINTS[jointName];
          let constrainedVal = targetVal;
          if (constraint && (axis === 'z' || axis === 'x')) {
            const min = constraint.min;
            const max = constraint.max;
            constrainedVal = Math.max(min, Math.min(max, targetVal));
          }

          // 使用弹簧效果平滑过渡
          const currentVal = animationStateRef.current[jointName]?.[axis] || 0;
          const stiffness = constraint?.damping || 0.15;
          const dampedVal = springLerp(currentVal, constrainedVal, stiffness, 0.9);

          newRotation[axis] = dampedVal;
        });

        // 更新存储的状态
        animationStateRef.current[jointName] = newRotation;

        // 应用到store
        setJointRotation(jointName, newRotation);
      });

      if (!action.loop && elapsed >= action.duration) {
        currentActionRef.current = null;
        onComplete?.();
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  }, [setJointRotation, getState]);

  const stopAction = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    currentActionRef.current = null;
    animationStateRef.current = {};
  }, []);

  const getCurrentAction = useCallback(() => currentActionRef.current, []);

  return { playAction, stopAction, getCurrentAction, ACTION_LIBRARY };
}

export default useActionPlayer;