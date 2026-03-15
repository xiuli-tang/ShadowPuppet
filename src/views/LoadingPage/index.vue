<template>
  <div class="loading-page">
    <div class="loading-content">
      <div class="spinner"></div>
      <p>正在初始化数据...</p>
    </div>
  </div>
</template>

<script setup>
// 仅保留Vue2.7的基础语法，移除所有业务逻辑
// 无任何API调用、路由跳转、异步操作
</script>

<style scoped>
.loading-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  margin: 0;
  padding: 0;
}

.loading-content {
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #eee;
  border-top: 4px solid #409eff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

/* 旋转动画关键帧 */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 文字样式优化 */
.loading-content p {
  color: #666;
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
}
</style>