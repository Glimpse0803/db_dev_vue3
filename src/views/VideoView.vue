<script setup>
import Header from '@/components/Header.vue'
import { ref, onMounted } from 'vue';
import axios from '@/plugins/axios'; // 使用配置好的 axios 实例
import Navbar from '@/components/Navbar.vue'

const videos = ref([]);
onMounted(async () => {
  try {
    const response = await axios.get('/videos');
    if(response.data.message === 'success') {
      videos.value = response.data.data;
      console.log("vd data: ",videos.value);
      console.log("vd data: ",videos.value[0]);
    } else {
      console.error('Failed to fetch videos data');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<template>
  <div class="video">
    <Navbar />
    <Header />
    <div id="search">
      <h1>搜索栏</h1>
    </div>
    <div id="body">
      <!-- 第一行 -->
      <div class="row f_row">
        <div class="box" v-for="(video, index) in videos.slice(0, 3)" :key="'f_row-' + index">
          <iframe :src="video.Video_URL"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen>
          </iframe>
        </div>
      </div>

      <!-- 第二行 -->
      <div class="row s_row">
        <div class="box" v-for="(video, index) in videos.slice(3, 6)" :key="'s_row-' + index">
          {{video.Video_URL}}
          <p>video.Video_URL</p>
          <iframe :src="video.Video_URL"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen>
          </iframe>
          <p>video.Video_URL</p>
        </div>
      </div>

      <!-- 第三行 -->
      <div class="row th_row">
        <div class="box" v-for="(video, index) in videos.slice(6, 9)" :key="'th_row-' + index">
          <iframe :src="video.Video_URL"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen>
          </iframe>
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
