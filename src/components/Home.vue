<template>
  <div class="home-container">
      <router-view :key="$route.path"></router-view>
      <van-tabbar :route="true">
        <van-tabbar-item icon="add-o" to="/static/menuHome">菜单</van-tabbar-item>
        <van-tabbar-item icon="orders-o" to="/static/orderHome">订单</van-tabbar-item>
        <van-tabbar-item icon="user-o" to="/static/merHome">店铺</van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
</style>
