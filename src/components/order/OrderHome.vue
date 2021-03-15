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
        <van-pull-refresh v-model="isTotalRefreshLoading" @refresh="onRefreshTotal">
          <van-list v-model="isTotalListLoading" :finished="isTotalListFinished" finished-text="没有更多订单..."
            @load="onTotalListLoad" error-text="请求失败,点击重新加载" :error.sync="isTotalListError">
            <div class="my_card_wrap" v-for="(item, $index) in totalFormList" :key="$index">
              <div class="tab-wrap">
                <div class="tab-info">桌号：{{item.TT_Name}}-{{item.T_Name}}</div>
                <div class="tab-order-status-0" v-if="item.O_PayStatue===0">未付款</div>
                <div class="tab-order-status-1" v-if="item.O_PayStatue===1">已完成</div>
                <div class="tab-order-status-2" v-if="item.O_PayStatue===2">{{item.O_TotlePrice == 0 ? '全额退款' : '部分退款'}}</div>
                <div class="tab-order-status-3" v-if="item.O_PayStatue===3">未完成</div>
              </div>
              <div class="order-detail-wrap">
                <div class="order-detail-content-wrap">
                  <van-collapse v-model="totalDetailFormList[$index]" accordion>
                    <van-collapse-item name="商品详情">
                      <template #title>
                        <div><van-icon class="records_icon" name="records" /> <span class="order-detail-info-title">商品详情</span></div>
                      </template>
                      内容
                    </van-collapse-item>
                  </van-collapse>
                </div>
                <!-- 金额 -->
                <div class="price">￥{{item.O_TotlePrice.toFixed(2)}}</div>
              </div>
              <div class="order-info-wrap">
                <div class="order-info-time-content-wrap">
                  <div class="label">下单：</div>
                  <div class="value">{{item.O_OrderingTime}}</div>
                </div>
                <div class="order-info-osid-content-wrap">
                  <div class="label">单号：</div>
                  <div class="value">{{item.O_UniqSearchID}}</div>
                </div>
              </div>
              <div class="order-print-wrap">
                <van-button size="large">打印</van-button>
              </div>
            </div>
          </van-list>
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

      isTotalRefreshLoading: false,
      isTotalListLoading: false,
      isTotalListFinished: false,
      isTotalListError: false,
      totalFormList: [],

      totalO_UniqSearchID: '',
      totalO_StartString: '',
      totalO_EndString: '',
      totalPayStatus: '',
      totalTabId: '',
      totalPageNum: 1,
      totalSize: 10,
      mmngctUserName: window.sessionStorage.mmngctUserName,

      totalDetailFormList: []
    }
  },
  methods: {
    // total List异步加载
    async onTotalListLoad () {
      const { data: res } = await this.$http.post('OSM/getOrderFormList', {
        mmngctUserName: this.mmngctUserName,
        pagenum: this.totalPageNum,
        pagesize: this.totalSize,
        OrderStartTime: this.totalO_StartString,
        OrderEndTime: this.totalO_EndString,
        PayStatus: this.totalPayStatus,
        TabId: this.totalTabId,
        O_UniqSearchID: this.totalO_UniqSearchID,
        // 为了兼容osmweb端接口，不用管他
        touchButton: 1,
        U_OpenId: '',
        TabTypeId: ''
      })
      if (res.meta.status !== 200) {
        this.$message.error('获取订单数据失败!')
        // 怎么设置 boolean
        return
      }
      this.totalFormList = res.data.orderFormList
    },
    // total下拉刷新
    async onRefreshTotal () {
    }
  }
}
</script>

<style lang="less" scoped>
.order-print-wrap {
  padding-bottom: 10px;/* no */
  padding-left: 5px;/* no */
  padding-right: 5px;/* no */
  .van-button {
    border:  1px solid #67B3A9;/* no */
    border-radius: 5px;/* no */
    height: 28px;/* no */
    color: #67B3A9;
    font-size: 13px;/* no */
  }
}
.order-info-wrap {
  padding-left: 10px;/* no */
  padding-right: 10px;/* no */
  padding-top: 5px;/* no */
  padding-bottom: 15px;/* no */
  border-bottom: 1px solid #ddd;/* no */
  .order-info-time-content-wrap {
    display: flex;
    .label {
      font-size: 13px;/* no */
      color: #848484;
    }
    .value {
      font-size: 12px;/* no */
      transform: translate(0, 15%);
      color: #a9a9a9;
    }
  }
  .order-info-osid-content-wrap {
    display: flex;
    .label {
      font-size: 13px;/* no */
      color: #848484;
    }
    .value {
      font-size: 12px;/* no */
      transform: translate(0, 15%);
      color: #505050;
    }
  }
}
.order-detail-wrap {
  padding-left: 10px;/* no */
  padding-right: 10px;/* no */
  padding-top: 20px;/* no */
  /deep/ .van-collapse-item__title {
    border-top-right-radius: 5px;/* no */
    border-top-left-radius: 5px;/* no */
    background-color: #eee;
    position: relative;
    padding-top: 2px;/* no */
    padding-bottom: 5px;/* no */
    .records_icon {
      font-size: 25px;/* no */
      color: #1982EB;
      position: relative;
      transform: translate(0, 20%);
    }
    .order-detail-info-title {
      font-size: 14px;/* no */
      font-weight: bold;
    }
  }
  /deep/ .van-collapse-item__content{
    background-color: #eee;
    border-bottom-left-radius: 5px;/* no */
    border-bottom-right-radius: 5px;/* no */
    border-top: 1px solid #ddd;
  }
  .order-detail-content_border_my {
    height: 1px;/* no */
    width: 100%;
    background: #ddd;
  }
  .price {
    color: #FF601C;
    font-size: 17px;/* no */
    border-bottom: 1px solid #ddd;
    padding-top: 10px;/* no */
    padding-bottom: 10px;/* no */
  }
}
.tab-wrap {
  height: 40px;/* no */
  border-bottom: 1px solid #eee;/* no */
  position: relative;
  .tab-info {
    font-size: 14px;/* no */
    font-weight: bold;
    position: absolute;
    top: 50%;
    left: 5%;
    transform: translate(0, -50%);
  }
  .tab-order-status-0 {
    position: absolute;
    right: 4%;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 13px;/* no */
    background-color: #FEF0F0;
    color: #FE6C6C;
    border: 1px solid #FE6C6C;/* no */
    padding: 5px 6px;/* no */
    border-radius: 3px;/* no */
  }
  .tab-order-status-1 {
    position: absolute;
    right: 4%;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 13px;/* no */
    background-color: #ECF5FF;
    color: #409EFF;
    border: 1px solid #409EFF;/* no */
    padding: 5px 6px;/* no */
    border-radius: 3px;/* no */
  }
  .tab-order-status-2 {
    position: absolute;
    right: 4%;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 13px;/* no */
    background-color: #FDF6EC;
    color: #EBAA8B;
    border: 1px solid #EBAA8B;/* no */
    padding: 5px 6px;/* no */
    border-radius: 3px;/* no */
  }
  .tab-order-status-3 {
    position: absolute;
    right: 4%;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 13px;/* no */
    background-color: #F4F4F5;
    color: #909399;
    border: 1px solid #909399;/* no */
    padding: 5px 6px;/* no */
    border-radius: 3px;/* no */
  }
}
/deep/ .van-list {
  padding-left: 10px;/* no */
  padding-right: 10px;/* no */
  padding-top: 10px;/* no */
  padding-bottom: 10px;/* no */
}
.my_card_wrap {
  background-color: #fff;
  margin-top: 15px;/* no */
  border-radius: 5px;/* no */
}
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
  background-color: #eee;
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
}
</style>
