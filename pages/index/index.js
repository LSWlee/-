// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },

  handleStudy(){
    wx.switchTab({
      url: '/pages/lists/lists'
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success:(data) =>{
        this.setData({
          userInfo: data.userInfo
        })
      },
      fail:() => {
        this.setData({
          userInfo:'授权失败'
        }) 
      }
    })
  },
  handleGetUserInfo(data){
    if(data.detail.userInfo){
      this.setData({
        userInfo: data.detail.userInfo
      })
    }else{
      this.setData({
        userInfo: '授权失败'
      })
    }
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