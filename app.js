//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var menu = wx.getStorageSync('menu')
    if (menu == "") {
      wx.setStorageSync('menu', "hamburger 焼き肉 삼계탕 饺子")
    }

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    zh: {
      login: "获取头像昵称",
      start: "开始",
      stop: "停止",
      again: "不行，重来",
      today_menu: "今天吃",
      edit_menu: "定义菜单",
      save: "保存",
    },
    ja: {
      login: "アイコン、ニックネーム取得",
      start: "開始",
      stop: "停止",
      again: "だめだ、もう一回",
      today_menu: "今日の食べたいのは",
      edit_menu: "メニュー編集",
      save: "保存",
    },
    en: {
      login: "Get icon nickname",
      start: "Start",
      stop: "Stop",
      again: "No,again",
      today_menu: "Today's Menu is ",
      edit_menu: "Edit menu",
      save: "Save"
    }
  }
})