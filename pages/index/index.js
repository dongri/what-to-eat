//index.js
//获取应用实例
const app = getApp()

var timer;
var menu;
var lang;

Page({
  getLanguage: function () {
    if (lang.includes("zh")) {
      return "zh"
    } else if (lang.includes("ja")) {
      return "ja"
    } else {
      return "en"
    }
  },
  setViewData: function () {
    this.setData({
      login: app.globalData[this.getLanguage()].login,
      actionButton: app.globalData[this.getLanguage()].start,
      item: app.globalData[this.getLanguage()].today_menu + "?",
      editMenu: app.globalData[this.getLanguage()].edit_menu,
    })
  },
  showMenu: function () {
    var r = Math.floor(Math.random() * menu.length)
    this.setData({
      item: app.globalData[this.getLanguage()].today_menu + menu[r]
    })
  },
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  bindStartTap: function() {
    if (timer) {
      clearInterval(timer)
      timer = null
      this.setData({
        actionButton: app.globalData[this.getLanguage()].again
      })
    } else {
      menu = wx.getStorageSync('menu').split(/ |　/)
      timer = setInterval(this.showMenu, 50)
      this.setData({
        actionButton: app.globalData[this.getLanguage()].stop
      })
    }
  },

  bindNavigatorTap: function() {
    clearInterval(timer)
    timer = null
    wx.navigateTo({
      url: '../define/define'
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    var that = this
    wx.getSystemInfo({
      success: function (res) {
        lang = res.language
        that.setViewData()
      }
    })

  },

  onHide: function () {
    clearInterval(timer)
    timer = null
    this.setData({
      actionButton: app.globalData[this.getLanguage()].start
    })
  },
  onUnload: function () {
    clearInterval(timer)
    timer = null
    this.setData({
      actionButton: app.globalData[this.getLanguage()].start
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.setViewData()
  }
})
