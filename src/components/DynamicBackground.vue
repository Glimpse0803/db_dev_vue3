<!--<template>-->
<!--  <div class="background-container">-->
<!--    &lt;!&ndash; 使用 tsParticles 显示粒子效果 &ndash;&gt;-->
<!--    <Particles id="tsparticles" :options="particlesOptions" />-->
<!--    &lt;!&ndash; 你的其他内容 &ndash;&gt;-->
<!--    <slot></slot>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { tsParticles } from "tsparticles";-->
<!--import Particles from "vue3-particles";-->

<!--export default {-->
<!--  components: {-->
<!--    Particles-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      // 设置粒子效果的配置-->
<!--      particlesOptions: {-->
<!--        particles: {-->
<!--          number: {-->
<!--            value: 50, // 粒子数量-->
<!--          },-->
<!--          color: {-->
<!--            value: "#56ab2f", // 浅绿色-->
<!--          },-->
<!--          shape: {-->
<!--            type: "circle", // 粒子形状-->
<!--          },-->
<!--          opacity: {-->
<!--            value: 0.6, // 粒子的透明度-->
<!--            random: true, // 随机透明度-->
<!--          },-->
<!--          size: {-->
<!--            value: 3, // 粒子大小-->
<!--            random: true, // 随机大小-->
<!--          },-->
<!--          move: {-->
<!--            enable: true,-->
<!--            speed: 1, // 粒子移动速度-->
<!--            direction: "none", // 粒子方向-->
<!--            random: true, // 随机方向-->
<!--            straight: false,-->
<!--          },-->
<!--        },-->
<!--        interactivity: {-->
<!--          events: {-->
<!--            onhover: {-->
<!--              enable: true,-->
<!--              mode: "repulse", // 鼠标悬浮时，粒子远离鼠标-->
<!--            },-->
<!--          },-->
<!--        },-->
<!--      },-->
<!--    };-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.background-container {-->
<!--  position: relative;-->
<!--  width: 100vw;-->
<!--  height: 100vh;-->
<!--  background: linear-gradient(45deg, #a8e063, #56ab2f); /* 浅绿色渐变背景 */-->
<!--  overflow: hidden;-->
<!--  animation: gradientAnimation 5s ease infinite, floatAnimation 10s ease-in-out infinite;-->
<!--}-->

<!--/* 渐变动画 */-->
<!--@keyframes gradientAnimation {-->
<!--  0% {-->
<!--    background: linear-gradient(45deg, #a8e063, #56ab2f);-->
<!--  }-->
<!--  50% {-->
<!--    background: linear-gradient(135deg, #56ab2f, #a8e063);-->
<!--  }-->
<!--  100% {-->
<!--    background: linear-gradient(45deg, #a8e063, #56ab2f);-->
<!--  }-->
<!--}-->

<!--/* 浮动动画 */-->
<!--@keyframes floatAnimation {-->
<!--  0% {-->
<!--    transform: translateY(0);-->
<!--  }-->
<!--  50% {-->
<!--    transform: translateY(-20px);-->
<!--  }-->
<!--  100% {-->
<!--    transform: translateY(0);-->
<!--  }-->
<!--}-->

<!--/* 这里不需要手动定义粒子了，所有粒子效果通过 tsParticles 来生成 */-->
<!--</style>-->


<template>

</template>

<style>

</style>

<script>

</script>
