<script>
import axios from 'axios'
import Navbar from '@/components/Navbar.vue'
export default {
  components: {Navbar},
  data() {
    return {
      registerData: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      loginData: {
        username: '',
        password: ''
      },
      isLoginBoxUp: false
    }
  },
  created() {
    const Username = sessionStorage.getItem('Username')
    const Password = sessionStorage.getItem('Password')
    if (Username && Password) {
      window.location.href = '/'
    }
  },
  methods: {
    toggleForm(form) {
      if (form === 'login') {
        this.isLoginBoxUp = true
      } else if (form === 'register') {
        this.isLoginBoxUp = false
      }
    },
    register() {
      // 获取用户名和密码
      const username = this.registerData.username
      const password = this.registerData.password

      if (this.registerData.password !== this.registerData.confirmPassword) {
        console.error('密码和确认密码不一致')
        return
      }

      // 密码要求的正则表达式
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

      // if (!passwordPattern.test(password)) {
      //   console.error('密码至少为8位数，并且要包含大小写字母数字数')
      //   return
      // }

      // 向后端发送注册请求
      axios
          .post('http://localhost/backend/web/api/users', {
            username: username,
            password: password
          })
          .then((response) => {
            const status = response.data.status
            if (status === 1) {
              this.$message.success('注册成功')
              this.loginData.username = this.registerData.username
              this.loginData.password = this.registerData.password
              this.toggleForm('login')
            } else if (status === 0) {
              // 注册失败
              console.error('用户已存在')
            }
          })
          .catch((error) => {
            console.error('登录失败:', error)
          })
    },
    login() {
      // 获取用户名和密码
      const username = this.loginData.username
      const password = this.loginData.password

      // 使用 POST 请求进行登录
      axios
          .post('http://localhost/backend/web/api/users/login', {
            username: username,
            password: password
          })
          .then((response) => {
            const status = response.data.data.status
            if (status === 1) {
              // 登录成功
              sessionStorage.setItem('Username', username)
              sessionStorage.setItem('Password', password)
              console.error('登录成功')//????????????????????????????

              // 导航到首页
              setTimeout(() => {
                window.location.href = '/'
              }, 2000)
            } else {
              // 登录失败
              console.error('用户名或密码错误')
            }
          })
          .catch((error) => {
            console.error('登录失败:', error)
          })
          .catch((error) => {
            console.error('登录失败:', error)
          })
    }
  }
}
</script>

<template>
<!--  <Navbar />-->
  <div class="login">
    <div class="register-box" :class="{ 'slide-up': isLoginBoxUp }">
      <h2 class="register-title" @click="toggleForm('register')"><span>没有账号，去</span>注册</h2>
      <div class="input-box">
        <input type="text" placeholder="用户名" v-model="registerData.username" />
        <input type="password" placeholder="密码" v-model="registerData.password" />
        <input type="password" placeholder="确认密码" v-model="registerData.confirmPassword" />
      </div>
      <button @click="register">注册</button>
    </div>
    <div class="login-box" :class="{ 'slide-up': !isLoginBoxUp }">
      <div class="center">
        <h2 class="login-title" @click="toggleForm('login')"><span>已有账号，去</span>登录</h2>
        <div class="input-box">
          <input type="text" placeholder="用户名" v-model="loginData.username" />
          <input type="password" placeholder="密码" v-model="loginData.password" />
        </div>
        <button @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

.login {
  background-color: #222; /* 背景色保持不变 */
  width: 100%; /* 设置宽度为视口宽度 */
  height: 100%; /* 设置高度为视口高度 */
  border-radius: 0; /* 移除圆角，让元素覆盖整个屏幕 */
  overflow: hidden;
  position: fixed; /* 确保元素始终覆盖屏幕，即使滚动 */
}


.login::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  background: url('../assets/images/R.jpg') no-repeat;
  background-size: cover;

  background-position: left bottom;
  opacity: 0.8;
}

.register-box {
  width: 40%;
  position: absolute;
  z-index: 1;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 1s ease;
}

.register-title,
.login-title {
  color: #fff;
  font-size: 35px;
  text-align: center;
}

.register-title span,
.login-title span {
  color: #A6CFBB;
  display: none;
}

.register-box .input-box,
.login-box .input-box {
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;
  margin-top: 50px;
  opacity: 1;
  visibility: visible;
  transition: 0.5s ease;
}

.register-box input,
.login-box input {
  width: 100%;
  height: 30px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 12px;
  padding: 8px 0;
  text-indent: 15px;
  outline: none;
}

.register-box input:last-child,
.login-box input:last-child {
  border-bottom: none;
}

.register-box input::placeholder,
.login-box input::placeholder {
  color: rgba(0, 0, 0, 0.4);
}

.register-box button,
.login-box button {
  width: 100%;
  padding: 15px 45px;
  margin: 15px 0;
  background: rgba(0, 0, 0, 0.4);
  border: none;
  border-radius: 15px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  opacity: 1;
  visibility: visible;
  transition: 1s ease;
}

.register-box button:hover,
.login-box button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

/* 登录区域 */
.login-box {
  position: absolute;
  inset: 0;
  top: 20%;
  z-index: 2;
  background-color: #fff;
  transition: 1s ease;
}

.login-box::before {
  content: '';
  background-color: #fff;
  width: 200%;
  height: 250px;
  border-radius: 50%;
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
}

.login-box .center {
  width: 70%;
  position: absolute;
  z-index: 3;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}

.login-title {
  color: #000;
}

.login-box .input-box {
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.login-box button {
  background-color: #0d2040;
}

/* 注册、登录区域收起 */
.login-box.slide-up {
  top: 80%;
}

.login-box.slide-up .center {
  top: 10%;
  transform: translate(-50%, 0%);
}

.login-box.slide-up .login-title,
.register-box.slide-up .register-title {
  font-size: 16px;
  cursor: pointer;
}

.login-box.slide-up .login-title span,
.register-box.slide-up .register-title span {
  margin-right: 5px;
  display: inline-block;
}

.login-box.slide-up .input-box,
.login-box.slide-up .button,
.register-box.slide-up .input-box,
.register-box.slide-up .button {
  opacity: 0;
  visibility: hidden;
}

.register-box.slide-up {
  top: 6%;
  transform: translate(-50%, 0%);
}
</style>