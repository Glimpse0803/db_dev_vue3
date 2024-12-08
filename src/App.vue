<template>
  <nav class="navbar">
    <!-- 中间部分 -->
    <div class="navbar-center">
      <router-link to="/">国际服</router-link> |
      <router-link to="/domestic">国内服</router-link>
    </div>

    <!-- 右侧部分 -->
    <div class="navbar-right">
      <router-link to="/video">视频</router-link>
      <router-link to="/article">文章</router-link>
      <router-link to="/login">登录</router-link>
      <router-link to="/team">开发者团队</router-link>
    </div>
  </nav>
  <router-view/>
</template>

<style scoped>
/* 导航栏样式 */
.navbar {
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 子元素水平居中 */
  align-items: center; /* 子元素垂直居中 */
  position: relative; /* 允许子元素用绝对定位调整 */
  padding: 10px 20px;
  background-color: #f8f9fa; /* 导航栏背景颜色 */
  border-bottom: 1px solid #ddd;
}

/* 中间部分 */
.navbar-center {
  position: absolute; /* 绝对定位 */
  left: 50%; /* 相对于父容器居中 */
  transform: translateX(-50%); /* 确保精确居中 */
  white-space: nowrap; /* 防止文字换行 */
}

/* 右侧部分 */
.navbar-right {
  margin-left: auto; /* 将右侧内容推到最右边 */
  display: flex;
  gap: 15px; /* 图标之间的间距 */
}

.router-link-active {
  font-weight: bold; /* 激活状态加粗 */
}
</style>
