// pages/activity-detail/activity-detail.js
//获取应用实例
let { Tool } = global
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:'0',
    imgUrl1:'https://dnlcjxt.oss-cn-hangzhou.aliyuncs.com/xcx/yw_images/activityDetail.jpg',
    imgUrl2: 'https://dnlcjxt.oss-cn-hangzhou.aliyuncs.com/xcx/yw_images/activityDetail2.jpg',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Tool.isIPhoneX(this); // 判断是否是iPhone X
  },
  changeInf(e){
    let index=e.currentTarget.dataset.index;
    this.setData({
        current:index
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