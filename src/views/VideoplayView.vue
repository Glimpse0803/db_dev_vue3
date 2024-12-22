<template>
  <div class="video-play-page">
    <Navbar />
    <!-- 视频播放区域 -->
    <div class="video-container">
      <video controls :src="require(`@/${videoName}`)" width="100%" height="auto"></video>
    </div>

    <!-- 视频底部控制区域 -->
    <div class="control-container">
      <!-- 点赞按钮和点赞数 -->
      <div class="like-container">
        <button @click="toggleLike" :class="liked ? 'liked' : 'unliked'">
          👍
        </button>
        <span>{{ likesCount }}</span>
      </div>

      <!-- 浏览量 -->
      <div class="view-container">
        <span>浏览量：{{ viewCount }}</span>
      </div>

      <!-- 评论框和发送按钮 -->
      <div class="comment-container">
        <input
            type="text"
            v-model="commentText"
            :placeholder="commentText ? '' : '发表评论'"
            @focus="removePlaceholder"
            @blur="addPlaceholder"
        />
        <button @click="sendComment">发送</button>
      </div>
    </div>

    <!-- 评论列表 -->
    <div class="comment-list">
      <div v-for="(comment, index) in comments" :key="comment.Comment_ID" class="comment-item">
        <strong>{{ comment.User_name }}：</strong>
        <span>{{ comment.Comment }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import axios from '@/plugins/axios';

const route = useRoute();  // 获取当前路由信息
const videoId = route.query.videoId;  // 确保 videoId 是字符串类型
const videoName = route.query.videoName;

// 响应式变量
const likesCount = ref(0);  // 当前视频的点赞数
const liked = ref(false);   // 用户是否已经点赞
const commentText = ref('');  // 评论输入框的内容
const comments = ref([]);  // 评论数组
const viewCount = ref(0); // 视频浏览量

// 获取视频的点赞数
const getLikesCount = async () => {
  try {
    const response = await axios.get('/api/video-likes', {
      params: { videoId }
    });

    const videoLikes = response.data.data.find(item => item.Video_ID === Number(videoId));
    if (videoLikes) {
      likesCount.value = videoLikes.likes;
      liked.value = videoLikes.likes > 0;
    }
  } catch (error) {
    console.error("获取点赞数失败", error);
  }
};

// 获取视频的浏览量
const getViewCount = async () => {
  try {
    const response = await axios.get('/api/video-clicks', {
      params: { videoId }
    });

    const videoClicks = response.data.data.find(item => item.Video_ID === Number(videoId));
    if (videoClicks) {
      viewCount.value = videoClicks.Click_Count; // 获取当前的浏览量
    }
  } catch (error) {
    console.error("获取浏览量失败", error);
  }
};

// 更新视频的浏览量
const updateViewCount = async () => {
  try {
    await axios.post('/api/video-clicks', {
      videoId
    });
    // 成功增加浏览量后再更新视图
    getViewCount();
  } catch (error) {
    console.error("更新浏览量失败", error);
  }
};

// 获取评论列表
const getComments = async () => {
  try {
    const response = await axios.get('/api/videos-comments', {
      params: { videoId }
    });

    // 过滤评论：只保留与当前 videoId 匹配的评论
    const filteredComments = response.data.data.filter(comment => comment.Video_ID === Number(videoId));

    // 按照 Comment_ID 倒序排列评论
    comments.value = filteredComments.reverse();  // 倒序排列评论

  } catch (error) {
    console.error("获取评论数据失败", error);
  }
};

const toggleLike = async () => {
  try {
    const newLikedStatus = !liked.value; // 切换当前点赞状态

    // 获取当前视频的 Like_ID 和 likes
    const updatedVideoLike = {
      Like_ID: Number(videoId),  // 假设 videoId 和 Like_ID 对应
      Video_ID: Number(videoId),
      likes: newLikedStatus ? likesCount.value + 1 : likesCount.value - 1,  // 增减点赞数
    };

    // 发送请求到后端，更新整条点赞数据
    const response = await axios.post('/api/video-likes', {
      updatedVideoLike  // 传递整个点赞数据对象
    });

    // 后端返回的数据格式: { "code": 200, "message": "success", "data": [...] }
    if (response.data.code === 200) {
      // 更新前端界面
      likesCount.value = updatedVideoLike.likes;
      liked.value = newLikedStatus;
    } else {
      console.error("服务器返回错误", response.data.message);
    }
  } catch (error) {
    console.error("点赞失败", error);
  }
};

// 发送评论
const sendComment = async () => {
  if (commentText.value.trim() !== '') {
    try {
      const response = await axios.post(`/api/videos-comments`, {
        videoId,
        comment: commentText.value
      });
      console.log('评论发送成功', response);
      commentText.value = '';  // 清空评论框
      getComments();  // 重新加载评论

      // 清空评论框并恢复为初始状态
      commentText.value = '';  // 清空评论框
      addPlaceholder();  // 恢复占位符样式

    } catch (error) {
      console.error('评论发送失败', error);
    }
  }
};

// 页面加载时获取点赞数据、评论数据和浏览量
onMounted(() => {
  getLikesCount();
  getComments();
  getViewCount();
  updateViewCount();  // 每次加载时更新浏览量
});

// 处理评论框的占位符
const removePlaceholder = () => {
  if (commentText.value) {
    commentText.value = commentText.value;  // 确保文本框不显示占位符文字
  }
};

const addPlaceholder = () => {
  if (!commentText.value) {
    commentText.value = '';  // 如果没有输入，显示占位符
  }
};
</script>

<style scoped>
.video-play-page {
  padding: 20px;
}

.video-container {
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

video {
  width: 100%;
  height: auto;
}

/* 控制底部区域布局 */
.control-container {
  width: 70%; /* 与视频宽度一致 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px; /* 设置四个元素之间的间隔 */
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}

/* 点赞部分，左对齐 */
.like-container {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 确保点赞部分对齐左边 */
}

.like-container button {
  font-size: 24px;
  margin-right: 10px;
  cursor: pointer;
  background-color: transparent;
  border: none;
}

.like-container .liked {
  color: red;
}

.like-container .unliked {
  color: gray;
}

/* 浏览量部分，左对齐 */
.view-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.view-container span {
  font-size: 16px;
  color: #666;
}

/* 评论框和发送按钮部分，右对齐 */
.comment-container {
  display: flex;
  align-items: center;
  gap: 10px; /* 间距 */
  justify-content: flex-end; /* 确保评论框右对齐 */
}

.comment-container input {
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 300px;
  font-size: 14px;
}

.comment-container input::placeholder {
  color: #aaa;
}

.comment-container button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.comment-container button:hover {
  background-color: #45a049;
}

/* 评论列表样式 */
.comment-list {
  width: 70%; /* 与视频宽度一致 */
  margin: 20px auto;
}

.comment-item {
  margin: 10px 0;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  font-size: 14px;
}

.comment-item strong {
  color: #333;
}

.comment-item span {
  color: #666;
}
</style>


