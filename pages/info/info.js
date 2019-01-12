// pages/info/info.js
const datas = require('../../datas/list-data.js')
const newArray = datas.list_data
let appData = getApp()
console.log(appData)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoData:{},
    isCollection:false,
    isPlayMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const index = options.key
   
    this.setData({
      infoData: newArray[index],
      index
    })
    //读取是否收藏的状态数据,如果为true将初始化数据状态改变为true
    let oldisCollection = wx.getStorageSync('isCollection');
    console.log(oldisCollection[index])
    if (oldisCollection[index]){
        this.setData({
          isCollection:true
        })
    }
    //初始化读取那个页面背景音乐是否播放
   
    if (appData.data.indexPage === index && appData.data.isPlay){
      this.setData({
        isPlayMusic: true
      })
   }
  //监视背景音乐是否播放
    wx.onBackgroundAudioPlay(()=>{
      this.setData({
        isPlayMusic:true
      })
      //修改app实例的数据
      appData.data.indexPage = index
      appData.data.isPlay = true

    })
//监视背景音乐是否暂停
    wx.onBackgroundAudioPause(()=>{
      this.setData({
        isPlayMusic: false
      })
      //修改app实例的数据
     
      appData.data.isPlay = false
    })
  },
  //控制音乐是否播放
  handleIsPlayMusic(){
    const isPlayMusic = !this.data.isPlayMusic
    this.setData({
      isPlayMusic
    })
    
    const { dataUrl, title, coverImgUrl } = this.data.infoData.music
    if (isPlayMusic) {
      //播放
      wx.playBackgroundAudio({
        dataUrl,
        title,
        coverImgUrl
      })
    } else {
      //暂停
      wx.pauseBackgroundAudio({})
    }
    
  },
  handleShare(){
    wx.showActionSheet({
      itemList:['转发到朋友圈','分享到QQ空间','转发到微博']
    })
  },
  collection(){

    let isCollection = !this.data.isCollection
    this.setData({
      isCollection: isCollection
    })
    const title = isCollection ? '成功收藏' : '取消收藏'
   
    wx.showToast({
      title,
      icon:'success',
      duration:1000
    })
    
 let index = this.data.index
 //let obj = {}
    let obj = wx.getStorageSync('isCollection');
    if(!obj){
      obj = {}
    }
    obj[index] = isCollection
    wx.setStorage({
      key:'isCollection',
      data: obj
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