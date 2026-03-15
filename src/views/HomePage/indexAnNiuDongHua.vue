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
        <div class="nav-item" @click="handleJump('文化百科')">文化百科</div>
        <div class="nav-item" @click="handleJump('影戏工坊')">影戏工坊</div>
        <div class="nav-item" @click="handleJump('影艺志')">影艺志</div>
        <div class="nav-item" @click="handleJump('关于我们')">关于我们</div>
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
import cardHoverAnimData from "@/assets/animations/Card_hover_effect.json";

export default {
  name: "MainInterface",
  data() {
    return {
      ...ASSETS,
      image: backgroundImage,
      lottieInstances: [],
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
    this.lottieInstances.forEach(inst => inst.destroy());
  },
  methods: {
    initCardAnimations() {
      if (this.lottieInstances.length > 0) {
        this.lottieInstances.forEach(inst => inst.destroy());
        this.lottieInstances = [];
      }

      const cardImages = [this.card1, this.card2, this.card3];

      this.featureCards.forEach((card, index) => {
        const container = document.getElementById(`lottie-card-${index}`);
        if (!container) return;

        const deepCopiedData = JSON.parse(JSON.stringify(cardHoverAnimData));
        if (deepCopiedData.assets && deepCopiedData.assets.length > 0) {
          deepCopiedData.assets[0].p = cardImages[index]; 
          deepCopiedData.assets[0].u = ""; 
        }

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
    playCardAnim(index) {
      const instance = this.lottieInstances[index];
      if (instance) instance.goToAndPlay(0, true);
    },
    stopCardAnim(index) {
      const instance = this.lottieInstances[index];
      if (instance) instance.goToAndStop(0, true);
    },
    handleJump(pageName) {
      // 样式化控制台输出
      console.log(
        `%c [跳转]: ${pageName} `, 
        "background: #d4af37; color: #000; font-weight: bold; padding: 2px 5px; border-radius: 3px;"
      );
      
      // 路由跳转预留逻辑:
      // this.$router.push({ name: pageName }); 
    }
  }
};
</script>

<style scoped>
/* ========== 基础变量与布局 ========== */
.main-interface {
  --gold-primary: #d4af37;
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

/* ========== 顶部导航栏 ========== */
.header {
  position: fixed;
  top: 0; width: 100%; height: 60px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 8%;
  background-color: rgba(0, 0, 0, 0.23); 
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1); 
  z-index: 10;
}

.nav { display: flex; gap: 40px; } 
.nav-item { 
  cursor: pointer; transition: 0.3s; color: var(--dark-text); 
  font-family: "Noto Serif SC", serif; font-weight: 500;
  font-size: 16px; letter-spacing: 2px;
}
.nav-item:hover { color: var(--gold-primary); }

/* ========== 核心修改：进入展厅按钮样式 ========== */
.enter-btn {
  /* 基础外观 */
  padding: 10px 30px;
  border-radius: 20px;
  border: 1px solid var(--gold-primary);
  background: rgba(211, 175, 55, 0.2);
  
  /* 文字样式 */
  color: var(--gold-primary);
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  
  /* 过渡动画 */
  transition: all 0.3s ease;
  outline: none;
}

/* 交互效果：悬浮状态 */
.enter-btn:hover {
  background: var(--gold-primary); /* 变为纯金色实色背景 */
  color: #000;                     /* 变为黑色文字 */
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
}

/* 交互效果：点击反馈 */
.enter-btn:active {
  transform: scale(0.96);
}

/* ========== 其他内容样式 ========== */
.content-body {
  position: relative; z-index: 4; margin-top: 100px;
  display: flex; flex-direction: column; align-items: center; width: 100%;
}

.hero-container {
  position: relative; width: 55%; max-width: 700px; 
  aspect-ratio: 16 / 9; box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  margin-bottom: 30px;
}
.rice-paper-layer { position: absolute; inset: 0; background: radial-gradient(#FFFDF5, #E7DEBE); }
.hero-stage-content { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; transform: scale(0.92); z-index: 2; }
.mubu-overlay-image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: fill; z-index: 4; pointer-events: none; }

.search-wrapper {
  display: flex; align-items: center; background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(141, 112, 74, 0.4); padding: 6px 16px; border-radius: 20px;
  width: 280px; margin-bottom: 40px;
}
.search-icon { height: 14px; margin-right: 10px; opacity: 0.6; }
.search-wrapper input { border: none; background: none; outline: none; font-size: 12px; width: 100%; }

.section-feature { display: flex; justify-content: center; gap: 25px; }

.feature-card {
  position: relative; width: 240px; height: 140px;
  background-color: rgba(255, 229, 163, 0.15);
  border: 2px solid #8d704a; border-radius: 8px;
  overflow: hidden; cursor: pointer;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.feature-card:hover {
  transform: translateY(-8px);
  border-color: var(--gold-primary);
  box-shadow: 0 12px 24px rgba(0,0,0,0.2);
}

.card-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.4; transition: 0.4s; }
.feature-card:hover .card-bg { opacity: 0.9; }

.card-lottie-layer { position: absolute; inset: 0; z-index: 2; pointer-events: none; opacity: 0; mix-blend-mode: screen; transition: opacity 0.3s; }
.feature-card:hover .card-lottie-layer { opacity: 1; }

.card-content { position: relative; z-index: 3; padding: 15px; text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: center; }
.card-title { font-size: 18px; color: var(--dark-text); margin-bottom: 6px; font-family: "Noto Serif SC", serif; font-weight: bold; }
.card-desc { font-size: 11px; color: #6d4c41; }

/* 装饰定位 */
.deco-scroll { position: absolute; left: 2%; top: 120px; height: 300px; z-index: 3; opacity: 0.4; pointer-events: none; }
.deco-bottom-left { position: absolute; left: 0; bottom: 0; height: 180px; z-index: 3; opacity: 0.5; }
.deco-bottom-right { position: absolute; right: 0; bottom: 0; height: 180px; z-index: 3; opacity: 0.5; }

@media (max-width: 900px) {
  .hero-container { width: 85%; }
  .section-feature { flex-direction: column; align-items: center; }
  .nav { display: none; } /* 移动端隐藏复杂导航 */
}
</style>