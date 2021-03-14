<template>
  <div class="order_total_container">
    <div class="search-container">
      <van-icon name="filter-o" />
    </div>
    <van-tabs swipeable
      color="#fff" title-active-color="#fff"
      title-inactive-color="#fff">
      <van-tab title="全部">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <div class="pull-refresh_my-content">
            1
          </div>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="待接单">2</van-tab>
      <van-tab title="未支付">3</van-tab>
      <van-tab title="部分退款">4</van-tab>
      <van-tab title="全额退款">5</van-tab>
      <van-tab title="未完成">6</van-tab>
      <van-tab title="已完成">7</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    onRefresh () {
      console.log('刷新了')
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
/deep/ .van-tabs {
  height: 80%;
}
/deep/ .van-tabs__content {
  height: 100%;
}
/deep/ .van-tab__pane {
  height: 100%;
}
/deep/ .van-pull-refresh {
  height: 100%;
  .pull-refresh_my-content {
    height: 100%;
  }
}
</style>
