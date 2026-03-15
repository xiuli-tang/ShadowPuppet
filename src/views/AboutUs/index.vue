<template>
  <div class="letter-wrapper">
    <!-- 背景装饰 -->
    <div class="letter-background"></div>

    <!-- 主容器 -->
    <div class="letter-container">
      <!-- 信纸 -->
      <div class="letter-paper">
        <!-- 顶部装饰 -->
        <div class="letter-top-deco">
          <div class="deco-line"></div>
          <div class="deco-text">展信安</div>
          <div class="deco-line"></div>
        </div>

        <!-- 信件标题 -->
        <div class="letter-title-section">
          <h1 class="letter-title">写给皮影的一封信</h1>
          <p class="letter-subtitle">这里没有刻板的团队介绍，只有一封我们写给皮影的信 —— 关于我们，也关于这门千年非遗。</p>
        </div>

        <!-- 信件内容 -->
        <div class="letter-content">
          <!-- 开头 -->
          <div class="letter-paragraph">
            <p class="paragraph-indent">皮影，你好：</p>
          </div>

          <!-- 第一段 -->
          <div class="letter-paragraph">
            <p>我们是影的传人，一群二十岁的大学生。</p>
            <p>和许多同龄人一样，我们最初对你的了解，大多来自书本与荧幕。你是遥远而熟悉的非遗符号，是刻在兽皮上的千年故事，是灯光下跃动的鲜活身影，可我们，却很少有机会近距离触摸你、感受你。当我们下定决心，想用自己最擅长的技术，陪你走过这段数字化的旅程时，才真正读懂了你的困境 —— 优质、标准化的你的数字化数据，严重缺失。</p>
          </div>

          <!-- 第二段 -->
          <div class="letter-paragraph">
            <p>公开可直接使用的成熟数据集极少，不同流派、不同角色、不同动作的你的素材，零散杂乱；高清数字化的你的样本不足、标注不规范，姿态关键点、动作序列、光影特征，都没有统一的标准。我们想让你通过智能识别、动作还原、实时交互的方式，重新走进大众视野，却发现，连最基础的规模化、高质量数据，都无从依托。</p>
          </div>

          <!-- 第三段 -->
          <div class="letter-paragraph">
            <p>于是，我们便从零开始，为你搭建专属的数据集。从采集你的每一张影像、整理你的每一个角色、标注你的每一个细节，到清洗优化、增强画质、梳理结构化信息，我们逐张处理你的图片、逐帧标注你的动作、反复校正属于你的光影参数，花费无数个日夜，完成数据预处理与格式标准化。在此基础上，我们编写代码、训练模型、开发交互系统、搭建实时渲染引擎、调试智能控制程序，一次又一次算法调试、一遍又一遍程序排错、一轮又一轮模型迭代，终于，让流畅生动的数字版的你，得以呈现；更搭建出皮影批量化处理工作流，我们想，授人以鱼不如授人以渔，我们不仅想让更多人看见你，更想为你的传承，留下可复用的工具，让更多人能轻松走近你。</p>
          </div>

          <!-- 第四段 -->
          <div class="letter-paragraph">
            <p>5 个人，90 天，上万行代码，上千张你的素材 —— 灯光下，你流转的光影背后，没有惊天动地的突破，只有我们对传统文化的热爱，只有我们用自己最擅长的编程技术，一点点填平你数字化路上的鸿沟。我们不想做多么了不起的事，只是想以科技为桥，降低大家认识你、体验你的门槛，让你这门古老艺术，不再只停留在戏台与回忆里，能以更鲜活、更可触的方式，走进更多人的视野，被更多人喜爱。</p>
          </div>

          <!-- 第五段 -->
          <div class="letter-paragraph">
            <p>我们始终相信，你的传承，从来不止于匠人与戏台。每一份对你的关注，每一份对你的喜爱，都能成为你延续千年的力量。只要心怀热爱，愿意走近你、分享你，每一个人，都可以是你的传人，都可以成为守护你的一员，成为【影的传人】。</p>
          </div>

          <!-- 第六段 -->
          <div class="letter-paragraph">
            <p>而我们，愿做以代码为炬、以数据为基的追光者，陪着你，用智能技术守护你的根脉，让你这千年光影，在新时代，重新焕发属于你的光彩。</p>
          </div>

          <!-- 结尾 -->
          <div class="letter-paragraph">
            <p>谢谢你，愿意倾听我们这群二十岁大学生的心意，也愿我们，能陪你走过更长的路，期待更多人与我们一起，与你同行。</p>
          </div>
        </div>

        <!-- 落款 -->
        <div class="letter-signature">
          <div class="signature-line"></div>
          <p class="signature-text">影的传人 敬上</p>
          <p class="signature-date">2026年</p>
        </div>

        <!-- 点赞功能 -->
        <div class="like-section">
          <button
            class="like-button"
            :class="{ liked: isLiked }"
            @click="handleLike"
          >
            <span class="like-icon">❤</span>
            <span class="like-text">{{ isLiked ? '已参与传承' : '参与传承' }}</span>
          </button>
          <p class="like-count">{{ likeCount }} 人参与了传承</p>

          <!-- 光线效果容器 -->
          <div v-if="showLight" class="light-effect"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
  data() {
    return {
      isLiked: false,
      likeCount: 1024,
      showLight: false
    };
  },
  methods: {
    handleLike() {
      if (!this.isLiked) {
        this.isLiked = true;
        this.likeCount += 1;
        this.showLight = true;

        // 光线效果持续时间
        setTimeout(() => {
          this.showLight = false;
        }, 1200);
      }
    }
  }
};
</script>

<style scoped>
/* ========== 页面基础布局 ========== */
.letter-wrapper {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #2a1b15 0%, #1a0f0a 50%, #2a1b15 100%);
  position: relative;
  padding: 60px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 背景装饰 */
.letter-background {
  position: fixed;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(212, 175, 55, 0.03) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

/* ========== 主容器 ========== */
.letter-container {
  position: relative;
  z-index: 1;
  max-width: 800px;
  width: 100%;
}

/* ========== 信纸样式 ========== */
.letter-paper {
  background: linear-gradient(135deg, #f5f2e9 0%, #ede8dd 100%);
  border: 2px solid #d4af37;
  border-radius: 4px;
  padding: 60px 50px;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.5),
    inset 0 0 40px rgba(212, 175, 55, 0.1),
    inset 0 0 80px rgba(107, 68, 35, 0.05);
  position: relative;
  animation: paperFadeIn 0.8s ease-out;
}

/* 宣纸纹理 */
.letter-paper::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.04;
  pointer-events: none;
  border-radius: 4px;
}

/* ========== 顶部装饰 ========== */
.letter-top-deco {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
}

.deco-line {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, #d4af37 50%, transparent 100%);
}

.deco-text {
  font-size: 16px;
  color: #8d704a;
  font-family: "Noto Serif SC", serif;
  letter-spacing: 4px;
  font-weight: 500;
}

/* ========== 信件标题 ========== */
.letter-title-section {
  text-align: center;
  margin-bottom: 50px;
  position: relative;
  z-index: 1;
}

.letter-title {
  font-size: 36px;
  font-weight: 800;
  color: #2a1b15;
  font-family: "Noto Serif SC", serif;
  letter-spacing: 6px;
  margin-bottom: 16px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.letter-subtitle {
  font-size: 14px;
  color: #8d704a;
  font-family: "Noto Serif SC", serif;
  letter-spacing: 2px;
  line-height: 1.8;
  font-weight: 400;
}

/* ========== 信件内容 ========== */
.letter-content {
  position: relative;
  z-index: 1;
  margin-bottom: 40px;
}

.letter-paragraph {
  margin-bottom: 24px;
  text-align: justify;
}

.letter-paragraph p {
  font-size: 16px;
  line-height: 2;
  color: #4a3728;
  font-family: "Noto Serif SC", serif;
  letter-spacing: 1px;
  margin: 0;
}

/* 首行缩进 */
.paragraph-indent {
  text-indent: 2em;
}

.letter-paragraph p:not(.paragraph-indent) {
  text-indent: 2em;
}

/* ========== 落款 ========== */
.letter-signature {
  position: relative;
  z-index: 1;
  margin-top: 60px;
  text-align: right;
  padding-right: 40px;
}

.signature-line {
  width: 120px;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, #d4af37 100%);
  margin-left: auto;
  margin-bottom: 16px;
}

.signature-text {
  font-size: 18px;
  color: #2a1b15;
  font-family: "Noto Serif SC", serif;
  letter-spacing: 3px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.signature-date {
  font-size: 14px;
  color: #8d704a;
  font-family: "Noto Serif SC", serif;
  letter-spacing: 2px;
  margin: 0;
}

/* ========== 底部装饰 ========== */
.letter-bottom-deco {
  position: relative;
  z-index: 1;
  text-align: center;
  margin-top: 40px;
}

.deco-seal {
  font-size: 48px;
  display: inline-block;
  animation: sealSpin 3s ease-in-out infinite;
}

/* ========== 点赞功能 ========== */
.like-section {
  position: relative;
  z-index: 1;
  text-align: center;
  margin-top: 50px;
  padding-top: 30px;
  border-top: 2px solid rgba(212, 175, 55, 0.2);
}

.like-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 32px;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%);
  border: 2px solid #d4af37;
  border-radius: 24px;
  color: #2a1b15;
  font-family: "Noto Serif SC", serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.like-button:hover:not(.liked) {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.1) 100%);
  border-color: #ffd700;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(212, 175, 55, 0.2);
}

.like-button.liked {
  background: linear-gradient(135deg, #d4af37 0%, #ffd700 100%);
  border-color: #ffd700;
  color: #2a1b15;
  box-shadow: 0 8px 24px rgba(212, 175, 55, 0.4);
}

.like-icon {
  font-size: 18px;
  display: inline-block;
  transition: all 0.3s ease;
}

.like-button.liked .like-icon {
  animation: heartBeat 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.like-text {
  letter-spacing: 1px;
}

.like-count {
  font-size: 14px;
  color: #8d704a;
  font-family: "Noto Serif SC", serif;
  margin-top: 12px;
  letter-spacing: 1px;
}

/* 光线效果 */
.light-effect {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
  animation: lightSweep 1.2s ease-out forwards;
}

@keyframes lightSweep {
  0% {
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(212, 175, 55, 0) 10%,
      rgba(212, 175, 55, 0.3) 50%,
      rgba(212, 175, 55, 0) 90%,
      transparent 100%
    );
    background-position: -100% 0;
    background-size: 200% 100%;
  }
  50% {
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(212, 175, 55, 0) 10%,
      rgba(212, 175, 55, 0.4) 50%,
      rgba(212, 175, 55, 0) 90%,
      transparent 100%
    );
    background-position: 0 0;
    background-size: 200% 100%;
  }
  100% {
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(212, 175, 55, 0) 10%,
      rgba(212, 175, 55, 0.3) 50%,
      rgba(212, 175, 55, 0) 90%,
      transparent 100%
    );
    background-position: 100% 0;
    background-size: 200% 100%;
    opacity: 0;
  }
}

@keyframes heartBeat {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.3);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

/* ========== 动画 ========== */
@keyframes paperFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes sealSpin {
  0%, 100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(5deg);
  }
}

/* ========== 响应式设计 ========== */
@media (max-width: 768px) {
  .letter-wrapper {
    padding: 40px 10px;
  }

  .letter-paper {
    padding: 40px 30px;
    border-width: 1px;
  }

  .letter-title {
    font-size: 28px;
    letter-spacing: 4px;
  }

  .letter-subtitle {
    font-size: 13px;
  }

  .letter-paragraph p {
    font-size: 15px;
    line-height: 1.8;
    letter-spacing: 0.5px;
  }

  .signature-text {
    font-size: 16px;
  }

  .deco-seal {
    font-size: 36px;
  }
}

@media (max-width: 480px) {
  .letter-wrapper {
    padding: 20px 5px;
  }

  .letter-paper {
    padding: 30px 20px;
  }

  .letter-title {
    font-size: 24px;
    letter-spacing: 2px;
  }

  .letter-paragraph p {
    font-size: 14px;
    line-height: 1.7;
  }

  .letter-top-deco {
    gap: 10px;
  }

  .deco-text {
    font-size: 14px;
  }
}
</style>