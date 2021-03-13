<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png">
      </div>
      <!-- 登陆表单区域 -->
      <van-form @submit="login" class="login_form" :show-error-message="false" :show-error="true" validate-trigger="onSubmit">
        <!-- 用户名 -->
        <van-field
          v-model="loginForm.username"
          name="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]">
          <template v-slot:left-icon>
            <van-icon class="iconfont" class-prefix="icon" name="user" />
          </template>
        </van-field>
        <!-- 按钮 -->
        <van-field
          v-model="loginForm.password"
          type="password"
          name="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]">
          <template v-slot:left-icon>
            <van-icon class="iconfont" class-prefix="icon" name="3702mima" />
          </template>
        </van-field>
        <div class="btns">
          <van-button class="left_btn" size="large" square type="info" native-type="submit">登 录</van-button>
          <van-button class="right_btn" size="large" square type="info" native-type="submit">重 置</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {}
  }
}
</script>

<style lang="less" scoped>
.iconfont{
  color: #C0C4CC;
}
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 510px;
  height: 340px;
  background-color: #eee;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);

  .avatar_box {
    width: 148px;
    height: 148px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 11.3px;
    box-shadow: 0 0 11.3px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #fff;
      position: relative;
      left: 5%;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  .left_btn {
    margin-right: 20px;
  }
  .right_btn {
    margin-left: 20px;
    background-color: #909399;
    border-color: #909399;
  }
  button {
    border-radius: 4px;
  }
}
.login_form {
  position: absolute;
  bottom: 50%;
  width: 100%;
  padding: 0 22.6px;
  box-sizing: border-box;
  transform: translate(0, 70%);
}
</style>
