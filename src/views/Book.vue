<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 定义响应式数据
const books = ref([]);

// 在组件挂载时获取数据
onMounted(async () => {
  try {
    // 确保这是正确的 API 地址
    const response = await axios.get('http://127.0.0.1:500/vue3-yii2/backend/web/index.php?r=books/index'); // 后端 API 地址
    if (response.data.success) {
      books.value = response.data.data; // 将获取的数据赋值给响应式变量
    } else {
      console.error('Failed to fetch books data');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<template>
  <div>
    <table border="1" cellspacing="0" cellpadding="5">
      <thead>
      <tr>
        <th>编号</th>
        <th>图书名称</th>
        <th>作者</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="book in books" :key="book.id">
        <td>{{ book.id }}</td>
        <td>{{ book.name }}</td>
        <td>{{ book.author }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  text-align: left;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
}
</style>
