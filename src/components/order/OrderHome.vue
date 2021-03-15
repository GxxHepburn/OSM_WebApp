<template>
  <div class="order_total_container">
    <div class="search-container">
      <van-icon class="filter_my" name="filter-o" />
      <div class="order_total_title-in">堂 食</div>
      <div class="order_total_title-out">外 卖</div>
      <van-icon class="search_my" name="search" />
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
.order_total_title-in {
  display: inline-block;
  color: #FF9829;
  background-color: #fff;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border: 1px solid #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-100%, -50%);
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 25px;
  vertical-align: middle;
}
.order_total_title-out {
  display: inline-block;
  color: #fff;
  background-color: #FF601C;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-1%, -50%);
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 25px;
  vertical-align: middle;
}
.search-container {
  height: 6%;
  background: linear-gradient(to right, #FF9829, #FF601C);
  position: relative;
  .filter_my {
    color: #fff;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(80%, -50%);
  }
  .search_my {
    color: #fff;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(-80%, -50%);
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
