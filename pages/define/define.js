// pages/define/define.js
const app = getApp()

var lang

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
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
      saveButton: app.globalData[this.getLanguage()].save
    })
  },

  bindFormSubmit: function (e) {
    var menu = e.detail.value.menu
    wx.setStorageSync('menu', menu)
    wx.navigateBack({
      delta: 2
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        lang = res.language
        that.setViewData()
      }
    })
    var menu = wx.getStorageSync('menu')
    this.setData({
      menu: menu
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})