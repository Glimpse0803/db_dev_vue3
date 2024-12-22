<template>
  <div class="article-card" :class="{ selected: isSelected }" @click="selectArticle">
    <h3>{{ article.title }}</h3>
    <p>{{ article.context.slice(0, 150) }}...</p>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// 接收文章数据和选中状态作为 props
const props = defineProps({
  article: Object,
  isSelected: Boolean
});

// 发出选择文章的事件
const emit = defineEmits(['select']);

// 选择当前文章
const selectArticle = () => {
  emit('select', props.article);
};
</script>

<style scoped>
.article-card {
  background: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s;
}

.article-card:hover {
  transform: scale(1.05);
}

h3 {
  font-size: 1.2rem;
  color: #333;
}

p {
  font-size: 0.9rem;
  color: #666;
}

.selected {
  border: 2px solid #56ab2f;
}
</style>
