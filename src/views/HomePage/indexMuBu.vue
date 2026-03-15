<!-- <template>
  <div class="home-wrapper">
    <div class="hero-stage-container">
      <div class="overlay-border">
        <div class="backlit-rice-paper"></div>
        
        <img class="image-mubu" alt="mubu" :src="ASSETS.mubu" />
        
        <div class="stage-content-wrapper">
          <img class="image-hero" alt="Hero stage" :src="ASSETS.heroStage" />
        </div>        
        <div class="vignette-layer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ASSETS } from "@/assets/SVG";

export default {
  name: "HomePage",
  data() {
    return {
      ASSETS
    };
  },
  methods: {
    handleJump(path) {
      // 路由跳转逻辑
      if (this.$route.path !== path) {
        this.$router.push(path);
      }
    }
  }
};
</script>

<style scoped>
/* --- 容器布局保持不变 --- */
.home-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-bottom: 50px;
  transform: scale(1.1);
}

/* --- 舞台核心样式优化 --- */
.hero-stage-container {
  width: 100%;
  max-width: 1202px;
  margin: 30px auto;
  display: flex;
  justify-content: center;
}

.overlay-border {
  position: relative;
  width: 896px;
  height: 385px;
  /* 增加外阴影，模拟木质舞台框架 */
  box-shadow: 0px 20px 50px rgba(0,0,0,0.5), inset 0px 0px 80px 4px #2a1810cc;
  overflow: hidden;
  background-color: #000; /* 防止加载闪烁 */
  /* 核心新增：圆角值，数值越大越圆润（比如 20px） */
  border-radius: 10px;
}

/* 层级 1: 背景光晕 */
.backlit-rice-paper {
  position: absolute;
  inset: 0;
  background: radial-gradient(50% 50% at 50% 50%, #fff9e5 0%, #f7f2e8 70%, #e5dbc1 100%);
  z-index: 1;
}

/* 层级 2: 幕布/边框 */
.image-mubu {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: fill; 
  z-index: 2;
  pointer-events: none;
  /* 如果 mubu 是边框，可以略微调低透明度让背景光透出来 */
  opacity: 0.5;
}

/* 层级 3: 主体内容容器 */
.stage-content-wrapper {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-hero {
  max-width: 100%;
  max-height: 95%;
  object-fit: contain;
  /* 关键：利用 drop-shadow 模拟皮影贴在幕布上的真实投影 */
  filter: drop-shadow(10px 15px 12px rgba(0,0,0,0.4));
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

/* 层级 4: 顶层环境光 */
.vignette-layer {
  position: absolute;
  inset: 0;
  /* 暗角效果，让视觉中心更集中 */
  background: radial-gradient(circle, transparent 70%, rgba(0,0,0,0.4) 100%);
  z-index: 4;
  pointer-events: none;
}

/* 交互效果 */
.overlay-border:hover .image-hero {
  transform: scale(1.05) translateY(-5px);
}

/* --- 装饰元素样式 --- */
.deco-scroll { position: absolute; left: 4%; top: 20px; height: 350px; z-index: 5; pointer-events: none; }
.deco-bottom-left { position: fixed; left: 0; bottom: 0; height: 280px; z-index: 5; pointer-events: none; }
.deco-bottom-right { position: fixed; right: 0; bottom: 0; height: 260px; z-index: 5; pointer-events: none; }
</style> -->

<!-- <template>
  <div class="home-wrapper">
    <div class="hero-stage-container">
      <div class="overlay-border">
        <div class="backlit-rice-paper"></div>

        <div class="paper-texture-layer"></div>
        
        <img class="image-mubu" alt="mubu" :src="ASSETS.mubu" />
        
        <div class="stage-content-wrapper">
          <img class="image-hero" alt="Hero stage" :src="ASSETS.heroStage" />
        </div>        
        
        <div class="vignette-layer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ASSETS } from "@/assets/SVG";

export default {
  name: "HomePage",
  data() {
    return {
      ASSETS
    };
  },
  methods: {
    handleJump(path) {
      if (this.$route.path !== path) {
        this.$router.push(path);
      }
    }
  }
};
</script>

<style scoped>
/* --- 容器布局 --- */
.home-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-bottom: 50px;
  transform: scale(1.1);
}

.hero-stage-container {
  width: 100%;
  max-width: 1202px;
  margin: 30px auto;
  display: flex;
  justify-content: center;
}

.overlay-border {
  position: relative;
  width: 843px;
  height: 365px;
  /* 外部投影：增加画轴的厚度感 */
  box-shadow: 
    0px 0px 16px rgba(0,0,0,0.7);
  overflow: hidden;
  background-color: #e5dbc1;
  border-radius: 4px; /* 画卷通常圆角较小 */
}

/* 层级 1: 背景光晕 - 模拟灯光从纸张后方透出 */
.backlit-rice-paper {
  position: absolute;
  inset: 0;
  background: radial-gradient(50% 50% at 50% 50%, #fff9e5 0%, #f7f2e8 70%, #d4b886 100%);
  z-index: 1;
}

/* 层级 2: 核心优化 - 斑驳画卷阴影边框 */
.paper-texture-layer {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  /* 1. 多层内阴影：第一层是棕色斑驳，第二层是深色焦边 */
  box-shadow: 
    inset 0 0 100px rgba(107, 68, 35, 0.4), 
    inset 0 0 40px rgba(61, 43, 31, 0.6);
  
  /* 2. 模拟陈旧纸张的噪点纹理 (可选) */
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3Context-fill='none'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.08; /* 极低透明度，仅提供质感 */
  mix-blend-mode: multiply;
}

/* 层级 3: 幕布 */
.image-mubu {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  z-index: 3;
  pointer-events: none;
  opacity: 0.6;
  filter: sepia(0.5) contrast(1.1); /* 让幕布也带上一点复古调性 */
}

/* 层级 4: 主体内容 */
.stage-content-wrapper {
  position: absolute;
  inset: 0;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-hero {
  max-width: 90%;
  max-height: 85%;
  object-fit: contain;
  /* 皮影戏特有的近距离模糊投影 */
  filter: drop-shadow(8px 12px 10px rgba(0,0,0,0.5));
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 层级 5: 顶层环境光 - 加强斑驳感 */
.vignette-layer {
  position: absolute;
  inset: 0;
  /* 矩形暗角核心：椭圆比例匹配画布宽高，渐变节点贴合矩形边缘 */
  background: radial-gradient(
    ellipse 100% 100% at 50% 50%, /* 矩形渐变核心：匹配画布形状 */
    transparent 40%,               /* 中心亮区不变，保证主体清晰 */
    rgba(42, 24, 16, 0.5) 75%,    /* 棕色不透明度从0.3→0.5，提前进入深色 */
    rgba(0, 0, 0, 0.9) 100%        /* 黑色不透明度从0.6→0.9，边缘更黑 */
  );
  z-index: 5;
  pointer-events: none;
}

/* 交互 */
.overlay-border:hover .image-hero {
  transform: scale(1.03) translateY(-10px);
}
</style> -->

<template>
  <div class="home-wrapper">
    <div class="hero-stage-container">
      <div class="overlay-border">
        <div class="backlit-rice-paper"></div>
        <div class="paper-texture-layer"></div>
        <img class="image-mubu" alt="mubu" :src="ASSETS.mubu" />
        <div class="stage-content-wrapper">
          <img class="image-hero" alt="Hero stage" :src="ASSETS.heroStage" />
        </div>
        <div class="vignette-layer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ASSETS } from "@/assets/SVG";

export default {
  name: "HomePage",
  data() {
    return {
      ASSETS
    };
  }
};
</script>

<style scoped>
/* 核心容器布局 */
.home-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transform: scale(1.1);
}

.hero-stage-container {
  width: 100%;
  max-width: 1202px;
  margin: 30px auto;
  display: flex;
  justify-content: center;
}

.overlay-border {
  position: relative;
  width: 843px;
  height: 365px;
  box-shadow: 0px 0px 16px rgba(0,0,0,0.7);
  overflow: hidden;
  background-color: #e5dbc1;
  border-radius: 4px;
}

/* 层级1: 背景光晕 */
.backlit-rice-paper {
  position: absolute;
  inset: 0;
  background: radial-gradient(50% 50% at 50% 50%, #fff9e5 0%, #f7f2e8 70%, #d4b886 100%);
  z-index: 1;
}

/* 层级2: 斑驳纹理 */
.paper-texture-layer {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  box-shadow: 
    inset 0 0 100px rgba(107, 68, 35, 0.4), 
    inset 0 0 40px rgba(61, 43, 31, 0.6);
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3Context-fill='none'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.08;
  mix-blend-mode: multiply;
}

/* 层级3: 幕布 */
.image-mubu {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  z-index: 3;
  pointer-events: none;
  opacity: 0.6;
  filter: sepia(0.5) contrast(1.1);
}

/* 层级4: 主体内容 */
.stage-content-wrapper {
  position: absolute;
  inset: 0;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-hero {
  max-width: 90%;
  max-height: 85%;
  object-fit: contain;
  filter: drop-shadow(8px 12px 10px rgba(0,0,0,0.5));
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 层级5: 顶层暗角 */
.vignette-layer {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 100% 100% at 50% 50%,
    transparent 40%,
    rgba(42, 24, 16, 0.5) 75%,
    rgba(0, 0, 0, 0.9) 100%
  );
  z-index: 5;
  pointer-events: none;
}

/* 交互效果 */
.overlay-border:hover .image-hero {
  transform: scale(1.03) translateY(-10px);
}
</style>