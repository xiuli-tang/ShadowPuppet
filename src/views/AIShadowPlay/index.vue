<template>
  <div class="shadow-play-container">
    <div class="stage-wrapper" ref="reactStageRoot"></div>
  </div>
</template>

<script>
// 我们将使用标准的 ReactDOM 渲染
import React from 'react';
import ReactDOM from 'react-dom/client';
import ShadowPuppetStage from '@/react-islands/ShadowPuppetStage/index.jsx';

export default {
  name: 'AIShadowPlay',
  data() {
    return {
      reactRoot: null
    };
  },
  mounted() {
    // 挂载 React 组件
    if (this.$refs.reactStageRoot) {
      this.reactRoot = ReactDOM.createRoot(this.$refs.reactStageRoot);
      this.reactRoot.render(
        React.createElement(ShadowPuppetStage)
      );
    }
  },
  beforeDestroy() {
    // 卸载 React 组件防止内存泄漏
    if (this.reactRoot) {
      this.reactRoot.unmount();
      this.reactRoot = null;
    }
  }
};
</script>

<style scoped>
.shadow-play-container {
  width: 100%;
  height: calc(100vh - 60px); /* 减去顶部导航栏高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  box-sizing: border-box;
}

.stage-wrapper {
  /* 固定宽高并居中 */
  width: 80vw;
  height: 80vh;
  max-width: 1200px;
  max-height: 800px;
  /* 如果超出会被容器裁剪 */
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  background: #000;
  position: relative;
}
</style>
