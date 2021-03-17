<template>
  <div class="order_total_container">
    <div class="search-container">
      <van-icon @click="clickShowTabSelect" class="filter_my" name="filter-o" />
      <div class="order_total_title-in">堂 食</div>
      <div class="order_total_title-out">外 卖</div>
      <van-icon @click="clickShowSearch" class="search_my" name="search" />
    </div>
    <van-tabs swipeable sticky animated
      color="#fff" title-active-color="#fff"
      title-inactive-color="#fff"
      @change="changeTab">
      <van-tab title="全部" name=''>
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
                <div class="price">￥{{parseFloat(item.O_TotlePrice).toFixed(2)}}</div>
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
      <van-tab title="待接单" name='4'>
        <van-pull-refresh v-model="isTotalRefreshLoading" @refresh="onRefreshTotal">
          <van-list v-model="isTotalListLoading" :finished="isTotalListFinished" finished-text="没有更多订单..."
            @load="onTotalListLoad" error-text="请求失败,点击重新加载" :error.sync="isTotalListError">
            <div class="my_card_wrap" v-for="(item, $index) in totalFormList" :key="$index">
              <div class="tab-wrap">
                <div class="tab-info">桌号：{{item.TT_Name}}-{{item.t_Name}}</div>
                <div class="tab-order-status-0" v-if="item.o_PayStatue===0">未付款</div>
                <div class="tab-order-status-1" v-if="item.o_PayStatue===1">已完成</div>
                <div class="tab-order-status-2" v-if="item.o_PayStatue===2">{{item.o_TotlePrice == 0 ? '全额退款' : '部分退款'}}</div>
                <div class="tab-order-status-3" v-if="item.o_PayStatue===3">未完成</div>
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
                <div class="price-content-wrap">
                  <div class="price">￥{{parseFloat(item.o_TotlePrice).toFixed(2)}}</div>
                  <van-switch :disabled="item.OA_IsTaking==0?false:true" @click="takingOrder($event, item)" v-model="item.OA_IsTaking" size="20" active-color="#1989FA" inactive-color="#ee0a24" />
                </div>
              </div>
              <div class="order-info-wrap">
                <div class="order-info-time-content-wrap">
                  <div class="label">下单：</div>
                  <div class="value">{{item.OA_OrderingTime}}</div>
                </div>
                <div class="order-info-osid-content-wrap">
                  <div class="label">单号：</div>
                  <div class="value">{{item.o_UniqSearchID}}</div>
                </div>
              </div>
              <div class="order-print-wrap">
                <van-button size="large">打印</van-button>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="未支付" name='0'>
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
                <div class="price">￥{{parseFloat(item.O_TotlePrice).toFixed(2)}}</div>
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
      <van-tab title="退款" name='2'>
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
                <div class="price">￥{{parseFloat(item.O_TotlePrice).toFixed(2)}}</div>
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
      <van-tab title="未完成" name='3'>
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
                <div class="price">￥{{parseFloat(item.O_TotlePrice).toFixed(2)}}</div>
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
      <van-tab title="已完成" name='1'>
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
                <div class="price">￥{{parseFloat(item.O_TotlePrice).toFixed(2)}}</div>
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
    </van-tabs>
    <!-- 选择餐桌 -->
    <van-popup safe-area-inset-bottom get-container=".order_total_container" duration="0.2" v-model="showTabSelect" position="right" :style="{ height: '100%', width: '100%' }">
      <div class="search-container">
        <van-icon @click="hideTabSelect" class="filter_my" name="arrow-left" />
        <span class="tabSelect_title">按桌位搜索</span>
        <span @click="hideTabSelect" class="confirm_hide">确认</span>
      </div>
      <van-tree-select class="tab-tree-select"
        :items="tabtypeList"
        :active-id.sync="totalTabId"
        :main-active-index.sync="tabtypeId"
        height="94%"
        @click-item="clickRealSelectTab"
      />
    </van-popup>
    <!-- 订单号、下单时间检索 -->
    <van-popup @click-overlay="searchPopupCancel" class="search-van-popup" round duration="0.2" get-container=".order_total_container" v-model="showSearch" position="top">
      <van-form @submit="searchSubmit">
        <van-field
          v-model="totalO_UniqSearchID"
          label="订单编号"
          placeholder="输入订单编号"
          colon
          input-align="right"
          maxlength="35"
          clickable
          label-width="65"
          clearable
        />
        <van-field
          colon
          input-align="right"
          readonly
          clickable
          clearable
          :value="totalO_StartString"
          label="开始时间"
          placeholder="点击选择时间"
          @click="showStartPicker = true"
          label-width="65"
        />
        <van-popup v-model="showStartPicker" position="bottom">
          <van-datetime-picker
            type="date"
            @confirm="onStartConfirm"
            @cancel="showStartPicker = false"
            v-model="startPicker"
          />
        </van-popup>
        <van-field
          colon
          input-align="right"
          readonly
          clickable
          clearable
          :value="totalO_EndString"
          label="结束时间"
          placeholder="点击选择时间"
          @click="showEndPicker = true"
          label-width="65"
        />
        <van-popup v-model="showEndPicker" position="bottom">
          <van-datetime-picker
            type="date"
            @confirm="onEndConfirm"
            @cancel="showEndPicker = false"
            v-model="endPicker"
          />
        </van-popup>
        <div class="search-button-wrap">
          <van-button size="small" round block type="info" native-type="submit">搜 索</van-button>
        </div>
      </van-form>
    </van-popup>
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
      totalDetailFormList: [],

      totalO_UniqSearchID: '',
      totalO_StartString: '',
      totalO_EndString: '',
      totalPayStatus: '',
      totalTabId: '',
      totalPageNum: 1,
      totalSize: 10,
      mmngctUserName: window.sessionStorage.mmngctUserName,

      showTabSelect: false,
      showSearch: false,

      tabtypeId: '',
      tabtypeList: [],

      startPicker: '',
      endPicker: '',

      showStartPicker: false,
      showEndPicker: false
    }
  },
  created () {
    this.getTabAndTabTypeOptions()
  },
  methods: {
    // searchSubmit
    async searchSubmit () {
    },
    // onEndConfirm
    onEndConfirm (time) {
      this.showEndPicker = false
      var date = time
      var day = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate()
      var month = date.getMonth() <= 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var year = date.getFullYear()
      this.totalO_EndString = year + '-' + month + '-' + day
    },
    // searchStartConfirm
    onStartConfirm (time) {
      this.showStartPicker = false
      var date = time
      var day = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate()
      var month = date.getMonth() <= 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var year = date.getFullYear()
      this.totalO_StartString = year + '-' + month + '-' + day
    },
    // search-popup-cancel
    searchPopupCancel () {
      this.totalO_UniqSearchID = ''
      this.totalO_StartString = ''
      this.totalO_EndString = ''
      this.startPicker = ''
      this.endPicker = ''
    },
    // 点击弹出搜索
    clickShowSearch () {
      this.showSearch = true
      // 获取今日时间
      var date = new Date()
      var day = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate()
      var month = date.getMonth() <= 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var year = date.getFullYear()
      this.totalO_EndString = this.totalO_StartString = year + '-' + month + '-' + day
      this.endPicker = this.startPicker = new Date()
    },
    // 选择餐桌
    clickRealSelectTab ($data) {
      // 退出
      this.hideTabSelect()
      // pullrefresh
      this.totalTabId = $data.id
      // 初始化查询条件
      this.totalO_UniqSearchID = ''
      this.totalO_StartString = ''
      this.totalO_EndString = ''

      this.totalFormList = []
      this.totalDetailFormList = []
      this.totalPageNum = 1
      this.isTotalListFinished = false
      this.onTotalListLoad()
    },
    // 获取餐桌数据
    async getTabAndTabTypeOptions () {
      const { data: res } = await this.$http.post('OSMAPP/ordersTabAndTabTypeOptions', {
        mmngctUserName: window.sessionStorage.mmngctUserName
      })
      if (res.meta.status !== 200) {
        this.$message.error('获取餐桌数据失败!')
        return
      }
      this.tabtypeList = res.data.ordersTabAndTabTypeOptions
    },
    // 从餐桌选择器返回
    hideTabSelect () {
      this.showTabSelect = false
    },
    // 点击弹出餐桌选择器
    clickShowTabSelect ($event) {
      this.showTabSelect = true
    },
    // 接单按钮
    async takingOrder (event, item) {
      const { data: res } = await this.$http.post('OSM/takingOrder', item)
      if (res.meta.status !== 200) {
        this.$notify({
          message: '接单失败!',
          background: '#FEF0F0',
          color: '#F56C6C'
        })
        return
      }
      this.$notify({
        message: '接单成功!',
        background: '#F0F9EB',
        color: '#67C23A'
      })
      this.onRefreshTotal()
    },
    // 切换tab
    changeTab (name, title) {
      this.totalPayStatus = name
      // 初始化查询条件
      this.totalO_UniqSearchID = ''
      this.totalO_StartString = ''
      this.totalO_EndString = ''
      this.totalTabId = ''
      this.totalDetailFormList = []
      this.onRefreshTotal()
    },
    // total List异步加载
    onTotalListLoad () {
      if (this.isTotalListFinished) {
        return
      }
      if (this.totalPayStatus === '4') {
        this.getNotTakingOrders()
      } else {
        this.getOrders()
      }
    },
    // 获取未接单数据
    async getNotTakingOrders () {
      const { data: res } = await this.$http.post('OSMAPP/notTakingOrerAddFormList', {
        mmngctUserName: this.mmngctUserName,
        pagenum: this.totalPageNum,
        pagesize: this.totalSize,
        totalTabId: this.totalTabId
      })
      if (res.meta.status !== 200) {
        // 加载失败，点击后重新触发load事件
        this.isTotalListError = true
        // 加载和下拉状态结束
        this.isTotalRefreshLoading = this.isTotalListLoading = false
        return
      }
      // 检查是否重复，如果重复就丢掉
      if (this.isInNotTakingFormList(res.data.notTakingOrerAddFormList[0])) {
        return
      }
      this.totalFormList = this.totalFormList.concat(res.data.notTakingOrerAddFormList)
      this.isTotalRefreshLoading = this.isTotalListLoading = false
      this.isTotalListFinished = res.data.notTakingOrerAddFormList.length < 10
      this.isTotalListError = false
      this.totalPageNum++
    },
    // 获取数据
    async getOrders () {
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
        // 加载失败，点击后重新触发load事件
        this.isTotalListError = true
        // 加载和下拉状态结束
        this.isTotalRefreshLoading = this.isTotalListLoading = false
        return
      }
      // 检查是否重复，如果重复就丢掉
      if (this.isInTotalFormList(res.data.orderFormList[0])) {
        return
      }
      this.totalFormList = this.totalFormList.concat(res.data.orderFormList)
      this.isTotalRefreshLoading = this.isTotalListLoading = false
      this.isTotalListFinished = res.data.orderFormList.length < 10
      this.isTotalListError = false
      this.totalPageNum++
    },
    // total下拉刷新
    async onRefreshTotal () {
      // 初始化查询条件
      this.totalO_UniqSearchID = ''
      this.totalO_StartString = ''
      this.totalO_EndString = ''
      this.totalTabId = ''

      this.totalFormList = []
      this.totalDetailFormList = []
      this.totalPageNum = 1
      this.isTotalListFinished = false
      this.onTotalListLoad()
    },
    // 判断订单是否在数组中
    isInTotalFormList (item) {
      // 先检查是不是空list
      if (item === undefined) {
        this.isTotalRefreshLoading = this.isTotalListLoading = false
        this.isTotalListFinished = true
        this.isTotalListError = false
        return true
      }
      for (var i = 0; i < this.totalFormList.length; i++) {
        if (this.totalFormList[i].O_UniqSearchID === item.O_UniqSearchID) {
          return true
        }
      }
      return false
    },
    isInNotTakingFormList (item) {
      // 先检查是不是空list导致item undefined
      if (item === undefined) {
        this.isTotalRefreshLoading = this.isTotalListLoading = false
        this.isTotalListFinished = true
        this.isTotalListError = false
        return true
      }
      for (var i = 0; i < this.totalFormList.length; i++) {
        if (this.totalFormList[i].OA_ID === item.OA_ID) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .search-button-wrap {
  position: relative;
  button {
    width: 90%;
    left: 50%;
    margin-top: 20px;/* no */
    transform: translate(-50%);
    font-size: 14px;/* no */
    font-weight: lighter !important;
    background: linear-gradient(to right, #FF9829, #FF601C);
    border: 0;
  }
}
/deep/ .search-van-popup {
  height: 200px;/* no */
  width: 100%;
  input {
    font-size: 10px;/* no */
  }
  span {
    font-weight: bold;
  }
}
.price-content-wrap {
  border-bottom: 1px solid #ddd;
  display: flex;
  position: relative;
  /deep/ .van-switch {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-30%, -50%);
  }
}
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
.my_card_wrap {
  background-color: #fff;
  margin-bottom: 15px;/* no */
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
    font-size: 20px;/* no */
    transform: translate(80%, -60%);
  }
  .filter_my:active, .search_my:active, .confirm_hide:active{
    color: #bbb;
  }
  .search_my {
    color: #fff;
    position: absolute;
    right: 0;
    top: 50%;
    font-size: 20px;/* no */
    transform: translate(-80%, -60%);
  }
  .confirm_hide {
    color: #fff;
    position: absolute;
    right: 0;
    top: 50%;
    font-size: 15px;/* no */
    transform: translate(-50%, -60%);
  }
  .tabSelect_title {
    color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 16px;/* no */
    transform: translate(-50%, -60%);
  }
}
.order_total_container {
  height: 100%;
  background-color: #eee;
}
/deep/ .van-tabs__wrap {
  margin-bottom: 20px;/* no */
}
/deep/ .van-tabs__nav {
  background-color: #000;
  background: linear-gradient(to right, #FF9829, #FF601C);
  padding-bottom: 2.3%;
}
/deep/ .van-tabs {
  height: 76%;
}
/deep/ .van-tabs__content {
  height: 100%;
}
/deep/ .van-tab__pane {
  height: 100%;
}
/deep/ .van-pull-refresh {
  height: 100%;
  overflow: auto;
}

/deep/ .van-list {
  padding-left: 10px;/* no */
  padding-right: 10px;/* no */
  padding-bottom: 10px;/* no */
  height: 100%;
}
</style>
