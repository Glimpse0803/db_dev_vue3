<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 图片名称数组（不包含路径部分）
const images = [
  '1.jpg',
  '2.png',
  '3.jpg',
  '4.png',
  '5.jpg'
];

const currentIndex = ref(0);

// 切换到下一张图片
const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length;
};

// 切换到上一张图片
const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
};

// 自动播放功能
let interval;
onMounted(() => {
  // 每张图淡入淡出2秒，停顿5秒
  interval = setInterval(nextImage, 7000); // 7秒轮播时间，2秒淡入淡出 + 5秒停顿
});

// 清理定时器
onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="video">
    <div class="carousel-container">
      <div class="carousel">
        <transition name="fade" mode="out-in">
          <img
              :key="currentIndex"
              :src="require(`@/assets/${images[currentIndex]}`)"
              alt="carousel image"
              class="carousel-image"
          />
        </transition>
      </div>

      <!-- 轮播图的左右切换按钮 -->
      <button class="prev" @click="prevImage">
        <img src="@/assets/left.png" alt="Previous" />
      </button>
      <button class="next" @click="nextImage">
        <img src="@/assets/right.png" alt="Next" />
      </button>
    </div>
    <div id="search">
      <h1>搜索栏</h1>
    </div>
    <div id="body">
      <div class="row f_row">
        <div class="box">
          <iframe src="https://www.youtube.com/embed/hp-zP-967Zs?si=IeuM5NRHcBMRv0RO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <div class="box">
          <iframe src="https://www.youtube.com/embed/hp-zP-967Zs?si=IeuM5NRHcBMRv0RO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <div class="box">
          <iframe src="https://www.youtube.com/embed/hp-zP-967Zs?si=IeuM5NRHcBMRv0RO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
      <div class="row s_row">
        <div class="box">
          <iframe src="https://www.youtube.com/embed/hp-zP-967Zs?si=IeuM5NRHcBMRv0RO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <div class="box">
          <iframe src="https://www.youtube.com/embed/hp-zP-967Zs?si=IeuM5NRHcBMRv0RO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <div class="box">
          <iframe src="https://www.youtube.com/embed/hp-zP-967Zs?si=IeuM5NRHcBMRv0RO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
      <div class="row th_row">
        <div class="box">
          <iframe src="https://www.youtube.com/embed/hp-zP-967Zs?si=IeuM5NRHcBMRv0RO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <div class="box">
          <iframe src="https://www.youtube.com/embed/hp-zP-967Zs?si=IeuM5NRHcBMRv0RO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <div class="box">
          <iframe src="https://www.youtube.com/embed/hp-zP-967Zs?si=IeuM5NRHcBMRv0RO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 主体样式 */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.carousel-container {
  padding: 20px 60px;
  position: relative;
  width: 900px; /* 轮播图的宽度 */
  height: 400px; /* 轮播图的高度 */
  overflow: hidden;
  margin: 0 auto;
}

.carousel {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px; /* 圆角 */
  transition: opacity 2s ease-in-out;
}

button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 100;
}

.prev {
  left: 0;
}

.next {
  right: 0;
}

button img { width: 40px; height: 40px; }

/* 淡入淡出过渡 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

#search {
  padding: 20px 40px; /* 上下 padding 为 20px，左右 padding 为 40px */
}

#body {
  display: grid;
  grid-template-rows: auto auto repeat(4, auto);
  gap: 20px; /* 行间距 */
  padding: 40px;
}

.row {
  display: grid;
  column-gap: 20px; /* 增大列间距 */
}

.f_row,.s_row,.th_row {
  grid-template-columns: repeat(3, 1fr); /* 4列 */
}

.box {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 15px; /* 圆角边框 */
  position: relative;
  overflow: hidden;
  padding-top: 56.25%; /* 保持 16:9 长宽比 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
