<template>
  <div class="order_total_container">
    <div class="search-container">
      <van-icon name="filter-o" />
    </div>
    <van-tabs sticky swipeable
      color="#fff" title-active-color="#fff"
      title-inactive-color="#fff">
      <van-tab title="全部"></van-tab>
      <van-tab title="待接单"></van-tab>
      <van-tab title="未支付"></van-tab>
      <van-tab title="部分退款"></van-tab>
      <van-tab title="全额退款"></van-tab>
      <van-tab title="未完成"></van-tab>
      <van-tab title="已完成"></van-tab>
    </van-tabs>
    <div class="content-container">
    </div>
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
.search-container {
  height: 6%;
  background: linear-gradient(to right, #FF9829, #FF601C);
  .van-icon {
    color: #fff;
    margin-left: 3%;
    vertical-align: middle;
  }
}
.order_total_container {
  height: 100%;
  background-color: #EBEBEB;
}
/deep/ .van-tabs__nav {
  background-color: #000;
  background: linear-gradient(to right, #FF9829, #FF601C);
  padding-bottom: 2.3%;
}
</style>
