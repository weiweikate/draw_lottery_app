let { Tool, RequestFactory, Event } = global

Page({

  /**
   * 页面的初始数据
   */
  data: {
    line:true,
    content:'', // 所在区域拼接结果
    navbar:['新增地址','修改地址'],
    addressType:1, // 1新建地址 2修改地址
    region:[],// 省市区的数组 
    isChoose:false, // 是否选择为默认地址
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: this.data.navbar[options.type]
    })
    this.setData({
      addressType: options.type
    })
  },
  pickerClicked(e) {
    let region = e.detail.result
    this.setData({ 
      content: region[0].name + region[1].name + region[2].name,
      region: region
    })
    if (e.detail.btnType == 2) {
      // this.updateDealerRegion(e)
    }
  },
  formSubmit(e){
    let params = e.detail.value
    if (this.data.region[0]) {
      params.provinceCode = this.data.region[0].zipcode;
    }
    if (this.data.region[1]) {
      params.cityCode = this.data.region[1].zipcode;
    }
    if (this.data.region[2]) {
      params.areaCode = this.data.region[2].zipcode;
    }
    if (!Tool.checkName(params.receiver)) {
      Tool.showAlert("收货人姓名长度需在2-16位之间");
      return
    }
    if (!Tool.checkPhone(params.recevicePhone)) {
      Tool.showAlert("请输入正确的电话号码");
      return
    }
    if (this.data.region.length == 0) {
      Tool.showAlert("请选择你所在的省市区");
      return
    }
    if (Tool.isEmptyStr(params.address)) {
      Tool.showAlert("请输入详细地址");
      return
    }
    this.requestAddUserAddress(params)
  },
  requestAddUserAddress(params) {
    // let r = RequestFactory.addUserAddress(params);
    r.finishBlock = (req) => {
      //跳转到地址列表页面
      this.successCallBack("添加成功")
    };
    Tool.showErrMsg(r)
    r.addToQueue();
  },
  deleteItem(){
    let params = {

    }
    let callBack = ()=>{
      // let r = RequestFactory.addUserAddress(params);
      // r.finishBlock = (req) => {
      //   //跳转到地址列表页面
      //   this.successCallBack("删除成功")
      // };
      // Tool.showErrMsg(r)
      // r.addToQueue();
    }
    Tool.showComfirm('确认要删除该地址吗', callBack)
  },
  chooseClicked(){
    this.setData({
      isChoose: !this.data.isChoose
    })
  }
})