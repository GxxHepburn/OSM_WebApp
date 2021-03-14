<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png">
      </div>
      <!-- 登陆表单区域 -->
      <van-form ref="loginFormRef" v-model="loginForm" @submit="login" class="login_form" :show-error-message="true" :show-error="false">
        <!-- 用户名 -->
        <!-- { validator: loginFormUsernameValidator, message: '手机号码必须为11位', },
          { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码', }
          maxlength="11" -->
        <van-field
          class="userNameInput"
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
    <!-- 验证码弹窗 -->
    <van-dialog v-model="checkDialogVisible" class="checkDialog" :show-confirm-button="false" :show-cancel-button="true"
      cancel-button-color="#ee0a24">
      <p class="checkDialogTips">您的账号已经绑定手机{{mmngct.MMA_Phone}},您需要通过短信验证码登陆账号</p>
      <van-form @submit="getCheckNumButtonClick" class="checkDialogForm" v-model="checkForm">
        <div class="phone_wrap">
          <span class="left_phone">手 机 号:</span>
          <span>{{mmngct.MMA_Phone}}</span>
        </div>
        <div class="check_wrap">
          <van-field
            class="checkNumInput"
            v-model="checkForm.checkNum"
            label="验证码"
            label-width="62"
            colon
            maxlength="6"/>
          <van-button  class="getCheckNumButton" :disabled="checkDialogButtonDisalbe" size="small" hairline plain  square type="info" native-type="submit">{{checkNumButtonText}}</van-button>
        </div>
      </van-form>
      <van-button class="checkDialogConfirmButton" size="normal"  square type="info" @click="realCheckNumButtonClick">确 定</van-button>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkNumButtonText: '获取验证码',
      checkDialogButtonDisalbe: false,
      jwtString: '',
      mmngct: '',
      // 验证码弹窗控制
      checkDialogVisible: false,
      // 验证码
      checkForm: {
        checkNum: ''
      },
      loginForm: {
        username: 'DianCaiBaoTest',
        password: 'DianCaiBao123'
      }
    }
  },
  methods: {
    // 发送验证码
    async getCheckNumButtonClick () {
      // 发送获取验证码逻辑,需要携带token（在heaers中)
      const { data: res } = await this.$http.post('OSM/sendCheck', this.mmngct, {
        headers: {
          Authorization: this.jwtString
        }
      })
      if (res.meta.status !== 200) {
        // 根据阿里云返回的情况，要分别提示
        this.$notify({
          message: res.meta.msg,
          background: '#FEF0F0',
          color: '#F56C6C'
        })
        return
      }

      // 计时器计时
      this.checkDialogButtonDisalbe = true
      const TIME_COUNT = 60
      this.checkNumButtonText = TIME_COUNT
      var timer = setInterval(() => {
        if (this.checkNumButtonText > 0) {
          this.checkNumButtonText--
        } else {
          this.checkDialogButtonDisalbe = false
          this.checkNumButtonText = '获取验证码'
          clearInterval(timer)
        }
      }, 1000)
      this.$notify({
        message: res.meta.msg,
        background: '#F0F9EB',
        color: '#67C23A'
      })
    },
    // 验证登陆
    async realCheckNumButtonClick () {
      this.mmngct.checkNum = this.checkForm.checkNum
      const { data: res } = await this.$http.post('OSM/realCheck', this.mmngct, {
        headers: {
          Authorization: this.jwtString
        }
      })
      if (res.meta.status !== 200) {
        this.$notify({
          message: res.meta.msg,
          background: '#FEF0F0',
          color: '#F56C6C'
        })
        return
      }
      // 登陆成功，设置token
      this.$notify({
        message: '登陆成功',
        background: '#F0F9EB',
        color: '#67C23A'
      })
      // 1. 将登陆之后的 token，保存到客户端的 sessionStorage 中
      //  1.1 项目中除了登陆之外的其他API接口，必须在登陆之后才能访问
      //  1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
      window.sessionStorage.setItem('token', this.jwtString)
      // 登陆成功后，保存管理者用户名，也就是唯一的电话号码
      window.sessionStorage.setItem('mmngctUserName', this.loginForm.username)
      // 2. 通过编程式导航跳转到后台主页， 路由地址是 /home
      this.$router.push('/static/home')
    },
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
            color: '#F56C6C'
          })
          return
        } else if (res.meta.status === 500) {
          this.$notify({
            message: '发生未知错误，请重试或联系管理员！',
            background: '#FEF0F0',
            color: '#F56C6C'
          })
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
        message: '登陆成功',
        background: '#F0F9EB',
        color: '#67C23A'
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
/deep/ .van-cell::after{
  border-bottom-width: 0;
}
/deep/ .van-hairline--top::after {
  border-top-width: 0;
}
.checkDialogConfirmButton {
  width: 80%;
  border-radius: 5px;
  margin-left: 10%;
  margin-top: 5%;
}
.checkDialogTips {
  text-align: center;
  padding: 0 5%;
  padding-top: 2%;
  font-size: 10px;
}
.check_wrap {
  display: flex;
  button {
    width: 40%;
    margin-left: 4%;/* no */
    margin-right: 6%;/* no */
    margin-top: 2%;
  }
}
.phone_wrap {
  padding: 10px 16px;/* no */
  .left_phone {
    padding-right: 20px;
  }
}
.checkNumInput {
  /deep/ .van-cell__value {
    border: 1px solid #eee;
  }
}
.iconfont{
  color: #C0C4CC;
  font-size: 20px;/* no */
}
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 510px;
  height: 340px;
  background-color: #2b4b6b;
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
    transform: translate(-50%, -80%);
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

  .userNameInput {
    margin-bottom: 50px;
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
  transform: translate(0, 90%);
}
</style>
