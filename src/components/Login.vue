<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 510px;
  height: 340px;
  background-color: #fff;
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
</style>
