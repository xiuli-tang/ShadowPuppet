<template>
  <div class="main-interface">
    <img class="background-image" alt="Background" :src="image" />
    <div class="background-mask"></div>

    <img class="deco-scroll" :src="image5" />
    <img class="deco-bottom-left" :src="image2" />
    <img class="deco-bottom-right" :src="image4" />

    <header class="header">
      <div class="header-left">
        <img class="icon" alt="Icon" :src="icon" />
        <img class="brand-title" alt="Title" :src="image3" />
      </div>
      
      <nav class="nav">
        <div class="nav-item">文化百科</div>
        <div class="nav-item">影戏工坊</div>
        <div class="nav-item">影艺志</div>
        <div class="nav-item">关于我们</div>
      </nav>

      <button class="enter-btn" @click="handleJump('展厅')">
        进入展厅
      </button>
    </header>

    <main class="content-body">
      <div class="hero-container">
        <div class="rice-paper-layer"></div>
        <img class="hero-stage-content" alt="Hero stage" :src="heroStage" />
        <img class="mubu-overlay-image" alt="mubu" :src="mubu" />
      </div>

      <div class="search-section">
        <div class="search-wrapper">
          <img :src="vector" class="search-icon" alt="search" />
          <input type="text" placeholder="搜索皮影流派、名家..." />
        </div>
      </div>

      <section class="section-feature">
        <div 
          v-for="(card, index) in featureCards" 
          :key="index"
          class="feature-card" 
          @click="handleJump(card.title)"
          @mouseenter="playCardAnim(index)"
          @mouseleave="stopCardAnim(index)"
        >
          <img class="card-bg" alt="Card" :src="card.bg" />
          
          <div :id="'lottie-card-' + index" class="card-lottie-layer"></div>

          <div class="card-content">
            <h3 class="card-title">{{ card.title }}</h3>
            <p class="card-desc">{{ card.desc }}</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import lottie from "lottie-web";
import { ASSETS } from "@/assets/SVG";
import backgroundImage from "@/assets/background.png";

// 严格引入卡片悬停动画
import cardHoverAnimData from "@/assets/animations/Card_hover_effect.json";

export default {
  name: "MainInterface",
  data() {
    return {
      ...ASSETS,
      image: backgroundImage,
      lottieInstances: [], // 存储 Lottie 实例
      featureCards: [
        { title: "文化百科", desc: "探索千年的光影源流", bg: ASSETS.card1 },
        { title: "影戏工坊", desc: "在线体验指尖工艺", bg: ASSETS.card2 },
        { title: "影艺志", desc: "珍藏历史的重彩影像", bg: ASSETS.card3 }
      ]
    };
  },
  mounted() {
    this.initCardAnimations();
  },
  beforeUnmount() {
    // 销毁实例防止内存溢出
    this.lottieInstances.forEach(inst => inst.destroy());
  },
  methods: {
    methods: {
  initCardAnimations() {
    if (this.lottieInstances.length > 0) {
      this.lottieInstances.forEach(inst => inst.destroy());
      this.lottieInstances = [];
    }

    // 假设你的 SVG 图片已经通过 ASSETS 引入
    // 如果没有，可以手动定义 Base64 字符串数组，或者让 JSON 里的 assets 为空
    const cardImages = [this.card1, this.card2, this.card3];

    this.featureCards.forEach((card, index) => {
      const container = document.getElementById(`lottie-card-${index}`);
      if (!container) return;

      // 1. 深拷贝原始 JSON 数据
      const deepCopiedData = JSON.parse(JSON.stringify(cardHoverAnimData));

      // 2. 【核心修改】强制改写 JSON 内部的 Base64 图片
      // 检查 assets 是否存在且有数据
      if (deepCopiedData.assets && deepCopiedData.assets.length > 0) {
        // 找到 id 为 "0" 的图片定义，并替换它的 p 字段（即 Base64 路径）
        // 如果你的图片是外部引入的 SVG 路径，也可以直接赋值
        deepCopiedData.assets[0].p = cardImages[index]; 
        deepCopiedData.assets[0].u = ""; // 清空文件夹路径引用
      }

      // 3. 初始化实例
      const anim = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: deepCopiedData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
          id: `card_instance_${index}` 
        }
      });

      this.lottieInstances.push(anim);
    });
  },
    },

    playCardAnim(index) {
        const instance = this.lottieInstances[index];
        if (instance) {
        // 这里的 goToAndPlay(0, true) 会触发带有 Base64 图片的层级显示
        instance.goToAndPlay(0, true);
        }
    },

    stopCardAnim(index) {
        const instance = this.lottieInstances[index];
        if (instance) {
        instance.goToAndStop(0, true);
        }
    },

    handleJump(pageName) {
        console.log(`%c [跳转]: ${pageName}`, "color: #d4af37; font-weight: bold;");
    }
    }
};
</script>

<style scoped>
/* ========== 基础布局 ========== */
.main-interface {
  --gold: #d4af37;
  --dark-text: #2a1b15;
  background: #f2e6d8;
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.background-image { position: fixed; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; }
.background-mask { position: fixed; inset: 0; background: rgba(255, 255, 255, 0.2); z-index: 2; }

/* 装饰图片 */
.deco-scroll { position: absolute; left: 2%; top: 100px; height: 280px; z-index: 3; opacity: 0.5; pointer-events: none; }
.deco-bottom-left { position: absolute; left: 0; bottom: 0; height: 160px; z-index: 3; opacity: 0.6; pointer-events: none; }
.deco-bottom-right { position: absolute; right: 0; bottom: 0; height: 160px; z-index: 3; opacity: 0.6; pointer-events: none; }

/* 导航栏 */
.header {
  position: fixed;
  top: 0; width: 100%; height: 60px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 8%;
  background-color: #0000003b; 
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #ffffff1a; 
  z-index: 10;
}

.nav { display: flex; gap: 60px; } 
.nav-item { 
  cursor: pointer; transition: 0.3s; color: #2a1b15; 
  font-family: "Noto Serif SC", serif; font-weight: 200;
  font-size: 16px; letter-spacing: 6px;
}
.nav-item:hover { color: var(--gold); }

.enter-btn { 
  padding: 8px 20px; cursor: pointer; transition: 0.3s;
  background-color: #d4af3730; border: 1px solid #d4af37;
  border-radius: 8px; color: #d4af37; font-weight: 700;
}

/* 内容主体 */
.content-body {
  position: relative; z-index: 4; margin-top: 80px;
  display: flex; flex-direction: column; align-items: center; width: 100%;
}

.hero-container {
  position: relative; width: 55%; max-width: 700px; 
  aspect-ratio: 16 / 9; box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  margin-bottom: 25px;
}
.rice-paper-layer { position: absolute; inset: 0; background: radial-gradient(#FFFDF5, #E7DEBE); }
.hero-stage-content { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; transform: scale(0.92); z-index: 2; }
.mubu-overlay-image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: fill; z-index: 4; pointer-events: none; }

/* 搜索框 */
.search-wrapper {
  display: flex; align-items: center; background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(141, 112, 74, 0.4); padding: 4px 12px; border-radius: 20px;
  width: 240px; margin-bottom: 30px;
}
.search-icon { height: 13px; margin-right: 8px; opacity: 0.6; }
.search-wrapper input { border: none; background: none; outline: none; font-size: 11px; width: 100%; }

/* ========== 卡片悬停效果核心样式 ========== */
.section-feature {
  display: flex; justify-content: center; gap: 20px;
}

.feature-card {
  position: relative;
  width: 230px;
  height: 135px;
  background-color: #ffe5a326;
  border: 2.5px solid #8d704a;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.feature-card:hover {
  transform: translateY(-8px);
  border-color: var(--gold);
  background-color: #ffe5a340;
  box-shadow: 0 12px 24px rgba(0,0,0,0.2);
}

.card-bg {
  position: absolute; inset: 0; width: 100%; height: 100%;
  object-fit: cover; opacity: 0.5; transition: 0.4s;
}
.feature-card:hover .card-bg { opacity: 1; }

/* Lottie 层 */
.card-lottie-layer {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: 0;
  mix-blend-mode: screen; /* 使得动画与背景融合，适合金色特效 */
  transition: opacity 0.3s ease;
}
.feature-card:hover .card-lottie-layer {
  opacity: 1;
}

.card-content {
  position: relative; z-index: 3;
  padding: 12px; text-align: center; height: 100%;
  display: flex; flex-direction: column; justify-content: center;
}

.card-title {
  font-size: 16px; color: var(--dark-text); margin-bottom: 4px;
  font-family: "Noto Serif SC", serif; font-weight: bold;
}

.card-desc {
  font-size: 10px; color: #6d4c41; line-height: 1.4;
}

@media (max-width: 900px) {
  .hero-container { width: 80%; }
  .section-feature { flex-direction: column; align-items: center; }
}
</style>