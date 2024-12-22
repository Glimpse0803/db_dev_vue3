<template>
  <div class="article-list-container">
    <!-- 文章卡片容器 -->
    <div class="card-container" :style="{ transform: `translateX(${translateX})` }">
      <ArticleCard
          v-for="(article, index) in articles"
          :key="article.article_ID"
          :article="article"
          :isSelected="selectedArticle?.article_ID === article.article_ID"
          @select="selectArticle"
      />
    </div>

    <!-- 文章序号 -->
    <div class="article-number">
      <span>{{ currentIndex + 1 }} / {{ articles.length }}</span>
    </div>

    <!-- 滑动按钮 -->
    <div class="controls">
      <button @click="prevArticle" :disabled="currentIndex === 0">Prev</button>
      <button @click="nextArticle" :disabled="currentIndex === articles.length - 1">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ArticleCard from './ArticleCard.vue';

// 定义 9 篇文章
const articles = ref([
  { article_ID: 1, title: "人工智能开启创新发展新时代", context: "人工智能时代的创新发展..." },
  { article_ID: 2, title: "区块链技术与金融创新", context: "区块链技术作为一种去中心化的..." },
  { article_ID: 3, title: "云计算与大数据", context: "云计算和大数据是现代科技发展的..." },
  { article_ID: 4, title: "5G技术带来的变革", context: "5G技术正在推动各行业的数字化..." },
  { article_ID: 5, title: "量子计算的未来", context: "量子计算将推动科技的飞跃..." },
  { article_ID: 6, title: "数字货币的崛起", context: "数字货币正在改变全球金融生态..." },
  { article_ID: 7, title: "智能制造与工业4.0", context: "智能制造将重塑传统制造业..." },
  { article_ID: 8, title: "智能医疗的现状与未来", context: "智能医疗技术的不断发展..." },
  { article_ID: 9, title: "自动驾驶的技术进展", context: "自动驾驶技术已经取得了突破..." },
]);

// 当前显示的文章索引
const currentIndex = ref(0);

// 容器的宽度
const containerWidth = ref(0);

// 选择文章（无用，删除不必要的逻辑）
const selectArticle = (article) => {};

// 下一篇文章
const nextArticle = () => {
  currentIndex.value = (currentIndex.value + 1) % articles.value.length; // 循环显示
};

// 上一篇文章
const prevArticle = () => {
  currentIndex.value = (currentIndex.value - 1 + articles.value.length) % articles.value.length; // 循环显示
};

// 计算滑动的距离
const translateX = computed(() => {
  return `-${currentIndex.value * containerWidth.value}px`; // 每次滑动完整宽度
});

// 获取容器宽度
onMounted(() => {
  const container = document.querySelector('.article-list-container');
  containerWidth.value = container.offsetWidth;
});
</script>

<style scoped>
.article-list-container {
  position: relative;
  width: 70%; /* 设置容器宽度为 70% */
  overflow: hidden; /* 隐藏超出部分 */
  margin: 0 auto; /* 使其水平居中 */
}

.card-container {
  display: flex;
  transition: transform 0.5s ease-in-out; /* 平滑过渡 */
  width: 100%; /* 容器宽度为 100%，由父容器控制 */
}

.card-container > * {
  flex: 0 0 97.89%; /* 每个卡片占据 100% 容器宽度 */
  box-sizing: border-box; /* 包含 padding 和 border */
  height: 80%;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: #56ab2f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #4e9f23;
}

.article-number {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 10px;
  color: #333;
}
</style>



