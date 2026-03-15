<template>
  <div class="home-wrapper">
    <img class="deco-scroll" alt="Scroll" :src="ASSETS.image5" />
    <img class="deco-bottom-left" alt="Deco Left" :src="ASSETS.image2" />
    <img class="deco-bottom-right" alt="Deco Right" :src="ASSETS.image4" />

    <div class="hero-container">
      <div class="rice-paper-layer"></div>
      <img class="hero-stage-content" alt="Hero stage" :src="ASSETS.heroStage" />
      <img class="mubu-overlay-image" alt="mubu" :src="ASSETS.mubu" />
    </div>

    <div class="search-section">
      <div class="search-wrapper">
        <img :src="ASSETS.vector" class="search-icon" alt="search" />
        <input type="text" placeholder="搜索皮影流派、名家..." />
      </div>
    </div>

    <section class="section-feature">
      <div class="feature-card" @click="handleJump('/culture')">
        <img class="card-bg" alt="Card" :src="ASSETS.card1" />
        <div class="card-content">
          <h3 class="card-title">文化百科</h3>
          <p class="card-desc">历代皮影流派与地域文化考据<br>探索千年的光影源流</p>
        </div>
      </div>

      <div class="feature-card" @click="handleJump('/workshop')">
        <img class="card-bg" alt="Card" :src="ASSETS.card2" />
        <div class="card-content">
          <h3 class="card-title">影戏工坊</h3>
          <p class="card-desc">在线体验皮影制作工艺<br>感受指尖上的灵动神韵</p>
        </div>
      </div>

      <div class="feature-card" @click="handleJump('/journal')">
        <img class="card-bg" alt="Card" :src="ASSETS.card3" />
        <div class="card-content">
          <h3 class="card-title">影艺志</h3>
          <p class="card-desc">名家名段影像与高清纪录片<br>珍藏历史的每一抹重彩</p>
        </div>
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
.home-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  /* 这里的 padding-top 会在 layout 的 60px 基础上增加，保持视觉呼吸感 */
  padding-top: 20px; 
}

/* ========== 页面装饰元素 ========== */
.deco-scroll { 
  position: absolute; 
  left: 4%; 
  top: 40px; /* 已经相对于 main-content 的顶部 */
  height: 350px; 
  z-index: 3; 
  pointer-events: none; 
}

.deco-bottom-left { 
  position: fixed; /* 改为 fixed 可以保持在左下角不随内容滚动，或设为 absolute */
  left: 0; 
  bottom: 0; 
  height: 280px; 
  z-index: 3; 
  pointer-events: none; 
}

.deco-bottom-right { 
  position: fixed; 
  right: 0; 
  bottom: 0; 
  height: 260px; 
  z-index: 3; 
  pointer-events: none; 
}

/* ========== Hero 舞台容器 ========== */
.hero-container {
  position: relative;
  width: 55%;
  max-width: 790px; 
  aspect-ratio: 16 / 9;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  margin-bottom: 25px;
  z-index: 4;
}

.rice-paper-layer { 
  position: absolute; 
  inset: 0; 
  background: radial-gradient(#FFFDF5, #E7DEBE); 
}

.hero-stage-content { 
  position: absolute; 
  inset: 0; 
  width: 100%; 
  height: 100%; 
  object-fit: contain; 
  transform: scale(0.92); 
  z-index: 2; 
}

.mubu-overlay-image { 
  position: absolute; 
  inset: 0; 
  width: 100%; 
  height: 100%; 
  object-fit: fill; 
  z-index: 4; 
  pointer-events: none; 
}

/* ========== 搜索区域 ========== */
.search-section {
  margin-bottom: 25px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 5;
}

.search-wrapper {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(141, 112, 74, 0.4);
  padding: 8px 18px;
  border-radius: 20px;
  width: 440px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(141, 112, 74, 0.1);
}

.search-wrapper:focus-within {
  border-color: #d4af37;
  background: #fff;
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.2);
}

.search-icon { height: 16px; margin-right: 10px; opacity: 0.6; }

.search-wrapper input {
  border: none;
  background: none;
  outline: none;
  font-size: 16px;
  width: 100%;
  color: #2a1b15;
  font-family: "Noto Serif SC", serif;
}

/* ========== 功能卡片区域 ========== */
.section-feature {
  display: flex;
  justify-content: center;
  gap: 24px;
  width: 100%;
  z-index: 5;
  padding-bottom: 40px;
}

.feature-card {
  position: relative;
  width: 340px;
  height: 160px;
  background-color: rgba(255, 229, 163, 0.15);
  border: 2px solid #8d704a;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
  background: linear-gradient(to top, rgba(255,255,255,0.4), transparent);
}

.card-title {
  font-size: 22px;
  color: #2a1b15;
  margin-bottom: 6px;
  font-family: "Noto Serif SC", serif;
  font-weight: bold;
}

.card-desc { 
  font-size: 14px; 
  color: #6d4c41; 
  line-height: 1.5; 
  text-align: center;
}

/* 响应式适配 */
@media (max-width: 1024px) {
  .hero-container { width: 85%; }
  .section-feature { flex-direction: column; align-items: center; }
  .deco-scroll { display: none; }
}
</style>