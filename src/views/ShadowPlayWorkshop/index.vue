<template>
  <div class="workshop-container">
    <!-- ========== 1. 英雄区域 (Hero) ========== -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">影戏工坊</h1>
        <p class="hero-subtitle">在此地，你可以创作属于自己的皮影故事</p>
        <p class="hero-desc">选择角色 · 设计服饰 · 编排动作 · 讲述传奇</p>
      </div>
      <div class="hero-visual">
        <div class="puppet-silhouette"></div>
      </div>
    </section>

    <!-- ========== 2. 功能导航卡片 ========== -->
    <section class="functions-grid" v-if="currentView === 'main'">
      <div
        v-for="(func, index) in functions"
        :key="index"
        class="function-card"
        @mouseenter="activeFunc = index"
        @mouseleave="activeFunc = null"
      >
        <div class="card-icon">{{ func.icon }}</div>
        <h3 class="card-title">{{ func.title }}</h3>
        <p class="card-text">{{ func.desc }}</p>
        <button class="card-btn" @click="openFunction(func.id)">
          {{ func.buttonText }}
        </button>
      </div>
    </section>

    <!-- ========== 3. 角色选择器 ========== -->
    <section class="characters-section" v-if="currentView === 'characters'">
      <div class="section-header">
        <h2>📜 选择角色原型</h2>
        <p>从经典皮影角色中选择你的主角</p>
      </div>

      <div class="characters-grid">
        <div
          v-for="(char, index) in characters"
          :key="index"
          class="character-card"
          :class="{ selected: selectedCharacter === index }"
          @click="selectedCharacter = index"
        >
          <div class="char-preview">{{ char.emoji }}</div>
          <h4>{{ char.name }}</h4>
          <p class="char-desc">{{ char.description }}</p>
          <div class="char-traits">
            <span v-for="trait in char.traits" :key="trait" class="trait">{{ trait }}</span>
          </div>
        </div>
      </div>

      <div v-if="selectedCharacter !== null" class="character-detail">
        <h3>{{ characters[selectedCharacter].name }}</h3>
        <p>{{ characters[selectedCharacter].fullDesc }}</p>
        <button class="btn-primary" @click="goToDesigner">定制此角色 →</button>
      </div>
    </section>

    <!-- ========== 4. 设计器 (Designer) ========== -->
    <section class="designer-section" v-if="currentView === 'designer'">
      <div class="section-header">
        <h2>🎨 角色定制器</h2>
        <p>为你的皮影人物穿上独特的服饰</p>
      </div>

      <div class="designer-layout">
        <div class="preview-panel">
          <div class="puppet-preview">
            <div class="puppet-figure" :style="puppetStyle">
              <div class="puppet-head">👤</div>
              <div class="puppet-body">{{ selectedCharacter !== null ? characters[selectedCharacter].emoji : '🎭' }}</div>
            </div>
          </div>
          <p class="preview-label">实时预览</p>
        </div>

        <div class="controls-panel">
          <div class="control-group">
            <label>角色颜色</label>
            <div class="color-picker">
              <input
                v-for="color in colors"
                :key="color"
                type="radio"
                :value="color"
                v-model="puppetColor"
              />
              <div class="color-display" :style="{ backgroundColor: puppetColor }"></div>
            </div>
          </div>

          <div class="control-group">
            <label>服饰图案</label>
            <div class="pattern-selector">
              <button
                v-for="pattern in patterns"
                :key="pattern"
                :class="['pattern-btn', { active: puppetPattern === pattern }]"
                @click="puppetPattern = pattern"
              >
                {{ pattern }}
              </button>
            </div>
          </div>

          <div class="control-group">
            <label>配饰</label>
            <div class="accessory-selector">
              <label v-for="acc in accessories" :key="acc" class="checkbox-label">
                <input type="checkbox" :value="acc" v-model="puppetAccessories" />
                {{ acc }}
              </label>
            </div>
          </div>

          <button class="btn-primary large" @click="saveDesign">保存设计 💾</button>
          <button class="btn-secondary" @click="backToMain">← 返回首页</button>
        </div>
      </div>
    </section>

    <!-- ========== 5. 动作编排 ========== -->
    <section class="animation-section" v-if="currentView === 'animation'">
      <div class="section-header">
        <h2>🎬 动作编排</h2>
        <p>为你的角色设计优美的动作序列</p>
      </div>

      <div class="animation-editor">
        <div class="animation-preview">
          <div class="stage">
            <div class="puppet-animate" :class="['action-' + currentAction]">
              {{ selectedCharacter !== null ? characters[selectedCharacter].emoji : '🎭' }}
            </div>
          </div>
          <p class="animation-info">当前动作: {{ currentAction }}</p>
        </div>

        <div class="action-library">
          <h4>动作库</h4>
          <div class="action-grid">
            <button
              v-for="action in actions"
              :key="action"
              :class="['action-btn', { active: currentAction === action }]"
              @click="playAction(action)"
            >
              {{ action }}
            </button>
          </div>
        </div>

        <div class="timeline">
          <h4>时间轴编辑</h4>
          <div class="timeline-track">
            <div
              v-for="(frame, index) in timeline"
              :key="index"
              :class="['timeline-frame', { active: currentFrame === index }]"
              @click="currentFrame = index"
            >
              {{ index + 1 }}
            </div>
          </div>
          <button class="btn-primary" @click="addTimelineFrame">+ 添加关键帧</button>
        </div>
      </div>

      <button class="btn-secondary" @click="backToMain">← 返回首页</button>
    </section>

    <!-- ========== 6. 教程区 ========== -->
    <section class="tutorial-section" v-if="currentView === 'tutorial'">
      <div class="section-header">
        <h2>📚 皮影工艺教程</h2>
        <p>学习传统皮影的制作技艺</p>
      </div>

      <div class="tutorial-tabs">
        <button
          v-for="tab in tutorialTabs"
          :key="tab"
          :class="['tab-btn', { active: activeTutorialTab === tab }]"
          @click="activeTutorialTab = tab"
        >
          {{ tab }}
        </button>
      </div>

      <div class="tutorial-content">
        <div v-if="activeTutorialTab === '基础制作'" class="tutorial-item">
          <h3>🔨 基础皮影制作步骤</h3>
          <div class="steps">
            <div v-for="(step, index) in basicSteps" :key="index" class="step">
              <span class="step-number">{{ index + 1 }}</span>
              <div class="step-content">
                <h4>{{ step.title }}</h4>
                <p>{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTutorialTab === '着色技法'" class="tutorial-item">
          <h3>🎨 传统着色技法</h3>
          <div class="techniques">
            <div v-for="tech in colorTechs" :key="tech.name" class="technique">
              <h4>{{ tech.name }}</h4>
              <p>{{ tech.desc }}</p>
              <span class="technique-tag">{{ tech.tag }}</span>
            </div>
          </div>
        </div>

        <div v-if="activeTutorialTab === '历史文化'" class="tutorial-item">
          <h3>📖 皮影戏的历史演变</h3>
          <div class="history">
            <p>皮影戏是中国最古老的影子戏，起源于春秋时代，距今已有2000多年的历史。它是中国民间传统艺术中的瑰宝，被誉为"光影艺术"的鼻祖。</p>
            <div class="history-timeline">
              <div v-for="era in historyEras" :key="era.period" class="era">
                <span class="era-name">{{ era.period }}</span>
                <p>{{ era.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button class="btn-secondary" @click="backToMain">← 返回首页</button>
    </section>

    <!-- ========== 7. 作品展示 ========== -->
    <section class="gallery-section" v-if="currentView === 'gallery'">
      <div class="section-header">
        <h2>🖼️ 社区作品展</h2>
        <p>欣赏来自全球的精美皮影创作</p>
      </div>

      <div class="gallery-grid">
        <div v-for="work in communityWorks" :key="work.id" class="gallery-item">
          <div class="work-image">{{ work.emoji }}</div>
          <h4>{{ work.title }}</h4>
          <p class="artist">创作者: {{ work.artist }}</p>
          <p class="description">{{ work.description }}</p>
          <div class="likes">❤️ {{ work.likes }}</div>
        </div>
      </div>

      <button class="btn-secondary" @click="backToMain">← 返回首页</button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ShadowPlayWorkshop',
  data() {
    return {
      currentView: 'main', // main / characters / designer / animation / tutorial / gallery
      activeFunc: null,
      selectedCharacter: null,
      currentAction: 'stand',
      currentFrame: 0,
      activeTutorialTab: '基础制作',

      // 颜色和样式
      puppetColor: '#d4af37',
      puppetPattern: '锦纹',
      puppetAccessories: [],
      colors: ['#d4af37', '#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3'],
      patterns: ['锦纹', '云纹', '花纹', '波纹', '几何纹'],
      accessories: ['冠帽', '腰带', '手饰', '脸饰', '飘带'],

      // 动作库
      actions: ['站立', '行走', '舞蹈', '挥手', '叩拜', '惊讶'],
      timeline: [1, 2, 3, 4, 5],

      // 功能模块
      functions: [
        {
          id: 'characters',
          icon: '👥',
          title: '选择角色',
          desc: '从经典皮影人物中选择你的创作主角',
          buttonText: '开始选择'
        },
        {
          id: 'designer',
          icon: '🎨',
          title: '角色定制',
          desc: '自定义服饰配色和图案设计',
          buttonText: '进入编辑器'
        },
        {
          id: 'animation',
          icon: '🎬',
          title: '动作编排',
          desc: '为角色编排精彩的动作序列',
          buttonText: '编排动作'
        },
        {
          id: 'tutorial',
          icon: '📚',
          title: '工艺教程',
          desc: '学习传统皮影的制作技艺',
          buttonText: '查看教程'
        },
        {
          id: 'gallery',
          icon: '🖼️',
          title: '作品展示',
          desc: '欣赏社区创意作品',
          buttonText: '浏览展示'
        }
      ],

      // 角色数据
      characters: [
        {
          name: '英雄武士',
          emoji: '⚔️',
          description: '勇敢的战士',
          traits: ['勇敢', '正义', '力量'],
          fullDesc: '这是一位传统的英雄武士形象，代表着正义与勇敢。适合制作英勇的故事主角。'
        },
        {
          name: '优雅仕女',
          emoji: '👸',
          description: '温柔的贵妇',
          traits: ['优雅', '聪慧', '柔情'],
          fullDesc: '古典仕女，仪态万千，是许多浪漫故事的主人公。'
        },
        {
          name: '狡黠狐妖',
          emoji: '🦊',
          description: '神秘的妖精',
          traits: ['聪慧', '神秘', '调皮'],
          fullDesc: '灵动的狐妖，具有超自然的力量，常在民间故事中现身。'
        },
        {
          name: '佛道高僧',
          emoji: '🧘',
          description: '智慧的圣贤',
          traits: ['智慧', '慈悲', '神圣'],
          fullDesc: '修为深厚的道士或和尚，常为故事中的指引者。'
        },
        {
          name: '调皮童子',
          emoji: '👦',
          description: '顽皮的少年',
          traits: ['活力', '天真', '调皮'],
          fullDesc: '充满朝气的少年角色，适合喜剧或冒险故事。'
        }
      ],

      // 教程数据
      basicSteps: [
        {
          title: '准备材料',
          desc: '准备牛皮纸、刻刀、颜料等基础材料，确保工具锋利。'
        },
        {
          title: '绘制设计图',
          desc: '根据角色形象，在皮纸上绘制清晰的线稿，注意比例。'
        },
        {
          title: '精细刻画',
          desc: '用刻刀沿着线稿仔细刻画，动作要轻，避免破损。'
        },
        {
          title: '着色润色',
          desc: '用传统着色技法给皮影上色，使其更加生动。'
        },
        {
          title: '安装操纵杆',
          desc: '在皮影背后安装木质操纵杆，确保活动灵活。'
        }
      ],

      colorTechs: [
        {
          name: '透光着色',
          desc: '在皮纸背面用透光的颜料着色，使光线能透过呈现出彩色效果。',
          tag: '传统技法'
        },
        {
          name: '分层着色',
          desc: '将不同部位用不同颜色的皮纸拼接，实现复杂的色彩搭配。',
          tag: '高级技法'
        },
        {
          name: '套色拓印',
          desc: '使用多个模板依次拓印不同颜色，层层叠加形成精美图案。',
          tag: '艺术技法'
        }
      ],

      historyEras: [
        {
          period: '春秋战国',
          desc: '皮影戏的起源时期，最早的记载出现在古籍中。'
        },
        {
          period: '汉唐时期',
          desc: '皮影戏得到广泛传播和发展，形成多种地方风格。'
        },
        {
          period: '宋元明清',
          desc: '皮影戏进入繁荣期，诞生了许多经典剧目和大师。'
        },
        {
          period: '现代当代',
          desc: '结合现代技术，皮影戏焕发新生，走向国际舞台。'
        }
      ],

      // 社区作品
      communityWorks: [
        {
          id: 1,
          emoji: '🦋',
          title: '蝴蝶仙子',
          artist: '梦境工坊',
          description: '用传统皮影手法诠释蝴蝶精灵的故事',
          likes: 1234
        },
        {
          id: 2,
          emoji: '🐉',
          title: '龙王传说',
          artist: '光影阁',
          description: '气势恢宏的龙王形象，威仪万千',
          likes: 2156
        },
        {
          id: 3,
          emoji: '🎪',
          title: '江湖杂耍',
          artist: '民间艺人',
          description: '市井生活中的趣味故事',
          likes: 987
        },
        {
          id: 4,
          emoji: '🌸',
          title: '春日物语',
          artist: '诗意空间',
          description: '唯美的春景诗意表现',
          likes: 1654
        },
        {
          id: 5,
          emoji: '🎭',
          title: '经典聊斋',
          artist: '传统继承者',
          description: '聊斋故事的皮影新演绎',
          likes: 1876
        },
        {
          id: 6,
          emoji: '🏯',
          title: '古城往事',
          artist: '文化传承',
          description: '历史文化的光影记录',
          likes: 1432
        }
      ]
    };
  },

  computed: {
    puppetStyle() {
      return {
        color: this.puppetColor,
        borderColor: this.puppetColor
      };
    }
  },

  methods: {
    openFunction(funcId) {
      this.currentView = funcId;
      if (funcId === 'designer' && this.selectedCharacter === null) {
        this.selectedCharacter = 0;
      }
    },

    goToDesigner() {
      this.currentView = 'designer';
    },

    playAction(action) {
      this.currentAction = action;
    },

    addTimelineFrame() {
      this.timeline.push(this.timeline.length + 1);
    },

    saveDesign() {
      alert('✓ 设计已保存！');
      // 这里可以连接实际的保存逻辑
    },

    backToMain() {
      this.currentView = 'main';
      this.selectedCharacter = null;
    }
  }
};
</script>

<style scoped>
/* ========== 全局变量 ========== */
:root {
  --gold: #d4af37;
  --dark: #2a1b15;
  --light-gold: #ffd700;
  --accent: #ff6b6b;
}

.workshop-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f1e8 0%, #ede8df 100%);
  padding: 20px;
  font-family: "Noto Serif SC", serif;
}

/* ========== 1. 英雄区域 ========== */
.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto 80px;
  padding: 60px 40px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(212, 175, 55, 0.1));
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(212, 175, 55, 0.15);
}

.hero-content h1 {
  font-size: 64px;
  font-weight: 800;
  color: var(--dark);
  margin-bottom: 24px;
  background: linear-gradient(135deg, #d4af37, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 24px;
  color: var(--dark);
  margin-bottom: 12px;
  font-weight: 600;
}

.hero-desc {
  font-size: 16px;
  color: #8b6f47;
  margin-bottom: 30px;
  letter-spacing: 2px;
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.puppet-silhouette {
  width: 280px;
  height: 280px;
  background: linear-gradient(135deg, #e8dcc8 0%, #f5f1e8 50%, #e8dcc8 100%);
  border-radius: 50%;
  position: relative;
  box-shadow:
    0 0 30px rgba(107, 68, 35, 0.15),
    0 0 60px rgba(107, 68, 35, 0.08),
    inset 0 0 30px rgba(255, 255, 255, 0.3);
  animation: float 4s ease-in-out infinite, subtleGlow 3s ease-in-out infinite;
  border: 2px solid rgba(107, 68, 35, 0.2);
}

/* 古风纹路 */
.puppet-silhouette::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(107, 68, 35, 0.08) 0%, transparent 50%),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CpatternId='pattern' x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M10,10 Q20,5 30,10 T50,10' stroke='rgba(107,68,35,0.1)' fill='none' stroke-width='0.5'/%3E%3Cpath d='M10,20 Q20,15 30,20 T50,20' stroke='rgba(107,68,35,0.1)' fill='none' stroke-width='0.5'/%3E%3Cpath d='M10,30 Q20,25 30,30 T50,30' stroke='rgba(107,68,35,0.1)' fill='none' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='200' height='200' fill='url(%23pattern)'/%3E%3C/svg%3E");
  border-radius: 50%;
  pointer-events: none;
}

/* 内层光晕 */
.puppet-silhouette::after {
  content: '';
  position: absolute;
  inset: 20px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  animation: subtlePulse 2.5s ease-in-out infinite;
}

@keyframes subtleGlow {
  0%, 100% {
    box-shadow:
      0 0 30px rgba(107, 68, 35, 0.15),
      0 0 60px rgba(107, 68, 35, 0.08),
      inset 0 0 30px rgba(255, 255, 255, 0.3);
  }
  50% {
    box-shadow:
      0 0 40px rgba(107, 68, 35, 0.2),
      0 0 80px rgba(107, 68, 35, 0.1),
      inset 0 0 30px rgba(255, 255, 255, 0.4);
  }
}

@keyframes subtlePulse {
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.4;
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotateZ(-5deg); }
  50% { transform: translateY(-20px) rotateZ(5deg); }
}

/* ========== 2. 功能卡片网格 ========== */
.functions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto 80px;
  padding: 0 20px;
}

.function-card {
  background: linear-gradient(135deg, #e8dcc8 0%, #f5f1e8 50%, #e8dcc8 100%);
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
  border: 2px solid #c9b8a0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

/* 古风纹路背景 */
.function-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(107, 68, 35, 0.03) 2px, rgba(107, 68, 35, 0.03) 4px),
    repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(107, 68, 35, 0.02) 2px, rgba(107, 68, 35, 0.02) 4px),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20,20 Q30,30 40,20 T60,20' stroke='rgba(107,68,35,0.08)' fill='none' stroke-width='0.5'/%3E%3Cpath d='M20,40 Q30,50 40,40 T60,40' stroke='rgba(107,68,35,0.08)' fill='none' stroke-width='0.5'/%3E%3Cpath d='M20,60 Q30,70 40,60 T60,60' stroke='rgba(107,68,35,0.08)' fill='none' stroke-width='0.5'/%3E%3C/svg%3E");
  background-size: 100px 100px;
  opacity: 0.8;
  pointer-events: none;
  border-radius: 12px;
}

/* 低调光效 */
.function-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(255, 255, 255, 0.05) 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.02) 75%,
    transparent 100%
  );
  background-size: 200% 200%;
  animation: subtleShimmer 4s ease-in-out infinite;
  pointer-events: none;
  border-radius: 12px;
}

@keyframes subtleShimmer {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}

.function-card:hover {
  transform: translateY(-8px);
  border-color: #a89080;
  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.12),
    inset 0 0 12px rgba(212, 175, 55, 0.08);
  background: linear-gradient(135deg, #f0e8d8 0%, #faf7f0 50%, #f0e8d8 100%);
}

.card-icon {
  display: none;
}

.card-title {
  font-size: 28px;
  color: #2a1b15;
  margin-bottom: 16px;
  font-weight: 900;
  position: relative;
  z-index: 2;
  font-family: "Noto Serif SC", serif;
  letter-spacing: 3px;

  /* 书法字效果 */
  background: linear-gradient(
    135deg,
    #2a1b15 0%,
    #6d4c41 25%,
    #8d704a 50%,
    #6d4c41 75%,
    #2a1b15 100%
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  /* 反光效果 */
  text-shadow:
    0 0 20px rgba(212, 175, 55, 0.3),
    0 0 40px rgba(212, 175, 55, 0.15);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));

  /* 动画 */
  animation: calligraphyShine 3s ease-in-out infinite;
}

@keyframes calligraphyShine {
  0%, 100% {
    background-position: 0% 0%;
    text-shadow:
      0 0 20px rgba(212, 175, 55, 0.3),
      0 0 40px rgba(212, 175, 55, 0.15);
  }
  50% {
    background-position: 100% 100%;
    text-shadow:
      0 0 30px rgba(212, 175, 55, 0.5),
      0 0 60px rgba(212, 175, 55, 0.25);
  }
}

.card-text {
  font-size: 14px;
  color: #6d4c41;
  margin-bottom: 28px;
  line-height: 1.8;
  position: relative;
  z-index: 2;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.card-btn {
  padding: 12px 28px;
  background: linear-gradient(135deg, #8d704a 0%, #a89080 100%);
  border: 2px solid #8d704a;
  border-radius: 24px;
  color: #f5f1e8;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 15px;
  position: relative;
  z-index: 2;
  letter-spacing: 2px;
  font-family: "Noto Serif SC", serif;

  /* 书法字效果 */
  background: linear-gradient(135deg, #6d4c41 0%, #8d704a 50%, #a89080 100%);
  background-size: 200% 200%;

  /* 反光效果 */
  box-shadow:
    0 4px 12px rgba(107, 68, 35, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.card-btn:hover {
  background: linear-gradient(135deg, #5d3c2b 0%, #7d5c3a 50%, #9d7d6a 100%);
  border-color: #5d3c2b;
  transform: scale(1.08) translateY(-2px);
  box-shadow:
    0 8px 20px rgba(107, 68, 35, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

/* ========== 3. 通用区域样式 ========== */
.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-header h2 {
  font-size: 42px;
  color: var(--dark);
  margin-bottom: 12px;
  font-weight: 800;
}

.section-header p {
  font-size: 16px;
  color: #8b6f47;
  letter-spacing: 1px;
}

/* ========== 4. 角色选择 ========== */
.characters-section {
  max-width: 1200px;
  margin: 0 auto 80px;
  padding: 0 20px;
}

.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 48px;
}

.character-card {
  background: white;
  border: 2px solid #e8e0d5;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.character-card:hover {
  transform: translateY(-8px);
  border-color: var(--gold);
  box-shadow: 0 12px 32px rgba(212, 175, 55, 0.15);
}

.character-card.selected {
  border-color: var(--gold);
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.05), rgba(255, 215, 0, 0.05));
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2);
}

.char-preview {
  font-size: 64px;
  margin-bottom: 16px;
}

.character-card h4 {
  font-size: 18px;
  color: var(--dark);
  margin-bottom: 8px;
  font-weight: 700;
}

.char-desc {
  font-size: 13px;
  color: #8b6f47;
  margin-bottom: 12px;
}

.char-traits {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: center;
}

.trait {
  display: inline-block;
  background: rgba(212, 175, 55, 0.1);
  color: var(--gold);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.character-detail {
  background: white;
  border: 2px solid var(--gold);
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  margin-bottom: 40px;
}

.character-detail h3 {
  font-size: 32px;
  color: var(--dark);
  margin-bottom: 16px;
}

.character-detail p {
  font-size: 16px;
  color: #8b6f47;
  margin-bottom: 24px;
  line-height: 1.8;
}

/* ========== 5. 设计器 ========== */
.designer-section {
  max-width: 1200px;
  margin: 0 auto 80px;
  padding: 0 20px;
}

.designer-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.preview-panel {
  background: white;
  border-radius: 12px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #e8e0d5;
}

.puppet-preview {
  width: 240px;
  height: 300px;
  background: linear-gradient(135deg, #fffdf5, #f0e9dd);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
}

.puppet-preview::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.05) 100%);
  pointer-events: none;
}

.puppet-figure {
  font-size: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
}

.puppet-head {
  font-size: 48px;
}

.puppet-body {
  font-size: 80px;
}

.preview-label {
  font-size: 14px;
  color: #8b6f47;
  font-weight: 600;
}

.controls-panel {
  background: white;
  border-radius: 12px;
  padding: 32px;
  border: 2px solid #e8e0d5;
}

.control-group {
  margin-bottom: 32px;
}

.control-group label {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 16px;
}

.color-picker {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.color-picker input {
  display: none;
}

.color-picker input + .color-display {
  display: inline-block;
}

.color-display {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 2px solid #e8e0d5;
  cursor: pointer;
  transition: all 0.3s;
}

.color-picker input:checked + .color-display {
  border-color: var(--gold);
  transform: scale(1.15);
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
}

.pattern-selector,
.accessory-selector {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pattern-btn {
  padding: 10px 16px;
  background: #f5f1e8;
  border: 2px solid #e8e0d5;
  border-radius: 8px;
  color: var(--dark);
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
}

.pattern-btn:hover {
  border-color: var(--gold);
}

.pattern-btn.active {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--dark);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
}

.checkbox-label input {
  cursor: pointer;
}

/* ========== 6. 动作编排 ========== */
.animation-section {
  max-width: 1200px;
  margin: 0 auto 80px;
  padding: 0 20px;
}

.animation-editor {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.animation-preview {
  background: white;
  border-radius: 12px;
  padding: 40px;
  border: 2px solid #e8e0d5;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stage {
  width: 200px;
  height: 300px;
  background: linear-gradient(135deg, #fffdf5, #f0e9dd);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
}

.puppet-animate {
  font-size: 100px;
  display: inline-block;
}

.puppet-animate.action-stand {
  animation: stand 1s ease-in-out;
}

.puppet-animate.action-walk {
  animation: walk 1.5s ease-in-out infinite;
}

.puppet-animate.action-dance {
  animation: dance 2s ease-in-out infinite;
}

@keyframes stand {
  0%, 100% { transform: translateY(0); }
}

@keyframes walk {
  0%, 100% { transform: translateX(0) rotateZ(-2deg); }
  50% { transform: translateX(20px) rotateZ(2deg); }
}

@keyframes dance {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
}

.animation-info {
  font-size: 14px;
  color: #8b6f47;
  font-weight: 600;
}

.action-library,
.timeline {
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 2px solid #e8e0d5;
}

.action-library h4,
.timeline h4 {
  font-size: 16px;
  color: var(--dark);
  margin-bottom: 16px;
  font-weight: 700;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.action-btn {
  padding: 12px;
  background: #f5f1e8;
  border: 2px solid #e8e0d5;
  border-radius: 8px;
  color: var(--dark);
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
  font-size: 14px;
}

.action-btn:hover {
  border-color: var(--gold);
  transform: translateY(-2px);
}

.action-btn.active {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--dark);
}

.timeline-track {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.timeline-frame {
  width: 40px;
  height: 40px;
  background: #f5f1e8;
  border: 2px solid #e8e0d5;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
  font-size: 12px;
}

.timeline-frame:hover {
  border-color: var(--gold);
}

.timeline-frame.active {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--dark);
}

/* ========== 7. 教程 ========== */
.tutorial-section {
  max-width: 1200px;
  margin: 0 auto 80px;
  padding: 0 20px;
}

.tutorial-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
  justify-content: center;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 12px 24px;
  background: white;
  border: 2px solid #e8e0d5;
  border-radius: 20px;
  color: var(--dark);
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
  font-size: 14px;
}

.tab-btn:hover {
  border-color: var(--gold);
}

.tab-btn.active {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--dark);
}

.tutorial-content {
  background: white;
  border-radius: 12px;
  padding: 40px;
  border: 2px solid #e8e0d5;
  margin-bottom: 40px;
}

.tutorial-item h3 {
  font-size: 28px;
  color: var(--dark);
  margin-bottom: 24px;
  font-weight: 700;
}

.steps {
  display: grid;
  gap: 24px;
}

.step {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 20px;
  padding: 20px;
  background: #f5f1e8;
  border-radius: 8px;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: var(--gold);
  border-radius: 50%;
  color: var(--dark);
  font-size: 24px;
  font-weight: 700;
  flex-shrink: 0;
}

.step-content h4 {
  font-size: 18px;
  color: var(--dark);
  margin-bottom: 8px;
  font-weight: 700;
}

.step-content p {
  font-size: 14px;
  color: #8b6f47;
  line-height: 1.6;
}

.techniques {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.technique {
  padding: 24px;
  background: #f5f1e8;
  border-radius: 8px;
  border-left: 4px solid var(--gold);
}

.technique h4 {
  font-size: 18px;
  color: var(--dark);
  margin-bottom: 12px;
  font-weight: 700;
}

.technique p {
  font-size: 14px;
  color: #8b6f47;
  margin-bottom: 12px;
  line-height: 1.6;
}

.technique-tag {
  display: inline-block;
  background: var(--gold);
  color: var(--dark);
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.history {
  margin-bottom: 30px;
}

.history > p {
  font-size: 16px;
  color: #8b6f47;
  line-height: 1.8;
  margin-bottom: 24px;
}

.history-timeline {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.era {
  padding: 20px;
  background: #f5f1e8;
  border-radius: 8px;
  border-top: 3px solid var(--gold);
}

.era-name {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: var(--gold);
  margin-bottom: 8px;
}

.era p {
  font-size: 13px;
  color: #8b6f47;
  line-height: 1.6;
}

/* ========== 8. 画廊 ========== */
.gallery-section {
  max-width: 1200px;
  margin: 0 auto 80px;
  padding: 0 20px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.gallery-item {
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 2px solid #e8e0d5;
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;
}

.gallery-item:hover {
  transform: translateY(-12px);
  border-color: var(--gold);
  box-shadow: 0 16px 40px rgba(212, 175, 55, 0.2);
}

.work-image {
  font-size: 80px;
  margin-bottom: 16px;
}

.gallery-item h4 {
  font-size: 18px;
  color: var(--dark);
  margin-bottom: 8px;
  font-weight: 700;
}

.artist {
  font-size: 13px;
  color: var(--gold);
  margin-bottom: 12px;
  font-weight: 600;
}

.description {
  font-size: 14px;
  color: #8b6f47;
  margin-bottom: 16px;
  line-height: 1.6;
}

.likes {
  font-size: 14px;
  color: var(--accent);
  font-weight: 700;
}

/* ========== 9. 通用按钮 ========== */
.btn-primary,
.btn-secondary {
  padding: 12px 32px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  margin-right: 16px;
}

.btn-primary {
  background: linear-gradient(135deg, var(--gold), var(--light-gold));
  color: var(--dark);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);
}

.btn-primary.large {
  padding: 16px 40px;
  font-size: 18px;
  width: 100%;
  margin-right: 0;
  margin-bottom: 12px;
}

.btn-secondary {
  background: white;
  border: 2px solid #e8e0d5;
  color: var(--dark);
}

.btn-secondary:hover {
  border-color: var(--gold);
  color: var(--gold);
}

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .hero-section {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .hero-content h1 {
    font-size: 40px;
  }

  .designer-layout,
  .animation-editor {
    grid-template-columns: 1fr;
  }

  .functions-grid {
    grid-template-columns: 1fr;
  }

  .characters-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .action-grid {
    grid-template-columns: 1fr;
  }

  .step {
    grid-template-columns: 50px 1fr;
  }
}
</style>
