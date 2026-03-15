<template>
  <div class="culture-container">
    <!-- ========== 1. 开篇 ========== -->
    <section class="opening-section">
      <div class="opening-decoration">
        <div class="deco-line top"></div>
      </div>

      <div class="opening-content">
        <h1 class="opening-title">文化百科</h1>
        <div class="opening-divider">
          <span class="divider-ornament"></span>
        </div>
        <p class="opening-subtitle">皮影戏——光影之间的千年诗篇</p>
        <p class="opening-text">
          皮影戏是中华文明中最古老、最诗意的艺术形式之一。<br>
          它以兽皮镂刻而成的人物剪影，在白布屏幕与灯火之间，<br>
          将历史、民俗、美学交织成一幅幅流动的画卷。
        </p>
      </div>

      <div class="opening-decoration">
        <div class="deco-line bottom"></div>
      </div>
    </section>

    <!-- ========== 2. 流派介绍 - 3D轮播 ========== -->
    <section class="schools-section">
      <div class="section-header">
        <h2>皮影流派</h2>
        <p class="section-subtitle">各具特色的地域艺术</p>
      </div>

      <div class="schools-carousel-container">
        <div class="schools-carousel-wrapper" ref="schoolsCarouselWrapper">
          <div class="schools-carousel-track">
            <div
              v-for="(school, index) in schools"
              :key="school.id"
              class="schools-carousel-item"
              :style="getSchoolsCarouselItemStyle(index)"
            >
              <div class="school-card" :style="{ '--accent-color': school.color }">
                <div class="school-header">
                  <span class="school-name">{{ school.name }}</span>
                  <span class="school-region">{{ school.region }}</span>
                </div>

                <div class="school-icon" :class="'icon-' + school.id"></div>

                <p class="school-desc">{{ school.description }}</p>

                <div class="school-features">
                  <div v-for="feature in school.features" :key="feature" class="feature-tag">
                    {{ feature }}
                  </div>
                </div>

                <p class="school-detail">{{ school.detail }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="schools-carousel-controls">
          <button class="carousel-btn prev" @click="rotateSchoolsCarousel(-1)">◀</button>
          <button class="carousel-btn next" @click="rotateSchoolsCarousel(1)">▶</button>
        </div>
      </div>
    </section>

    <!-- ========== 3. 历史演变 - 卷轴长河 ========== -->
    <section class="history-section">
      <div class="section-header">
        <h2>历史渊源</h2>
        <p class="section-subtitle">光影岁月的古卷长河</p>
      </div>

      <div class="timeline-river-scroll">
        <!-- 卷轴透视河流 -->
        <div class="river-perspective">
          <div class="river-distant"></div>
          <div class="river-mid"></div>
          <div class="river-near"></div>

          <!-- 时间节点 -->
          <div class="timeline-items">
            <div
              v-for="(era, index) in timeline"
              :key="index"
              class="timeline-node"
              :class="{ 'node-right': index % 2 === 0, 'node-left': index % 2 === 1 }"
              :style="{ '--delay': index * 0.1 + 's' }"
            >
              <!-- 水滴装饰 -->
              <div class="node-water-drop"></div>

              <!-- 连接线 -->
              <div class="node-connector"></div>

              <!-- 时间点圆形 -->
              <div class="node-marker">
                <div class="marker-inner"></div>
              </div>

              <!-- 内容卡片 -->
              <div class="timeline-content-card">
                <div class="era-period">{{ era.period }}</div>
                <h3 class="era-title">{{ era.title }}</h3>
                <p class="era-text">{{ era.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 4. 工艺特色 ========== -->
    <section class="craft-section">
      <div class="section-header">
        <h2>工艺特色</h2>
        <p class="section-subtitle">传统手工艺的精妙之处</p>
      </div>

      <div class="craft-grid">
        <div v-for="craft in craftFeatures" :key="craft.id" class="craft-item">
          <div class="craft-icon" :class="'craft-icon-' + craft.id"></div>
          <h3>{{ craft.title }}</h3>
          <p>{{ craft.description }}</p>
        </div>
      </div>
    </section>

    <!-- ========== 5. 文化意义 - 翻页书籍 ========== -->
    <section class="culture-book-section">
      <div class="section-header">
        <h2>文化意义</h2>
        <p class="section-subtitle">打开光影文化的古籍</p>
      </div>

      <div class="book-container">
        <div class="book-spine"></div>

        <div class="book-pages">
          <div
            v-for="(item, index) in significances"
            :key="item.id"
            class="book-page"
            :class="{ 'page-active': index < 3 }"
            :style="{ '--page-index': index }"
          >
            <div class="page-left">
              <div class="page-number">{{ String(index + 1).padStart(2, '0') }}</div>
            </div>

            <div class="page-right">
              <div class="page-content">
                <h3 class="page-title">{{ item.title }}</h3>
                <p class="page-text">{{ item.content }}</p>
              </div>

              <!-- 页面装饰 -->
              <div class="page-ornament"></div>
            </div>
          </div>
        </div>

        <div class="book-controls">
          <button class="book-btn prev" @click="currentPage = Math.max(0, currentPage - 2)">◀ 上一页</button>
          <span class="page-indicator">{{ currentPage + 1 }} - {{ currentPage + 2 }} / {{ significances.length }}</span>
          <button class="book-btn next" @click="currentPage = Math.min(significances.length - 2, currentPage + 2)">下一页 ▶</button>
        </div>
      </div>
    </section>

    <!-- ========== 6. 名家大师 ========== -->
    <section class="masters-section">
      <div class="section-header">
        <h2>名家大师</h2>
        <p class="section-subtitle">光影舞台上的艺术巨匠</p>
      </div>

      <div class="masters-grid">
        <div v-for="master in masters" :key="master.id" class="master-card">
          <div class="master-avatar" :class="'master-icon-' + master.id"></div>
          <div class="master-info">
            <h4>{{ master.name }}</h4>
            <p class="master-era">{{ master.era }}</p>
            <p class="master-desc">{{ master.description }}</p>
            <div class="master-achievement">{{ master.achievement }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 7. 经典剧目 - 3D轮播 ========== -->
    <section class="classics-section">
      <div class="section-header">
        <h2>经典剧目</h2>
        <p class="section-subtitle">代代相传的精品故事</p>
      </div>

      <div class="carousel-container">
        <div class="carousel-wrapper" ref="carouselWrapper">
          <div class="carousel-track">
            <div
              v-for="(classic, index) in classicPlays"
              :key="classic.id"
              class="carousel-item"
              :style="getCarouselItemStyle(index)"
            >
              <div class="classic-card">
                <div class="classic-number">{{ classic.id }}</div>
                <h3>{{ classic.title }}</h3>
                <p class="classic-series">{{ classic.series }}</p>
                <p class="classic-synopsis">{{ classic.synopsis }}</p>
                <div class="classic-tags">
                  <span v-for="tag in classic.tags" :key="tag" class="classic-tag">{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-controls">
          <button class="carousel-btn prev" @click="rotateCarousel(-1)">◀</button>
          <button class="carousel-btn next" @click="rotateCarousel(1)">▶</button>
        </div>
      </div>
    </section>

    <!-- ========== 8. 尾声 ========== -->
    <section class="closing-section">
      <div class="closing-decoration">
        <div class="deco-pattern"></div>
      </div>

      <div class="closing-content">
        <p>
          皮影戏以最简朴的物质——皮、布、灯、火——<br>
          创造了最诗意的精神境界。<br>
          在光与影的流转中，讲述着民族的故事，<br>
          传承着文明的记忆。
        </p>
      </div>

      <div class="closing-decoration">
        <div class="deco-pattern"></div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'CultureEncyclopedia',
  data() {
    return {
      carouselRotation: 0,
    carouselIndex: 0,
      schoolsCarouselRotation: 0,
    schoolsCarouselIndex: 0,
      currentPage: 0,
      isInitialized: false,
      animationDuration: 0.6,
      // 皮影流派
      schools: [
        {
          id: 1,
          name: '华县皮影',
          region: '陕西 华县',
          color: '#d4af37',
          emoji: '🎭',
          description: '中国皮影艺术的重要分支',
          features: ['人物高大', '刻工精细', '色彩艳丽', '表现力强'],
          detail: '华县皮影起源于秦汉，造型高大秀丽，刻工细致入微。人物多达一千余个，故事内容包括历史、民间传说等，技艺精湛，是中国传统皮影的典范。'
        },
        {
          id: 2,
          name: '陇东皮影',
          region: '甘肃 陇东',
          color: '#ff6b6b',
          emoji: '🏜️',
          description: '西北高原的光影艺术',
          features: ['粗犷有力', '造型独特', '音乐悠扬', '故事厚重'],
          detail: '陇东皮影保留了古老的表演传统，人物造型粗犷有力，具有明显的地域特征。唱腔深沉，伴奏以三弦、月琴为主，展现西北的民族风情。'
        },
        {
          id: 3,
          name: '唐山皮影',
          region: '河北 唐山',
          color: '#4ecdc4',
          emoji: '🏛️',
          description: '北方皮影的杰出代表',
          features: ['刀法凌厉', '线条流畅', '神韵独特', '传承完整'],
          detail: '唐山皮影融合了中原文化与辽西特色，人物造型秀美，动作表现力强。其雕刻技艺精湛，刀法多样，创造出丰富的视觉效果。'
        },
        {
          id: 4,
          name: '泸州皮影',
          region: '四川 泸州',
          color: '#ffe66d',
          emoji: '🌊',
          description: '南方皮影的典型代表',
          features: ['身段优美', '色彩绚丽', '故事丰富', '方言生动'],
          detail: '泸州皮影南北合璧，人物造型优美娴雅，色彩运用丰富大胆。方言幽默，音乐活泼，具有浓厚的地方民俗特色和生活气息。'
        },
        {
          id: 5,
          name: '孝感皮影',
          region: '湖北 孝感',
          color: '#95e1d3',
          emoji: '🎪',
          description: '长江流域的传统技艺',
          features: ['精巧细致', '表现细腻', '音韵优美', '故事深邃'],
          detail: '孝感皮影传承了中原文化，人物造型精巧别致，面部表情丰富。伴奏音乐典雅，唱腔清亮，能够很好地诠释经典故事和民间传说。'
        },
        {
          id: 6,
          name: '昆明皮影',
          region: '云南 昆明',
          color: '#c7b3e5',
          emoji: '🏞️',
          description: '西南民族文化的融合',
          features: ['色彩热烈', '民族特色', '故事独特', '工艺精良'],
          detail: '昆明皮影受云南多民族文化影响，色彩应用大胆热烈，具有鲜明的民族特色。人物形象多样，故事内容丰富，工艺精良。'
        }
      ],

      // 历史年表
      timeline: [
        {
          period: '春秋战国',
          title: '皮影的起源',
          description: '皮影戏最早起源于中国，是影子戏中最古老的形式。据考证，皮影戏的原型可以追溯到春秋战国时期，当时人们用兽皮制作的人物剪影来进行祭祀活动。'
        },
        {
          period: '汉 代',
          title: '初步发展',
          description: '汉代时期，皮影戏已逐渐演变成娱乐性的表演艺术。宫廷和民间都开始流行皮影表演，成为重要的文化活动和社交娱乐方式。'
        },
        {
          period: '唐 宋 期',
          title: '繁荣昌盛',
          description: '唐宋时期是皮影戏发展的黄金时代。表演技艺不断完善，故事情节更加复杂精彩，皮影戏成为上至皇室下至平民都喜爱的艺术形式，传播到中亚和欧洲。'
        },
        {
          period: '元 明 清',
          title: '高度成熟',
          description: '元明清时期，皮影戏达到了艺术成熟期。各地流派争奇斗艳，出现了许多著名的艺人和剧目。表演形式更加规范，艺术表现力达到了前所未有的高度。'
        },
        {
          period: '近现代',
          title: '传承创新',
          description: '近现代以来，皮影戏在保持传统精髓的基础上，不断进行创新。结合新的叙事方式和表现手法，创作出更多反映时代精神的新剧目，使这一古老艺术焕发新的生命力。'
        },
        {
          period: '当 代',
          title: '复兴发展',
          description: '当代，皮影戏受到国家和社会的高度重视，被列为非物质文化遗产。通过文化保护、教育传承和创新实践，皮影戏在新时代中重新获得了生命力，走向世界舞台。'
        }
      ],

      // 工艺特色
      craftFeatures: [
        {
          id: 1,
          icon: '🔪',
          title: '雕刻工艺',
          description: '精妙的刀工是皮影制作的核心。艺人用十余种刀具，在厚度仅2毫米的皮张上进行镂空雕刻，每一笔都要精确到毫厘。'
        },
        {
          id: 2,
          icon: '🎨',
          title: '着色技艺',
          description: '采用透光性强的矿物颜料进行着色，每个人物需要数种颜色。着色讲究"浓淡相宜、冷暖相生"，使皮影在光影中呈现绚丽的色彩。'
        },
        {
          id: 3,
          icon: '🎭',
          title: '操纵技法',
          description: '皮影的每个部位都有活动关节。操纵者需要熟练控制头、身、臂、腿等多个关节，创造出自然流畅的动作表演。'
        },
        {
          id: 4,
          icon: '🎵',
          title: '音乐伴奏',
          description: '皮影表演配以传统音乐。三弦、月琴、打鼓等乐器营造出古韵悠长的氛围，音乐与表演相得益彰。'
        },
        {
          id: 5,
          icon: '💡',
          title: '灯光运用',
          description: '灯火的位置、强弱直接影响投影效果。艺人需要根据情节灵活调控灯光，创造出动感逼真的光影效果。'
        },
        {
          id: 6,
          icon: '🎬',
          title: '表演编排',
          description: '一场精彩的皮影戏需要精心编排。故事线索、人物关系、动作设计都要经过深思熟虑，使整个演出既有艺术美感又有故事张力。'
        }
      ],

      // 文化意义
      significances: [
        {
          id: 1,
          title: '民俗记录',
          content: '皮影戏是活的民俗文化档案，记录了不同时代的社会风俗、民间信仰、生活方式。通过剧目和表演，我们可以了解古代人民的精神世界。'
        },
        {
          id: 2,
          title: '艺术创新',
          content: '皮影戏在舞蹈、音乐、美术等多个领域进行了探索和创新。它的造型艺术和表现手法对后世的戏曲、动画等艺术形式产生了深远影响。'
        },
        {
          id: 3,
          title: '美学启蒙',
          content: '皮影戏体现了中国传统美学的核心理念——简约、意象、虚实相生。用最少的物质手段表达最丰富的精神内涵，彰显了东方美学的独特魅力。'
        },
        {
          id: 4,
          title: '文化交流',
          content: '皮影戏作为中国文化的重要载体，曾经通过丝绸之路传入中亚、西亚、欧洲等地，深刻影响了世界各地的戏剧文化发展。'
        },
        {
          id: 5,
          title: '教育功能',
          content: '皮影戏通过通俗易懂的故事传递道德教育。忠孝仁义、因果报应等传统价值观在剧目中得到了生动的表现和传承。'
        },
        {
          id: 6,
          title: '精神寄托',
          content: '皮影戏满足了人民群众对精神生活的需求。在光影交错的舞台上，观众们找到了共鸣，体验了情感的宣泄和心灵的慰藉。'
        }
      ],

      // 名家大师
      masters: [
        {
          id: 1,
          name: '汪天喜',
          era: '民国时期',
          avatar: '🎭',
          description: '华县皮影的杰出传人',
          achievement: '创新了人物造型，扩展了表演技艺，将华县皮影推向了艺术巅峰'
        },
        {
          id: 2,
          name: '王福全',
          era: '20世纪中期',
          avatar: '🎪',
          description: '陇东皮影的一代宗师',
          achievement: '掌握了传统精髓，创作了多部经典剧目，培养了大批接班人'
        },
        {
          id: 3,
          name: '陈玉茹',
          era: '当代',
          avatar: '✨',
          description: '唐山皮影的传承人',
          achievement: '致力于皮影艺术的保护与创新，将传统技艺融入当代表达'
        },
        {
          id: 4,
          name: '李景德',
          era: '当代',
          avatar: '🌟',
          description: '泸州皮影的代表人物',
          achievement: '创作出多部融合现代元素的新剧目，为皮影戏的复兴做出重要贡献'
        }
      ],

      // 经典剧目
      classicPlays: [
        {
          id: 1,
          title: '千里驹',
          series: '三国演义系列',
          synopsis: '讲述赵子龙在乱世中保护少主刘禅逃脱险境的故事，充满了忠义精神和英雄气概。',
          tags: ['三国', '忠义', '冒险', '经典']
        },
        {
          id: 2,
          title: '火焰山',
          series: '西游记系列',
          synopsis: '取经队伍经过火焰山，与铁扇公主、牛魔王等角色的精彩互动，充满了想象力和趣味性。',
          tags: ['西游', '神话', '冒险', '喜剧']
        },
        {
          id: 3,
          title: '白蛇传',
          series: '民间传说系列',
          synopsis: '白蛇化为人形与许仙相爱，却遭法海阻挠的爱情悲剧。故事感人肺腑，蕴含深邃的人文关怀。',
          tags: ['爱情', '民间', '悲剧', '诗意']
        },
        {
          id: 4,
          title: '孙悟空三打白骨精',
          series: '西游记系列',
          synopsis: '孙悟空与白骨精的三番交手，充满了紧张刺激的情节和精妙的表演技巧。',
          tags: ['西游', '冒险', '武打', '经典']
        },
        {
          id: 5,
          title: '嫦娥奔月',
          series: '神话传说系列',
          synopsis: '讲述嫦娥为保护神仙丹药而奔向月宫的故事，饱含了对爱情和善良的礼赞。',
          tags: ['神话', '爱情', '悲美', '传统']
        },
        {
          id: 6,
          title: '杨家将',
          series: '历史英雄系列',
          synopsis: '北宋名将杨家的故事，展现了家族的忠烈和古代武士的风骨，是皮影戏中的重头戏。',
          tags: ['历史', '英雄', '忠义', '恢宏']
        }
      ]
    };
  },

  mounted() {
    // 初始化动画：卡片从中心散开
    this.$nextTick(() => {
      setTimeout(() => {
        this.isInitialized = true;
      }, 100);
    });
  },

  methods: {
    getCarouselItemStyle(index) {
      const totalItems = this.classicPlays.length;
      const itemsPerView = 3;
      const relativeIndex = (index - this.carouselIndex + totalItems) % totalItems;

      let position = relativeIndex;
      if (position >= itemsPerView) {
        position -= totalItems;
      }

      const isVisible = position >= 0 && position < itemsPerView;
      const x = (position - 1) * 320;
      const opacity = isVisible ? 1 : 0;
      const pointerEvents = isVisible ? 'auto' : 'none';

      return {
        transform: `translateX(${x}px)`,
        opacity: opacity,
        pointerEvents: pointerEvents,
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
      };
    },

    rotateCarousel(direction) {
      const totalItems = this.classicPlays.length;
      this.carouselIndex = (this.carouselIndex + direction + totalItems) % totalItems;
    },

    getSchoolsCarouselItemStyle(index) {
      const totalItems = this.schools.length;
      const itemsPerView = 3;
      const relativeIndex = (index - this.schoolsCarouselIndex + totalItems) % totalItems;

      let position = relativeIndex;
      if (position >= itemsPerView) {
        position -= totalItems;
      }

      const isVisible = position >= 0 && position < itemsPerView;
      const x = (position - 1) * 320;
      const opacity = isVisible ? 1 : 0;
      const pointerEvents = isVisible ? 'auto' : 'none';

      return {
        transform: `translateX(${x}px)`,
        opacity: opacity,
        pointerEvents: pointerEvents,
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
      };
    },

    rotateSchoolsCarousel(direction) {
      const totalItems = this.schools.length;
      this.schoolsCarouselIndex = (this.schoolsCarouselIndex + direction + totalItems) % totalItems;
    }
  }
};
</script>

<style scoped>
/* ========== 全局变量 ========== */
:root {
  --gold: #d4af37;
  --dark: #2a1b15;
  --accent: #ff6b6b;
  --light-bg: #f5f1e8;
  --border-color: #e8e0d5;
  --text-secondary: #8b6f47;
}

.culture-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #faf8f4, #f5f1e8);
  font-family: "Noto Serif SC", serif;
  overflow-x: hidden;
}

/* ========== 1. 开篇区域 ========== */
.opening-section {
  position: relative;
  max-width: 900px;
  margin: 80px auto 120px;
  padding: 80px 40px;
  text-align: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(212, 175, 55, 0.05));
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 0;
  box-shadow: 0 4px 20px rgba(42, 27, 21, 0.08);
}

.opening-decoration {
  position: relative;
  height: 20px;
  margin-bottom: 40px;
}

.deco-line {
  height: 1px;
  background: linear-gradient(to right, transparent, var(--gold), transparent);
  position: relative;
}

.deco-line::after {
  content: '';
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  background: var(--gold);
  border-radius: 50%;
}

.deco-line.bottom::before {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  width: 30px;
  height: 30px;
  border: 1px solid var(--gold);
  border-radius: 50%;
  transform: translateX(-50%);
  opacity: 0.3;
}

.opening-title {
  font-size: 56px;
  font-weight: 800;
  color: var(--dark);
  margin: 20px 0;
  letter-spacing: 4px;
}

.opening-divider {
  position: relative;
  width: 100px;
  height: 2px;
  background: linear-gradient(to right, transparent, var(--gold), transparent);
  margin: 24px auto;
}

.divider-ornament {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 24px;
  border: 2px solid var(--gold);
  border-radius: 50%;
  background: repeating-conic-gradient(
    from 0deg,
    var(--gold) 0deg 90deg,
    transparent 90deg 180deg
  );
  opacity: 0.5;
}

.opening-subtitle {
  font-size: 20px;
  color: var(--gold);
  font-weight: 600;
  margin-bottom: 24px;
  letter-spacing: 2px;
}

.opening-text {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 0;
}

/* ========== 2. 流派介绍 ========== */
.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-header h2 {
  font-size: 48px;
  font-weight: 800;
  color: var(--dark);
  margin-bottom: 12px;
  position: relative;
  display: inline-block;
}

.section-header h2::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 2px;
  background: var(--gold);
}

.section-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  letter-spacing: 2px;
  margin-top: 24px;
}

.schools-section {
  max-width: 1200px;
  margin: 0 auto 100px;
  padding: 0 20px;
}

/* 3D轮播容器 - 改为网格 */
.schools-carousel-container {
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 0 auto 40px;
  perspective: none;
}

.schools-carousel-wrapper {
  position: relative;
  width: 100%;
  height: auto;
  margin-bottom: 0;
}

.schools-carousel-track {
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  gap: 24px;
  padding: 0;
  justify-content: center;
}

.schools-carousel-item {
  position: relative;
  width: 280px;
  height: auto;
  flex-shrink: 0;
  animation: fadeInUp 0.6s ease-out both;
}

.schools-carousel-item:nth-child(1) { animation-delay: 0.1s; }
.schools-carousel-item:nth-child(2) { animation-delay: 0.2s; }
.schools-carousel-item:nth-child(3) { animation-delay: 0.3s; }
.schools-carousel-item:nth-child(4) { animation-delay: 0.4s; }
.schools-carousel-item:nth-child(5) { animation-delay: 0.5s; }
.schools-carousel-item:nth-child(6) { animation-delay: 0.6s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


.schools-carousel-controls {
  display: none;
}

.school-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(245, 241, 232, 1));
  border: 1px solid var(--border-color);
  border-top: 4px solid var(--accent-color);
  border-radius: 8px;
  padding: 24px 18px;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
  height: 100%;
  min-height: 380px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  backface-visibility: hidden;
}

.school-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.05), transparent);
  transition: left 0.6s;
  pointer-events: none;
}

.schools-carousel-item:hover .school-card {
  border-color: var(--accent-color);
  box-shadow: 0 16px 48px rgba(212, 175, 55, 0.25);
  transform: translateY(-4px);
}

.schools-carousel-item:hover .school-card::before {
  left: 100%;
}

.school-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.school-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--dark);
}

.school-region {
  font-size: 12px;
  color: var(--gold);
  background: rgba(212, 175, 55, 0.1);
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 600;
}

.school-icon {
  width: 80px;
  height: 80px;
  margin: 12px auto;
  position: relative;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.school-card:hover .school-icon {
  opacity: 1;
}

/* 华县皮影 - 古代宫殿纹样 */
.icon-1 {
  background:
    linear-gradient(45deg, transparent 48%, var(--gold) 48%, var(--gold) 52%, transparent 52%),
    linear-gradient(-45deg, transparent 48%, var(--gold) 48%, var(--gold) 52%, transparent 52%);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
  border: 2px solid var(--gold);
  border-radius: 8px;
}

/* 陇东皮影 - 云纹 */
.icon-2::before,
.icon-2::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 50%;
  border: 2px solid var(--gold);
  border-radius: 50%;
}

.icon-2::before {
  top: 0;
  border-bottom: none;
}

.icon-2::after {
  bottom: 0;
  border-top: none;
}

/* 唐山皮影 - 回纹 */
.icon-3 {
  border: 2px solid var(--gold);
  background:
    linear-gradient(90deg, var(--gold) 0%, var(--gold) 25%, transparent 25%, transparent 75%, var(--gold) 75%),
    linear-gradient(0deg, var(--gold) 0%, var(--gold) 25%, transparent 25%, transparent 75%, var(--gold) 75%);
  background-size: 100% 100%;
  box-shadow: inset 0 0 0 6px white, inset 0 0 0 8px var(--gold);
}

/* 泸州皮影 - 波纹 */
.icon-4 {
  background:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 8px,
      var(--gold) 8px,
      var(--gold) 10px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 8px,
      var(--gold) 8px,
      var(--gold) 10px
    );
  border-radius: 50%;
  border: 2px solid var(--gold);
}

/* 孝感皮影 - 花纹 */
.icon-5 {
  background: radial-gradient(circle at center, transparent 20%, var(--gold) 20%, var(--gold) 22%, transparent 22%),
              radial-gradient(circle at 25% 25%, transparent 15%, var(--gold) 15%, var(--gold) 17%, transparent 17%),
              radial-gradient(circle at 75% 25%, transparent 15%, var(--gold) 15%, var(--gold) 17%, transparent 17%),
              radial-gradient(circle at 25% 75%, transparent 15%, var(--gold) 15%, var(--gold) 17%, transparent 17%),
              radial-gradient(circle at 75% 75%, transparent 15%, var(--gold) 15%, var(--gold) 17%, transparent 17%);
  border: 2px solid var(--gold);
  border-radius: 50%;
}

/* 昆明皮影 - 几何纹 */
.icon-6 {
  background:
    linear-gradient(135deg, var(--gold) 25%, transparent 25%) -10px 0,
    linear-gradient(225deg, var(--gold) 25%, transparent 25%) -10px 0,
    linear-gradient(315deg, var(--gold) 25%, transparent 25%),
    linear-gradient(45deg, var(--gold) 25%, transparent 25%);
  background-size: 20px 20px;
  background-color: rgba(212, 175, 55, 0.1);
  border: 2px solid var(--gold);
  border-radius: 4px;
}

.school-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 12px;
}

.school-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.feature-tag {
  display: inline-block;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05));
  color: var(--gold);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid rgba(212, 175, 55, 0.2);
}

.school-detail {
  font-size: 12px;
  color: #9d7e5d;
  line-height: 1.5;
  margin: 0;
  flex-grow: 1;
  display: flex;
  align-items: flex-end;
}

/* ========== 3. 历史时间线 - 简化版 ========== */
.history-section {
  max-width: 1100px;
  margin: 0 auto 100px;
  padding: 0 20px;
}

.timeline-river-scroll {
  position: relative;
  padding: 60px 0;
}

.river-perspective {
  position: relative;
  width: 100%;
}

/* 隐藏河流效果 */
.river-distant,
.river-mid,
.river-near {
  display: none;
}

/* 时间节点容器 */
.timeline-items {
  position: relative;
  padding: 0;
  max-width: 900px;
  margin: 0 auto;
}

.timeline-node {
  position: relative;
  margin-bottom: 60px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 40px;
  align-items: center;
  animation: slideIn 0.8s ease-out both;
  animation-delay: var(--delay);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 左边节点 */
.timeline-node.node-left {
  grid-template-columns: 1fr auto 1fr;
}

.timeline-node.node-left .timeline-content-card {
  grid-column: 1;
  text-align: right;
}

/* 右边节点 */
.timeline-node.node-right {
  grid-template-columns: 1fr auto 1fr;
}

.timeline-node.node-right .timeline-content-card {
  grid-column: 3;
  text-align: left;
}

/* 水滴装饰 */
.node-water-drop {
  position: absolute;
  left: 50%;
  top: -30px;
  transform: translateX(-50%);
  width: 12px;
  height: 16px;
  background: linear-gradient(180deg, var(--gold), rgba(212, 175, 55, 0.5));
  border-radius: 50% 50% 50% 0;
  opacity: 0.4;
  animation: dropFall 3s ease-in infinite;
  animation-delay: var(--delay);
}

@keyframes dropFall {
  0% {
    transform: translateX(-50%) translateY(-30px);
    opacity: 0;
  }
  20% {
    opacity: 0.4;
  }
  80% {
    opacity: 0.4;
  }
  100% {
    transform: translateX(-50%) translateY(100px);
    opacity: 0;
  }
}

/* 连接线 */
.node-connector {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 3px;
  background: linear-gradient(to right, var(--gold), transparent);
  opacity: 0.3;
}

.timeline-node.node-right .node-connector {
  background: linear-gradient(to left, var(--gold), transparent);
}

/* 中心时间标记 */
.node-marker {
  grid-column: 2;
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.marker-inner {
  width: 16px;
  height: 16px;
  background: white;
  border: 3px solid var(--gold);
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(212, 175, 55, 0.4);
  animation: pulseMarker 2s ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes pulseMarker {
  0%, 100% {
    box-shadow: 0 0 12px rgba(212, 175, 55, 0.4);
  }
  50% {
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.8);
  }
}

/* 内容卡片 */
.timeline-content-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(212, 175, 55, 0.02));
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-left: 3px solid var(--gold);
  padding: 20px;
  border-radius: 4px;
  transition: all 0.3s;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  position: relative;
}

.timeline-node.node-right .timeline-content-card {
  border-left: none;
  border-right: 3px solid var(--gold);
}

.timeline-content-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(to right, var(--gold), transparent);
  opacity: 0.5;
  border-radius: 4px 4px 0 0;
}

.timeline-node.node-right .timeline-content-card::before {
  background: linear-gradient(to left, var(--gold), transparent);
}

.timeline-content-card:hover {
  border-color: var(--gold);
  box-shadow: 0 8px 24px rgba(212, 175, 55, 0.15);
  transform: translateY(-4px);
}

.era-period {
  font-size: 11px;
  color: var(--gold);
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 8px;
  display: block;
}

.era-title {
  font-size: 18px;
  color: var(--dark);
  margin: 8px 0 12px;
  font-weight: 700;
}

.era-text {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* 河流终点 - 消失点 */
.river-end {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 60px;
  background:
    radial-gradient(ellipse 40px 30px at center, rgba(212, 175, 55, 0.4), transparent 70%);
  opacity: 0.6;
  filter: blur(3px);
  animation: riverEndFlow 3s ease-in infinite;
}

@keyframes riverEndFlow {
  0% { opacity: 0.4; filter: blur(2px); }
  50% { opacity: 0.8; filter: blur(3px); }
  100% { opacity: 0.4; filter: blur(2px); }
}

/* ========== 4. 工艺特色网格 ========== */
.craft-section {
  max-width: 1200px;
  margin: 0 auto 100px;
  padding: 0 20px;
}

.craft-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.craft-item {
  background: white;
  border: 1px solid var(--border-color);
  padding: 32px 24px;
  text-align: center;
  border-radius: 4px;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.craft-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}

.craft-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(212, 175, 55, 0.15);
}

.craft-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 16px;
  position: relative;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.craft-item:hover .craft-icon {
  opacity: 1;
}

/* 雕刻工艺 - 刀纹 */
.craft-icon-1 {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 6px,
    var(--gold) 6px,
    var(--gold) 8px
  );
  border-left: 3px solid var(--gold);
  border-right: 3px solid var(--gold);
}

/* 着色技艺 - 彩纹 */
.craft-icon-2 {
  background:
    linear-gradient(0deg, #ff6b6b 0%, #ff6b6b 20%, transparent 20%),
    linear-gradient(0deg, #4ecdc4 20%, #4ecdc4 40%, transparent 40%),
    linear-gradient(0deg, var(--gold) 40%, var(--gold) 60%, transparent 60%),
    linear-gradient(0deg, #ffe66d 60%, #ffe66d 80%, transparent 80%),
    linear-gradient(0deg, #95e1d3 80%, #95e1d3 100%);
  border: 2px solid var(--gold);
  border-radius: 4px;
}

/* 操纵技法 - 关节纹 */
.craft-icon-3::before,
.craft-icon-3::after {
  content: '';
  position: absolute;
}

.craft-icon-3::before {
  width: 60px;
  height: 6px;
  background: repeating-linear-gradient(
    90deg,
    var(--gold),
    var(--gold) 8px,
    transparent 8px,
    transparent 12px
  );
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.craft-icon-3::after {
  width: 6px;
  height: 60px;
  background: repeating-linear-gradient(
    180deg,
    var(--gold),
    var(--gold) 8px,
    transparent 8px,
    transparent 12px
  );
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 音乐伴奏 - 音纹 */
.craft-icon-4 {
  background:
    radial-gradient(circle at 30% 30%, var(--gold) 3px, transparent 3px),
    radial-gradient(circle at 70% 40%, var(--gold) 4px, transparent 4px),
    radial-gradient(circle at 50% 60%, var(--gold) 3.5px, transparent 3.5px),
    radial-gradient(circle at 40% 75%, var(--gold) 4px, transparent 4px);
  border: 2px solid var(--gold);
  border-radius: 50%;
}

/* 灯光运用 - 光纹 */
.craft-icon-5 {
  background:
    radial-gradient(circle at center, var(--gold) 0%, var(--gold) 8px, transparent 8%);
  border: 2px solid var(--gold);
  border-radius: 50%;
  box-shadow:
    inset 0 0 0 12px rgba(212, 175, 55, 0.1),
    inset 0 0 0 14px var(--gold);
}

/* 表演编排 - 舞纹 */
.craft-icon-6 {
  background:
    linear-gradient(45deg, var(--gold) 25%, transparent 25%, transparent 75%, var(--gold) 75%),
    linear-gradient(-45deg, var(--gold) 25%, transparent 25%, transparent 75%, var(--gold) 75%);
  background-size: 24px 24px;
  background-position: 0 0, 12px 12px;
  border: 2px solid var(--gold);
  border-radius: 2px;
}

.craft-item h3 {
  font-size: 18px;
  color: var(--dark);
  margin-bottom: 12px;
  font-weight: 700;
}

.craft-item p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* ========== 5. 文化意义 - 卡片网格 ========== */
.culture-book-section {
  max-width: 1200px;
  margin: 0 auto 100px;
  padding: 0 20px;
}

.book-container {
  position: relative;
  max-width: 100%;
  margin: 40px auto;
}

/* 隐藏书脊 */
.book-spine {
  display: none;
}

/* 书页容器 - 改为卡片网格 */
.book-pages {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  height: auto;
}

.book-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  background: linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(245, 241, 232, 1));
  border: 1px solid var(--border-color);
  border-top: 4px solid var(--gold);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  position: relative;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-style: preserve-3d;
  opacity: 1;
  pointer-events: auto;
  transform: translateX(0) rotateY(0) scale(1);
  padding: 32px;
  animation: fadeInUp 0.6s ease-out both;
}

.book-page:nth-child(1) { animation-delay: 0.1s; }
.book-page:nth-child(2) { animation-delay: 0.2s; }
.book-page:nth-child(3) { animation-delay: 0.3s; }
.book-page:nth-child(4) { animation-delay: 0.4s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.book-page.page-active {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(0) rotateY(0) scale(1);
}

.book-page:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(212, 175, 55, 0.15);
}

/* 页面编号左页 - 隐藏 */
.page-left {
  display: none;
}

/* 页面内容右页 */
.page-right {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0;
  position: relative;
  width: 100%;
}

.page-content {
  width: 100%;
}

.page-title {
  font-size: 18px;
  color: var(--dark);
  margin-bottom: 16px;
  font-weight: 700;
  border-bottom: 2px solid var(--gold);
  padding-bottom: 12px;
}

.page-text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 0;
  text-align: left;
}

/* 页面装饰 */
.page-ornament {
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  background:
    linear-gradient(45deg, transparent 48%, var(--gold) 48%, var(--gold) 52%, transparent 52%),
    linear-gradient(-45deg, transparent 48%, var(--gold) 48%, var(--gold) 52%, transparent 52%);
  background-size: 8px 8px;
  opacity: 0.2;
}

/* 书籍控制按钮 - 隐藏 */
.book-controls {
  display: none;
}

.page-indicator {
  font-size: 14px;
  color: var(--gold);
  font-weight: 600;
  letter-spacing: 1px;
}

/* ========== 6. 名家大师 ========== */
.masters-section {
  max-width: 1200px;
  margin: 0 auto 100px;
  padding: 0 20px;
}

.masters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}

.master-card {
  background: white;
  border: 1px solid var(--border-color);
  border-top: 3px solid var(--gold);
  padding: 24px;
  text-align: center;
  border-radius: 4px;
  transition: all 0.3s;
}

.master-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(212, 175, 55, 0.15);
}

.master-avatar {
  width: 100px;
  height: 100px;
  margin: 0 auto 16px;
  position: relative;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.master-card:hover .master-avatar {
  opacity: 1;
}

/* 汪天喜 - 宫殿纹 */
.master-icon-1 {
  border: 3px solid var(--gold);
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 8px,
    var(--gold) 8px,
    var(--gold) 10px
  );
  border-radius: 8px;
}

/* 王福全 - 古道纹 */
.master-icon-2 {
  background:
    linear-gradient(0deg, transparent 45%, var(--gold) 45%, var(--gold) 55%, transparent 55%),
    linear-gradient(90deg, transparent 45%, var(--gold) 45%, var(--gold) 55%, transparent 55%);
  border: 2px solid var(--gold);
}

/* 陈玉茹 - 菱纹 */
.master-icon-3 {
  background:
    linear-gradient(45deg, var(--gold) 25%, transparent 25%, transparent 75%, var(--gold) 75%),
    linear-gradient(-45deg, var(--gold) 25%, transparent 25%, transparent 75%, var(--gold) 75%);
  background-size: 30px 30px;
  border: 2px solid var(--gold);
  border-radius: 50%;
}

/* 李景德 - 云纹 */
.master-icon-4::before,
.master-icon-4::after {
  content: '';
  position: absolute;
  background: var(--gold);
}

.master-icon-4::before {
  width: 70px;
  height: 8px;
  top: 20px;
  left: 15px;
  border-radius: 10px;
  opacity: 0.5;
}

.master-icon-4::after {
  width: 70px;
  height: 8px;
  bottom: 20px;
  left: 15px;
  border-radius: 10px;
  opacity: 0.5;
}

.master-icon-4 {
  border: 2px solid var(--gold);
  border-radius: 50%;
}

.master-card h4 {
  font-size: 18px;
  color: var(--dark);
  margin-bottom: 8px;
  font-weight: 700;
}

.master-era {
  font-size: 12px;
  color: var(--gold);
  font-weight: 600;
  margin-bottom: 12px;
  letter-spacing: 1px;
}

.master-desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 12px;
  line-height: 1.5;
}

.master-achievement {
  font-size: 12px;
  background: rgba(212, 175, 55, 0.1);
  color: var(--gold);
  padding: 8px;
  border-radius: 4px;
  font-weight: 600;
}

/* ========== 7. 经典剧目 ========== */
.classics-section {
  max-width: 1200px;
  margin: 0 auto 100px;
  padding: 0 20px;
}

/* ========== 3D 旋转轮播 ========== */
.carousel-container {
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 0 auto 40px;
  perspective: none;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  height: auto;
  margin-bottom: 0;
}

.carousel-track {
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  gap: 24px;
  padding: 0;
  justify-content: center;
}

.carousel-item {
  position: relative;
  width: 300px;
  height: auto;
  flex-shrink: 0;
  animation: fadeInUp 0.6s ease-out both;
}

.carousel-item:nth-child(1) { animation-delay: 0.1s; }
.carousel-item:nth-child(2) { animation-delay: 0.2s; }
.carousel-item:nth-child(3) { animation-delay: 0.3s; }
.carousel-item:nth-child(4) { animation-delay: 0.4s; }
.carousel-item:nth-child(5) { animation-delay: 0.5s; }

.carousel-item[style*="opacity: 0"] {
  pointer-events: none;
}

.classic-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(245, 241, 232, 1));
  border: 1px solid var(--border-color);
  border-top: 3px solid var(--gold);
  padding: 24px;
  border-radius: 8px;
  height: 100%;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease-out;
  position: relative;
  backface-visibility: hidden;
}

.classic-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(212, 175, 55, 0.05) 100%);
  pointer-events: none;
  border-radius: 4px;
}

.carousel-item:hover .classic-card {
  border-color: var(--gold);
  box-shadow: 0 16px 48px rgba(212, 175, 55, 0.25);
  transform: translateY(-4px);
}

.classic-number {
  font-size: 42px;
  font-weight: 800;
  color: var(--gold);
  opacity: 0.3;
  margin-bottom: 12px;
}

.classic-card h3 {
  font-size: 20px;
  color: var(--dark);
  margin: 0 0 8px;
  font-weight: 700;
}

.classic-series {
  font-size: 12px;
  color: var(--gold);
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 12px;
}

.classic-synopsis {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
  flex-grow: 1;
}

.classic-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.classic-tag {
  display: inline-block;
  background: rgba(212, 175, 55, 0.1);
  color: var(--gold);
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
}

.carousel-controls {
  display: none;
}

.carousel-btn {
  width: 50px;
  height: 50px;
  background: white;
  border: 2px solid var(--gold);
  border-radius: 50%;
  color: var(--gold);
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: bold;
}

.carousel-btn:hover {
  background: var(--gold);
  color: white;
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(212, 175, 55, 0.3);
}

.carousel-btn:active {
  transform: scale(0.95);
}

/* ========== 8. 尾声 ========== */
.closing-section {
  max-width: 900px;
  margin: 0 auto 60px;
  padding: 80px 40px;
  text-align: center;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(212, 175, 55, 0.03));
  border: 1px solid rgba(212, 175, 55, 0.15);
  border-radius: 0;
  position: relative;
}

.closing-decoration {
  height: 40px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.deco-pattern {
  width: 100px;
  height: 20px;
  background: repeating-linear-gradient(
    90deg,
    var(--gold),
    var(--gold) 3px,
    transparent 3px,
    transparent 8px
  );
  opacity: 0.4;
}

.closing-content p {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 2;
  margin: 0;
  font-style: italic;
  letter-spacing: 1px;
}

/* ========== 轮播动画 ========== */
@keyframes carouselFanOut {
  from {
    opacity: 0;
    transform: scale(0.3);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .opening-title {
    font-size: 40px;
  }

  .section-header h2 {
    font-size: 36px;
  }

  .schools-grid {
    grid-template-columns: 1fr;
  }

  .timeline-node {
    grid-template-columns: 1fr;
    margin-bottom: 60px;
  }

  .timeline-node.node-left .timeline-content-card,
  .timeline-node.node-right .timeline-content-card {
    grid-column: 1;
    text-align: left;
  }

  .timeline-node.node-right .timeline-content-card {
    border-left: 3px solid var(--gold);
    border-right: none;
  }

  .node-marker {
    margin-bottom: 20px;
  }

  .craft-grid,
  .significance-grid,
  .masters-grid {
    grid-template-columns: 1fr;
  }

  .carousel-wrapper,
  .schools-carousel-wrapper {
    height: 380px;
  }

  .carousel-item {
    width: 280px;
    height: 320px;
    margin-left: -140px;
    margin-top: -160px;
  }

  .schools-carousel-item {
    width: 260px;
    height: 320px;
    margin-left: -130px;
    margin-top: -160px;
  }

  .classic-card {
    padding: 20px;
  }

  .school-card {
    padding: 20px 16px;
  }

  .classic-number {
    font-size: 32px;
  }

  .carousel-btn {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }

  .timeline-river-scroll {
    height: 500px;
  }

  .timeline-items {
    padding: 0 30px;
  }

  .timeline-node {
    margin-bottom: 60px;
    gap: 20px;
  }

  .book-pages {
    height: 350px;
  }

  .page-left,
  .page-right {
    padding: 30px 20px;
  }

  .page-title {
    font-size: 16px;
  }

  .page-text {
    font-size: 12px;
  }
}
</style>
