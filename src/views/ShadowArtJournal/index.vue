<template>
  <div class="journal-wrapper">
    <!-- 背景光效 -->
    <div class="background-glow"></div>

    <!-- 顶部标题区 -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">影艺志</h1>
        <p class="hero-subtitle">光影之间，记录传奇</p>
        <p class="hero-desc">名家名段 · 高清纪录 · 珍藏历史</p>
      </div>
    </section>

    <!-- 筛选栏 -->
    <section class="filter-section">
      <div class="filter-container">
        <button
          v-for="filter in filters"
          :key="filter"
          :class="['filter-btn', { active: activeFilter === filter }]"
          @click="activeFilter = filter"
        >
          {{ filter }}
        </button>
      </div>
    </section>

    <!-- 影像卡片网格 -->
    <section class="gallery-section">
      <div class="gallery-grid">
        <div
          v-for="(item, index) in filteredItems"
          :key="index"
          class="gallery-card"
          @mouseenter="hoveredCard = index"
          @mouseleave="hoveredCard = null"
        >
          <!-- 卡片背景 -->
          <div class="card-background">
            <div class="card-glow"></div>
            <div class="card-shine"></div>
          </div>

          <!-- 内容 -->
          <div class="card-content">
            <!-- 影像区 -->
            <div class="image-area">
              <div class="image-frame">
                <span class="image-emoji">{{ item.emoji }}</span>
              </div>
              <div class="play-button" v-if="hoveredCard === index">
                <span>▶</span>
              </div>
            </div>

            <!-- 文字信息 -->
            <div class="info-section">
              <h3 class="card-title">{{ item.title }}</h3>
              <p class="card-artist">{{ item.artist }}</p>
              <p class="card-desc">{{ item.description }}</p>

              <!-- 标签 -->
              <div class="tags">
                <span v-for="tag in item.tags" :key="tag" class="tag">
                  {{ tag }}
                </span>
              </div>

              <!-- 统计信息 -->
              <div class="stats">
                <div class="stat-item">
                  <span class="stat-icon">👁</span>
                  <span class="stat-value">{{ item.views }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-icon">❤</span>
                  <span class="stat-value">{{ item.likes }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-icon">⭐</span>
                  <span class="stat-value">{{ item.rating }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 悬停效果 -->
          <div v-if="hoveredCard === index" class="hover-overlay">
            <button class="action-btn">观看完整版</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 加载更多 -->
    <section class="load-more-section">
      <button class="load-more-btn">加载更多精彩内容</button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ShadowArtJournal',
  data() {
    return {
      activeFilter: '全部',
      hoveredCard: null,
      filters: ['全部', '经典名段', '大师风采', '地方流派', '现代创新'],
      items: [
        {
          emoji: '🎭',
          title: '孙中山巡视南方',
          artist: '陕西皮影大师 王天增',
          description: '经典历史题材皮影戏，再现民国风云',
          tags: ['历史', '陕西皮影', '经典'],
          views: '12.5万',
          likes: '8.3万',
          rating: '9.8',
          category: '经典名段'
        },
        {
          emoji: '🐉',
          title: '龙王传说',
          artist: '河南豫剧皮影团',
          description: '气势恢宏的神话故事，龙王形象栩栩如生',
          tags: ['神话', '河南皮影', '大制作'],
          views: '18.9万',
          likes: '12.4万',
          rating: '9.9',
          category: '经典名段'
        },
        {
          emoji: '🦊',
          title: '狐妖艳遇',
          artist: '唐山皮影传承人 李占魁',
          description: '聊斋故事改编，妖娆狐妖的爱恨情仇',
          tags: ['聊斋', '唐山皮影', '爱情'],
          views: '15.2万',
          likes: '10.1万',
          rating: '9.7',
          category: '大师风采'
        },
        {
          emoji: '🏯',
          title: '三国演义·赤壁之战',
          artist: '北京皮影剧团',
          description: '宏大的战争场景，精妙的人物刻画',
          tags: ['三国', '北京皮影', '战争'],
          views: '22.3万',
          likes: '15.8万',
          rating: '9.9',
          category: '经典名段'
        },
        {
          emoji: '🌸',
          title: '春日物语',
          artist: '浙江皮影艺术家 陈素娥',
          description: '唯美的春景诗意表现，细腻的情感刻画',
          tags: ['诗意', '浙江皮影', '唯美'],
          views: '9.8万',
          likes: '7.2万',
          rating: '9.6',
          category: '现代创新'
        },
        {
          emoji: '🎪',
          title: '江湖杂耍记',
          artist: '民间艺人联合制作',
          description: '市井生活的趣味故事，充满生活气息',
          tags: ['民俗', '综合', '喜剧'],
          views: '11.4万',
          likes: '8.9万',
          rating: '9.5',
          category: '地方流派'
        },
        {
          emoji: '🧘',
          title: '西游记·取经路',
          artist: '陕西皮影大师 汪天喜',
          description: '经典名著改编，师徒四人的冒险之旅',
          tags: ['西游', '陕西皮影', '冒险'],
          views: '28.5万',
          likes: '19.2万',
          rating: '10.0',
          category: '经典名段'
        },
        {
          emoji: '🌙',
          title: '嫦娥奔月',
          artist: '山东皮影传承人 范正安',
          description: '古老神话的现代诠释，月宫仙子的故事',
          tags: ['神话', '山东皮影', '传统'],
          views: '14.6万',
          likes: '11.3万',
          rating: '9.8',
          category: '大师风采'
        },
        {
          emoji: '⚔️',
          title: '岳飞传·精忠报国',
          artist: '河北皮影艺术团',
          description: '民族英雄的壮烈故事，激荡人心的旋律',
          tags: ['历史', '河北皮影', '英雄'],
          views: '19.7万',
          likes: '14.5万',
          rating: '9.9',
          category: '经典名段'
        }
      ]
    };
  },
  computed: {
    filteredItems() {
      if (this.activeFilter === '全部') {
        return this.items;
      }
      return this.items.filter(item => item.category === this.activeFilter);
    }
  }
};
</script>

<style scoped>
/* ========== 全局样式 ========== */
.journal-wrapper {
  min-height: 100vh;
  background: linear-gradient(to bottom, #faf8f4, #f5f1e8);
  position: relative;
  padding: 40px 20px;
  overflow: hidden;
}

/* 背景光效 */
.background-glow {
  position: fixed;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(212, 175, 55, 0.05) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

/* ========== 英雄区域 ========== */
.hero-section {
  position: relative;
  z-index: 1;
  text-align: center;
  margin-bottom: 60px;
  padding: 60px 40px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(245, 241, 232, 1));
  border-radius: 16px;
  border: 1px solid rgba(212, 175, 55, 0.2);
  animation: fadeInDown 0.8s ease-out;
}

.hero-title {
  font-size: 72px;
  font-weight: 900;
  color: #2a1b15;
  font-family: "Noto Serif SC", serif;
  letter-spacing: 8px;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #2a1b15 0%, #6d4c41 50%, #2a1b15 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.1);
  animation: titleGlow 3s ease-in-out infinite;
}

@keyframes titleGlow {
  0%, 100% {
    text-shadow: 0 0 20px rgba(212, 175, 55, 0.1);
  }
  50% {
    text-shadow: 0 0 30px rgba(212, 175, 55, 0.15);
  }
}

.hero-subtitle {
  font-size: 24px;
  color: #6d4c41;
  font-family: "Noto Serif SC", serif;
  letter-spacing: 4px;
  margin-bottom: 12px;
  font-weight: 600;
}

.hero-desc {
  font-size: 16px;
  color: #8b6f47;
  letter-spacing: 2px;
  font-weight: 500;
}

/* ========== 筛选栏 ========== */
.filter-section {
  position: relative;
  z-index: 1;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
}

.filter-container {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-btn {
  padding: 10px 24px;
  background: rgba(255, 229, 163, 0.15);
  border: 2px solid #8d704a;
  border-radius: 24px;
  color: #6d4c41;
  font-family: "Noto Serif SC", serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 1px;
}

.filter-btn:hover {
  border-color: #d4af37;
  color: #2a1b15;
  background: rgba(255, 229, 163, 0.25);
}

.filter-btn.active {
  background: linear-gradient(135deg, #d4af37 0%, #e8c547 100%);
  border-color: #d4af37;
  color: #2a1b15;
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.2);
}

/* ========== 画廊网格 ========== */
.gallery-section {
  position: relative;
  z-index: 1;
  margin-bottom: 60px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 32px;
  max-width: 1400px;
  margin: 0 auto;
}

/* ========== 卡片样式 ========== */
.gallery-card {
  position: relative;
  height: 480px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: cardFadeIn 0.6s ease-out;
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(245, 241, 232, 1));
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 16px;
}

/* 古风纹路 */
.card-background::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    /* 皮影剪影纹路 */
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CpatternId='shadowPattern' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M20,30 Q30,20 40,30 Q50,40 60,30 Q70,20 80,30' stroke='rgba(141,112,74,0.08)' fill='none' stroke-width='0.8'/%3E%3Cpath d='M10,60 Q20,50 30,60 Q40,70 50,60 Q60,50 70,60 Q80,70 90,60' stroke='rgba(141,112,74,0.06)' fill='none' stroke-width='0.8'/%3E%3Ccircle cx='25' cy='25' r='3' fill='rgba(141,112,74,0.1)'/%3E%3Ccircle cx='75' cy='75' r='3' fill='rgba(141,112,74,0.1)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='200' height='200' fill='url(%23shadowPattern)'/%3E%3C/svg%3E"),
    /* 斜纹 */
    repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(141, 112, 74, 0.04) 2px, rgba(141, 112, 74, 0.04) 4px);
  background-size: 100px 100px, 100% 100%;
  opacity: 0.5;
  pointer-events: none;
  border-radius: 16px;
}

.card-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.06) 0%, transparent 70%);
  border-radius: 16px;
}

.card-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.1) 100%
  );
  border-radius: 16px;
}

.card-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px;
}

/* 影像区 */
.image-area {
  position: relative;
  flex: 0 0 160px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-frame {
  width: 140px;
  height: 140px;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%);
  border: 2px solid rgba(212, 175, 55, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.image-frame::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.08) 50%, transparent 70%);
  animation: shimmer 3s infinite;
}

.image-frame::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10,10 Q20,5 30,10 T50,10' stroke='rgba(141,112,74,0.15)' fill='none' stroke-width='0.5'/%3E%3Cpath d='M10,30 Q20,25 30,30 T50,30' stroke='rgba(141,112,74,0.15)' fill='none' stroke-width='0.5'/%3E%3Cpath d='M10,50 Q20,45 30,50 T50,50' stroke='rgba(141,112,74,0.15)' fill='none' stroke-width='0.5'/%3E%3Cpath d='M10,70 Q20,65 30,70 T50,70' stroke='rgba(141,112,74,0.15)' fill='none' stroke-width='0.5'/%3E%3C/svg%3E");
  border-radius: 12px;
  pointer-events: none;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.image-emoji {
  font-size: 80px;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.play-button {
  position: absolute;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #d4af37 0%, #ffd700 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #2a1b15;
  font-weight: bold;
  box-shadow: 0 8px 24px rgba(212, 175, 55, 0.4);
  animation: playPulse 1.5s ease-in-out infinite;
  z-index: 3;
}

@keyframes playPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 8px 24px rgba(212, 175, 55, 0.4);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 12px 32px rgba(212, 175, 55, 0.6);
  }
}

/* 信息区 */
.info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.card-title {
  font-size: 18px;
  font-weight: 800;
  color: #2a1b15;
  font-family: "Noto Serif SC", serif;
  margin-bottom: 6px;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-artist {
  font-size: 12px;
  color: #6d4c41;
  font-weight: 600;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.card-desc {
  font-size: 13px;
  color: #8b6f47;
  line-height: 1.5;
  margin-bottom: 12px;
  flex: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* 标签 */
.tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.tag {
  display: inline-block;
  padding: 4px 10px;
  background: rgba(255, 229, 163, 0.15);
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 12px;
  font-size: 11px;
  color: #6d4c41;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* 统计信息 */
.stats {
  display: flex;
  gap: 16px;
  padding-top: 12px;
  border-top: 1px solid rgba(212, 175, 55, 0.1);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #8b6f47;
}

.stat-icon {
  font-size: 14px;
}

.stat-value {
  font-weight: 600;
  color: #6d4c41;
}

/* 悬停效果 */
.hover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(42, 27, 21, 0.85) 0%, rgba(42, 27, 21, 0.75) 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  animation: overlayFadeIn 0.3s ease-out;
}

@keyframes overlayFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.action-btn {
  padding: 14px 32px;
  background: linear-gradient(135deg, #d4af37 0%, #ffd700 100%);
  border: none;
  border-radius: 24px;
  color: #2a1b15;
  font-weight: 800;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  letter-spacing: 2px;
  font-family: "Noto Serif SC", serif;
  box-shadow: 0 8px 24px rgba(212, 175, 55, 0.4);
}

.action-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 12px 32px rgba(212, 175, 55, 0.6);
}

.gallery-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 60px rgba(212, 175, 55, 0.3);
}

.gallery-card:hover .image-frame {
  border-color: #d4af37;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(212, 175, 55, 0.1) 100%);
}

/* ========== 加载更多 ========== */
.load-more-section {
  position: relative;
  z-index: 1;
  text-align: center;
  margin-top: 60px;
}

.load-more-btn {
  padding: 16px 48px;
  background: linear-gradient(135deg, #d4af37 0%, #ffd700 100%);
  border: 2px solid #ffd700;
  border-radius: 28px;
  color: #2a1b15;
  font-weight: 800;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  letter-spacing: 2px;
  font-family: "Noto Serif SC", serif;
  box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);
}

.load-more-btn:hover {
  transform: scale(1.05) translateY(-2px);
  box-shadow: 0 12px 36px rgba(212, 175, 55, 0.5);
}

/* ========== 动画 ========== */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .hero-title {
    font-size: 48px;
    letter-spacing: 4px;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .gallery-card {
    height: 420px;
  }

  .filter-container {
    gap: 8px;
  }

  .filter-btn {
    padding: 8px 16px;
    font-size: 12px;
  }
}
</style>