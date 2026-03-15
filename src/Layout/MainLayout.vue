<template>
  <div class="app-container">
    <img class="global-background" alt="Background" :src="image" />
    <div class="global-mask"></div>

    <header class="header">
      <div class="header-left" @click="handleJump('/')">
        <img class="icon" alt="Icon" :src="ASSETS.icon" />
        <div class="brand-text">智赋千影</div>
      </div>
      
      <nav class="nav" @mouseleave="resetIndicator">
        <div class="nav-indicator" :style="indicatorStyle"></div>

        <div 
          v-for="(item, index) in menuItems" 
          :key="item.name"
          :ref="'navItem' + index"
          :class="['nav-item', { active: isItemActive(item) }]"
          @mouseenter="moveIndicator(index)"
          @click="handleJump(item.path)"
        >
          {{ item.name }}
        </div>
      </nav>

      <button class="enter-btn" @click="handleJump('/workshop')">
        进入展厅
      </button>
    </header>

    <main class="main-content">
      <transition name="page-fade" mode="out-in">
        <router-view />
      </transition>
    </main>
  </div>
</template>

<script>
import { ASSETS } from "@/assets/SVG";
import backgroundImage from "@/assets/background.png";

export default {
  name: "MainLayout",
  data() {
    return {
      ASSETS,
      image: backgroundImage,
      menuItems: [
        { name: '文化百科', path: '/culture' },
        { name: '影戏工坊', path: '/workshop' },
        { name: '影艺志', path: '/journal' },
        { name: 'AI皮影戏', path: '/aistage' },
        { name: '关于我们', path: '/about' }
      ],
      // 滑块样式状态
      indicatorStyle: {
        width: '0px',
        transform: 'translateX(0px)',
        opacity: 0
      }
    };
  },
  watch: {
    // 监听路由变化，确保滑块跟随
    '$route'() {
      this.$nextTick(() => this.resetIndicator());
    }
  },
  mounted() {
    // 初始渲染后定位滑块
    setTimeout(() => {
      this.resetIndicator();
    }, 300);
    // 监听窗口大小变化，重置滑块位置防止错位
    window.addEventListener('resize', this.resetIndicator);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resetIndicator);
  },
  methods: {
    isItemActive(item) {
      return this.$route.path === item.path;
    },
    // 更新滑块位置的核心方法
    updateIndicator(index) {
      const el = this.$refs['navItem' + index] && this.$refs['navItem' + index][0];
      if (!el) return;

      this.indicatorStyle = {
        width: `${el.offsetWidth}px`,
        transform: `translateX(${el.offsetLeft}px)`,
        opacity: 1
      };
    },
    moveIndicator(index) {
      this.updateIndicator(index);
    },
    resetIndicator() {
      const activeIndex = this.menuItems.findIndex(item => item.path === this.$route.path);
      if (activeIndex !== -1) {
        this.updateIndicator(activeIndex);
      } else {
        // 如果不在任何菜单项（如首页），可选择隐藏或停留在首页对应位置
        this.indicatorStyle.opacity = 0;
      }
    },
    handleJump(path) {
      if (this.$route.path !== path) {
        this.$router.push(path);
      }
    }
  }
};
</script>

<style scoped>
/* ========== 全局变量与容器 ========== */
.app-container {
  --gold: #d4af37;
  --dark-brown: #2a1b15;
  min-height: 100vh;
  width: 100%;
  position: relative;
}

/* ========== 背景层 (Fixed) ========== */
.global-background {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.global-mask {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.6);
  z-index: 2;
}

/* ========== 导航栏 (Header) ========== */
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3%;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 10;
}

.header-left {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.header-left .icon { height: 60px; width: auto; }

/* ========== 酷炫品牌标题 "智赋千影" ========== */
.brand-text {
  margin-left: 16px;
  font-size: 24px;
  font-weight: 800;
  font-family: "Noto Serif SC", serif;
  letter-spacing: 3px;
  background: linear-gradient(135deg, #d4af37 0%, #ffd700 25%, #ffa500 50%, #d4af37 75%, #ffd700 100%);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s ease-in-out infinite, glow 3s ease-in-out infinite;
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
  filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.4));
}

/* 闪烁发光动画 */
@keyframes shimmer {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* 外发光脉冲 */
@keyframes glow {
  0%, 100% { filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.4)); }
  50% { filter: drop-shadow(0 0 16px rgba(212, 175, 55, 0.8)); }
}

.header-left:hover .brand-text {
  animation: shimmer 2s ease-in-out infinite, glow 1.5s ease-in-out infinite;
}

/* ========== 灵动导航菜单 (Nav) ========== */
.nav {
  position: relative;
  display: flex;
  gap: 15px; /* 间距缩小，配合滑块感 */
  align-items: center;
  padding: 4px;
}

/* 灵动滑块样式：金色描边核心逻辑 */
.nav-indicator {
  position: absolute;
  left: 0;
  height: 42px; /* 略高于文字行高 */
  background-color: rgba(42, 27, 21, 0.88); /* 深褐色重墨背景 */
  
  /* 金色描边设计 */
  border: 1px solid rgba(212, 175, 55, 0.5); /* 淡淡的金色半透明边框 */
  box-shadow: 
    inset 0 0 8px rgba(212, 175, 55, 0.1), /* 内发光，增加立体感 */
    0 4px 15px rgba(0, 0, 0, 0.2); /* 外阴影 */
  
  border-radius: 6px;
  z-index: 0;
  pointer-events: none;
  
  /* 丝滑的五次贝塞尔曲线 */
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.nav-item {
  position: relative;
  z-index: 1; /* 文字处于滑块上方 */
  cursor: pointer;
  padding: 10px 22px;
  color: var(--dark-brown);
  font-family: "Noto Serif SC", serif;
  font-size: 20px;
  letter-spacing: 4px;
  transition: color 0.3s ease;
  white-space: nowrap;
}

/* 激活或悬停时文字变金 */
.nav-item:hover, .nav-item.active {
  color: var(--gold);
}

/* ========== 进入展厅按钮 ========== */
.enter-btn {
  padding: 8px 24px;
  background: rgba(211, 175, 55, 0.1);
  border: 1px solid var(--gold);
  border-radius: 20px;
  color: var(--dark-brown);
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}
.enter-btn:hover {
  background: var(--gold);
  color: #000;
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
}

/* ========== 内容区域与动画 ========== */
.main-content {
  position: relative;
  z-index: 4;
  padding-top: 60px;
  min-height: 100vh;
}

.page-fade-enter-active, .page-fade-leave-active {
  transition: opacity 0.4s, transform 0.4s;
}
.page-fade-enter { opacity: 0; transform: translateY(10px); }
.page-fade-leave-to { opacity: 0; transform: translateY(-10px); }
</style>