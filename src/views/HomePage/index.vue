<template>
  <div class="home-wrapper">
    <img class="deco-scroll" alt="Scroll" :src="ASSETS.image5" />
    <img class="deco-bottom-left" alt="Deco Left" :src="ASSETS.image2" />
    <img class="deco-bottom-right" alt="Deco Right" :src="ASSETS.image4" />

    <div class="hero-container">
      <div class="backlit-rice-paper"></div>
      
      <div class="paper-texture-layer"></div>
      
      <img class="mubu-overlay-image enhanced-mubu" alt="mubu" :src="ASSETS.mubu" />
      
      <div class="stage-content-wrapper">
        <img class="hero-stage-content enhanced-hero" alt="Hero stage" :src="ASSETS.heroStage" />
      </div>

      <div class="vignette-layer"></div>
    </div>

    <div class="search-section">
      <div class="search-wrapper">
        <img :src="ASSETS.vector" class="search-icon" alt="search" />
        <input type="text" placeholder="搜索皮影流派、名家..." />
      </div>
    </div>

    <section class="section-feature">
      <div class="carousel-3d-wrapper">
        <div class="carousel-3d-container">
          <div
            v-for="(_, index) in 3"
            :key="index"
            class="feature-card-3d"
            :style="getCard3DStyle(index)"
            @click="handleCardClick(index)"
          >
            <div class="feature-card" @click="handleJump(getCardPath(index))">
              <img class="card-bg" :alt="`Card ${index + 1}`" :src="getCardImage(index)" />
              <div class="card-content">
                <h3 class="card-title">{{ getCardTitle(index) }}</h3>
                <p class="card-desc">{{ getCardDesc(index) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="carousel-controls">
        <button class="carousel-btn carousel-btn-prev" @click="prevCard" :disabled="currentCardIndex === 0">
          <span class="arrow">‹</span>
        </button>

        <div class="carousel-indicators">
          <span
            v-for="(_, index) in 3"
            :key="index"
            class="indicator"
            :class="{ active: currentCardIndex === index }"
            @click="currentCardIndex = index"
          ></span>
        </div>

        <button class="carousel-btn carousel-btn-next" @click="nextCard" :disabled="currentCardIndex === 2">
          <span class="arrow">›</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { ASSETS } from "@/assets/SVG";

export default {
  name: "HomePage",
  data() {
    return {
      ASSETS,
      currentCardIndex: 0,
      cards: [
        {
          title: '文化百科',
          desc: '历代皮影流派与地域文化考据\n探索千年的光影源流',
          image: ASSETS.card1,
          path: '/culture'
        },
        {
          title: '影戏工坊',
          desc: '在线体验皮影制作工艺\n感受指尖上的灵动神韵',
          image: ASSETS.card2,
          path: '/workshop'
        },
        {
          title: '影艺志',
          desc: '名家名段影像与高清纪录片\n珍藏历史的每一抹重彩',
          image: ASSETS.card3,
          path: '/journal'
        }
      ]
    };
  },
  methods: {
    handleJump(path) {
      if (this.$route.path !== path) {
        this.$router.push(path);
      }
    },
    prevCard() {
      if (this.currentCardIndex > 0) {
        this.currentCardIndex--;
      }
    },
    nextCard() {
      if (this.currentCardIndex < 2) {
        this.currentCardIndex++;
      }
    },
    getCard3DStyle(index) {
      const angle = (index - this.currentCardIndex) * 60;
      const isActive = index === this.currentCardIndex;
      const distance = 500;

      return {
        transform: `rotateY(${angle}deg) translateZ(${distance}px)`,
        opacity: isActive ? 1 : 0.6,
        pointerEvents: isActive ? 'auto' : 'none'
      };
    },
    getCardTitle(index) {
      return this.cards[index].title;
    },
    getCardDesc(index) {
      return this.cards[index].desc;
    },
    getCardImage(index) {
      return this.cards[index].image;
    },
    getCardPath(index) {
      return this.cards[index].path;
    },
    handleCardClick(index) {
      if (index !== this.currentCardIndex) {
        this.currentCardIndex = index;
      }
    }
  }
};
</script>

<style scoped>
/* ========== 1. 页面基础布局 ========== */
.home-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-top: 40px;
  /* background-color: #f5f2e9; 柔和背景色 */
}

/* ========== 2. 装饰性元素 (绝对/固定定位) ========== */
.deco-scroll { position: absolute; left: 4%; top: 40px; height: 350px; z-index: 3; pointer-events: none; }
.deco-bottom-left { position: fixed; left: 0; bottom: 0; height: 280px; z-index: 3; pointer-events: none; }
.deco-bottom-right { position: fixed; right: 0; bottom: 0; height: 260px; z-index: 3; pointer-events: none; }

/* ========== 3. Hero 舞台核心容器 (严格按照设计要求) ========== */
.hero-container {
  position: relative;
  width: 65%;
  max-width: 843px; 
  aspect-ratio: 843 / 365; /* 保持设计稿原始宽高比 */
  box-shadow: 0px 0px 16px rgba(0,0,0,0.7);
  margin-bottom: 30px;
  z-index: 4;
  overflow: hidden;
  background-color: #e5dbc1;
  border-radius: 8px;
}

/* 层级 1: 宣纸背光 */
.backlit-rice-paper {
  position: absolute;
  inset: 0;
  background: radial-gradient(50% 50% at 50% 50%, #fff9e5 0%, #f7f2e8 70%, #d4b886 100%);
  z-index: 1;
}

/* 层级 2: 斑驳纹理 (SVG 滤镜) */
.paper-texture-layer {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  box-shadow: 
    inset 0 0 100px rgba(107, 68, 35, 0.4), 
    inset 0 0 40px rgba(61, 43, 31, 0.6);
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.08;
  mix-blend-mode: multiply;
}

/* 层级 3: 幕布效果 */
.enhanced-mubu {
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

/* 层级 4: 皮影内容包装器 */
.stage-content-wrapper {
  position: absolute;
  inset: 0;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 皮影主体 */
.enhanced-hero {
  max-width: 90%;
  max-height: 85%;
  object-fit: contain;
  filter: drop-shadow(8px 12px 10px rgba(0,0,0,0.5));
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 层级 5: 顶层暗角环境 */
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

/* ========== 4. 搜索区域 ========== */
.search-section { margin-bottom: 40px; width: 100%; display: flex; justify-content: center; z-index: 5; }
.search-wrapper {
  display: flex; align-items: center; background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(141, 112, 74, 0.4); padding: 8px 18px;
  border-radius: 20px; width: 440px; transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(141, 112, 74, 0.1);
}
.search-wrapper:focus-within { border-color: #d4af37; background: #fff; box-shadow: 0 4px 12px rgba(212, 175, 55, 0.2); }
.search-icon { height: 16px; margin-right: 10px; opacity: 0.6; }
.search-wrapper input { border: none; background: none; outline: none; font-size: 16px; width: 100%; color: #2a1b15; font-family: "Noto Serif SC", serif; }

/* ========== 5. 功能卡片区域 - 3D 轮播 ========== */
.section-feature {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 5;
  padding-top: 80px;
  padding-bottom: 60px;
  position: relative;
  perspective: 1200px;
}

.carousel-3d-wrapper {
  width: 400px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-3d-container {
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 1200px;
  transform-style: preserve-3d;
}

.feature-card-3d {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  left: 0;
  top: 0;
}

.feature-card {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 229, 163, 0.15);
  border: 2px solid #8d704a;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

.feature-card:hover {
  transform: translateY(-8px);
  background-color: rgba(255, 229, 163, 0.25);
  border-color: #d4af37;
  box-shadow: 0 10px 20px rgba(141, 112, 74, 0.2);
}

.card-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}

.card-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
}

.card-title {
  font-size: 20px;
  color: #2a1b15;
  margin-bottom: 4px;
  font-family: "Noto Serif SC", serif;
  font-weight: bold;
}

.card-desc {
  font-size: 12px;
  color: #6d4c41;
  line-height: 1.4;
  text-align: center;
  white-space: pre-line;
}

.carousel-btn {
  width: 40px;
  height: 40px;
  border: 2px solid #8d704a;
  background-color: rgba(255, 229, 163, 0.15);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.carousel-btn:hover:not(:disabled) {
  background-color: rgba(255, 229, 163, 0.3);
  border-color: #d4af37;
  transform: scale(1.1);
}

.carousel-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.carousel-btn .arrow {
  font-size: 24px;
  color: #8d704a;
  font-weight: bold;
}

.carousel-indicators {
  position: relative;
  bottom: auto;
  left: auto;
  transform: none;
  display: flex;
  gap: 8px;
  margin-top: 30px;
}

.carousel-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 150px;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(141, 112, 74, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background-color: #d4af37;
  width: 24px;
  border-radius: 4px;
}

/* ========== 6. 交互动画 ========== */
.hero-container:hover .enhanced-hero {
  transform: scale(1.03) translateY(-10px);
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .hero-container { width: 90%; }
  .section-feature { flex-direction: column; align-items: center; padding-bottom: 60px; }
  .deco-scroll { display: none; }
  .carousel-indicators { margin-top: 20px; }
}
</style>