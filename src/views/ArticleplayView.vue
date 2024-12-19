<!--<template>-->
<!--  <div class="article-play-page">-->
<!--    <Navbar />-->
<!--    <div class="article-container">-->
<!--      <h1 class="article-title">{{ article.title }}</h1>-->
<!--      <div class="article-content">-->
<!--        <p>{{ article.context }}</p>-->
<!--      </div>-->

<!--      &lt;!&ndash; 底部控制区域 &ndash;&gt;-->
<!--      <div class="control-container">-->
<!--        &lt;!&ndash; 点赞按钮和点赞数 &ndash;&gt;-->
<!--        <div class="like-container">-->
<!--          <button @click="toggleLike" :class="liked ? 'liked' : 'unliked'">-->
<!--            👍-->
<!--          </button>-->
<!--          <span>{{ likesCount }}</span>-->
<!--        </div>-->

<!--        &lt;!&ndash; 浏览量 &ndash;&gt;-->
<!--        <div class="view-container">-->
<!--          <span>浏览量：{{ viewCount }}</span>-->
<!--        </div>-->

<!--        &lt;!&ndash; 评论框和发送按钮 &ndash;&gt;-->
<!--        <div class="comment-container">-->
<!--          <input-->
<!--              type="text"-->
<!--              v-model="commentText"-->
<!--              :placeholder="commentText ? '' : '发表评论'"-->
<!--              @focus="removePlaceholder"-->
<!--              @blur="addPlaceholder"-->
<!--          />-->
<!--          <button @click="sendComment">发送</button>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; 评论列表 &ndash;&gt;-->
<!--      <div class="comment-list">-->
<!--        <div v-for="(comment, index) in comments" :key="comment.Comment_ID" class="comment-item">-->
<!--          <strong>{{ comment.User_name }}：</strong>-->
<!--          <span>{{ comment.Comment }}</span>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref, onMounted } from 'vue';-->
<!--import { useRoute } from 'vue-router';-->
<!--import axios from '@/plugins/axios';-->
<!--import Navbar from '@/components/Navbar.vue';-->

<!--const route = useRoute();-->
<!--const articleId = route.query.articleId;  // 获取文章ID-->

<!--// 响应式变量-->
<!--const article = ref({});-->
<!--const likesCount = ref(0);-->
<!--const liked = ref(false);-->
<!--const viewCount = ref(0);-->
<!--const commentText = ref('');-->
<!--const comments = ref([]);-->

<!--// 获取文章数据-->
<!--const getArticleData = async () => {-->
<!--  try {-->
<!--    const response = await axios.get(`/api/articles/${articleId}`);-->
<!--    article.value = response.data.data;  // 假设返回的数据是 { data: { ... } }-->
<!--    likesCount.value = article.value.likes;-->
<!--    viewCount.value = article.value.views;-->
<!--  } catch (error) {-->
<!--    console.error("获取文章数据失败", error);-->
<!--  }-->
<!--};-->

<!--// 获取评论数据-->
<!--const getComments = async () => {-->
<!--  try {-->
<!--    const response = await axios.get('/api/articles-comments', { params: { articleId } });-->
<!--    comments.value = response.data.data.reverse();  // 倒序排列评论-->
<!--  } catch (error) {-->
<!--    console.error("获取评论数据失败", error);-->
<!--  }-->
<!--};-->

<!--// 更新浏览量-->
<!--const updateViewCount = async () => {-->
<!--  try {-->
<!--    await axios.post('/api/article-clicks', { articleId });-->
<!--    getArticleData();  // 重新加载文章数据-->
<!--  } catch (error) {-->
<!--    console.error("更新浏览量失败", error);-->
<!--  }-->
<!--};-->

<!--// 点赞按钮点击事件-->
<!--const toggleLike = async () => {-->
<!--  try {-->
<!--    const newLikedStatus = !liked.value;-->
<!--    await axios.post('/api/article-likes', { articleId, liked: newLikedStatus });-->
<!--    liked.value = newLikedStatus;-->
<!--    getArticleData();-->
<!--  } catch (error) {-->
<!--    console.error("点赞失败", error);-->
<!--  }-->
<!--};-->

<!--// 发送评论-->
<!--const sendComment = async () => {-->
<!--  if (commentText.value.trim() !== '') {-->
<!--    try {-->
<!--      await axios.post('/api/articles-comments', { articleId, comment: commentText.value });-->
<!--      commentText.value = '';-->
<!--      getComments();  // 重新加载评论-->
<!--    } catch (error) {-->
<!--      console.error('评论发送失败', error);-->
<!--    }-->
<!--  }-->
<!--};-->

<!--// 页面加载时获取文章数据、评论和浏览量-->
<!--onMounted(() => {-->
<!--  getArticleData();-->
<!--  getComments();-->
<!--  updateViewCount();-->
<!--});-->

<!--// 处理评论框的占位符-->
<!--const removePlaceholder = () => {-->
<!--  if (commentText.value) {-->
<!--    commentText.value = commentText.value;  // 确保文本框不显示占位符文字-->
<!--  }-->
<!--};-->

<!--const addPlaceholder = () => {-->
<!--  if (!commentText.value) {-->
<!--    commentText.value = '';  // 如果没有输入，显示占位符-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.article-play-page {-->
<!--  padding: 20px;-->
<!--}-->

<!--.article-container {-->
<!--  width: 70%;-->
<!--  margin: 0 auto;-->
<!--}-->

<!--.article-title {-->
<!--  text-align: center;-->
<!--  font-size: 30px;-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--.article-content {-->
<!--  font-size: 16px;-->
<!--  color: #333;-->
<!--  margin-bottom: 40px;-->
<!--}-->

<!--.control-container {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  gap: 20px;-->
<!--  align-items: center;-->
<!--}-->

<!--.like-container {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--}-->

<!--.like-container button {-->
<!--  font-size: 24px;-->
<!--  margin-right: 10px;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.like-container .liked {-->
<!--  color: red;-->
<!--}-->

<!--.like-container .unliked {-->
<!--  color: gray;-->
<!--}-->

<!--.view-container {-->
<!--  font-size: 16px;-->
<!--  color: #666;-->
<!--}-->

<!--.comment-container {-->
<!--  display: flex;-->
<!--  gap: 10px;-->
<!--  align-items: center;-->
<!--}-->

<!--.comment-container input {-->
<!--  padding: 8px 12px;-->
<!--  border-radius: 5px;-->
<!--  border: 1px solid #ccc;-->
<!--  width: 300px;-->
<!--  font-size: 14px;-->
<!--}-->

<!--.comment-container button {-->
<!--  padding: 8px 16px;-->
<!--  background-color: #4CAF50;-->
<!--  color: white;-->
<!--  border: none;-->
<!--  border-radius: 5px;-->
<!--}-->

<!--.comment-list {-->
<!--  width: 70%;-->
<!--  margin-top: 20px;-->
<!--}-->

<!--.comment-item {-->
<!--  margin-bottom: 10px;-->
<!--  padding: 10px;-->
<!--  background-color: #f1f1f1;-->
<!--  border-radius: 5px;-->
<!--}-->
<!--</style>-->
