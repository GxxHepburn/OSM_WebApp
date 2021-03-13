<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png">
      </div>
      <!-- 登陆表单区域 -->
      <van-form ref="loginFormRef" @submit="login" class="login_form" :show-error-message="true" :show-error="false">
        <!-- 用户名 -->
        <!-- { validator: loginFormUsernameValidator, message: '手机号码必须为11位', },
          { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码', }
          maxlength="11" -->
        <van-field
          v-model="loginForm.username"
          name="用户名"
          placeholder="请输入用户名"
          :rules="[
          { required: true, message: '请填写用户名', },
          ]"
          :clearable="true"
          :clickable="true"
          size="large">
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
          :rules="[
          { required: true, message: '请填写密码', },
          { validator: loginFormPasswordValidator, message: '长度 6 到 15 个字符', }
          ]"
          :clearable="true"
          :clickable="true"
          maxlength="15">
          <template v-slot:left-icon>
            <van-icon class="iconfont" class-prefix="icon" name="3702mima" />
          </template>
        </van-field>
        <div class="btns">
          <van-button class="left_btn" size="large" square type="info" native-type="submit">登 录</van-button>
          <van-button class="right_btn" size="large" square type="info" @click="resetLoginForm">重 置</van-button>
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
    // 重置标案
    resetLoginForm () {
      this.loginForm.username = ''
      this.loginForm.password = ''
    },
    // 密码验证字符长度
    loginFormPasswordValidator (val) {
      if (val.length < 6 || val.length > 15) {
        return false
      } else {
        return true
      }
    },
    // 用户名验证字符长度
    loginFormUsernameValidator (val) {
      if (val.length !== 11) {
        return false
      } else {
        return true
      }
    },
    // 登陆方法
    async login () {
      const { data: res } = await this.$http.post('OSM/login', this.loginForm)
      if (res.meta.status !== 200) {
        if (res.meta.status === 401) {
          this.$notify({
            message: '请输入正确的用户名和密码！',
            background: '#FEF0F0',
            color: '#F56C6C',
            height: '200px'
          })
          return
        } else if (res.meta.status === 500) {
          this.$message.error('发生未知错误，请重试或联系管理员')
          return
        } else if (res.meta.status === 201) {
          // 弹出验证码框
          this.checkDialogVisible = true
          this.mmngct = res.data.mmngct
          this.jwtString = res.data.token
          return
        }
      }
      // 登陆成功提示
      this.$notify({
        type: 'success',
        message: '登陆成功'
      })
      // 1. 将登陆之后的 token，保存到客户端的 sessionStorage 中
      //  1.1 项目中除了登陆之外的其他API接口，必须在登陆之后才能访问
      //  1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
      window.sessionStorage.setItem('token', res.data.token)
      // 登陆成功后，保存管理者用户名，也就是唯一的电话号码
      window.sessionStorage.setItem('mmngctUserName', this.loginForm.username)
      // 2. 通过编程式导航跳转到后台主页， 路由地址是 /home
      this.$router.push('/static/home')
    }
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
