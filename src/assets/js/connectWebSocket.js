function reconnect () {
  if (reconnect.lockReconnect) {
    return
  }
  if (window.reConNum < 10) {
    // 播报语音，弹出窗口
    // window.VueThat.$voicePromptFun.voicePrompt('与服务器断开连接，正在尝试重新连接')
    window.reConNum = window.reConNum + 1
    reconnect.lockReconnect = true
    setTimeout(function () {
      openWebSocket()
      reconnect.lockReconnect = false
    }, 2000)
  }
}
function openWebSocket () {
  var name = window.sessionStorage.getItem('mmngctUserName')
  var token = window.sessionStorage.getItem('token')

  // window.VueThat.$voicePromptFun.voicePrompt('连接成功,正在接单')

  // 对这两个值加密，然后在服务器端解密-没这个必要，因为请求要先验证token，所以拿到这两个值也没用。再其次，加密之后解密，等于做了无用功！
  if (window.wbss !== undefined && window.wbss.readyState === 1) {
    return
  }
  window.wbss = new WebSocket('wss://www.donghuastar.com/websocketOrdering?name=' + name + '&token=' + token)

  window.wbss.addEventListener('open', function (event) {
    heartCheck.reset().start()
    // 重置重连次数
    window.reConNum = 0
  })

  window.wbss.addEventListener('message', function (event) {
    heartCheck.reset().start()
    var data = JSON.parse(event.data)
    if (data.type === '1') {
      window.VueThat.$voicePromptFun.voicePrompt(data.voiceText)
      // 收款成功，接收收款信息
      // 弹出是否跳转到相应订单提示，5s，不按按钮，则什么不做，按按钮，就跳转到该订单（订单搜索)==============================================================================================================================
    }
    if (data.type === '3') {
      window.VueThat.$voicePromptFun.voicePrompt(data.voiceText)
    }
    if (data.type === '2') {
      window.VueThat.$voicePromptFun.voicePrompt(data.voiceText)
      // 判断是不是在接单界面，如果是，就刷新数据，如果不是，就路由到接单界面====================================================================================================================
    }
  })

  window.wbss.addEventListener('close', function (e) {
    if (window.sessionStorage.getItem('isNeedToConnectWebSocket') === '1') {
      reconnect()
    } else {
      heartCheck.reset()
    }
  })

  window.wbss.addEventListener('error', function (e) {
    if (window.sessionStorage.getItem('isNeedToConnectWebSocket') === '1') {
      reconnect()
    }
  })

  var heartMsg = {
    type: 0
  }

  var heartCheck = {
    // 50s发一次
    timeout: 50000,
    closeTimeout: 58000,
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function () {
      clearTimeout(this.timeoutObj)
      clearTimeout(this.serverTimeoutObj)
      return this
    },
    start: function () {
      var self = this
      this.timeoutObj = setTimeout(function () {
        // 这里发送一个心跳，后端收到后，返回一个心跳消息，
        // onmessage拿到返回的心跳就说明连接正常
        window.wbss.send(JSON.stringify(heartMsg))
        // 如果超过一定时间还没重置，说明后端主动断开了
        self.serverTimeoutObj = setTimeout(function () {
          // 语音报告后端断开了
          window.wbss.close()
        }, self.closeTimeout)
      }, this.timeout)
    }
  }
}
export default {
  openWebSocket
}
