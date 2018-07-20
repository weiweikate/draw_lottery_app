let { Tool, RequestFactory, Storage } = global
Page({
  data: {
    datas:[
      {
        name:null,
        'icon1': "/img/duo.png", 
        "icon2":'/img/duo-active.png',
        "showImg1":'duo-dark.png',
        "showImg2": 'card-right.png',
        'number':0
      },
      {
        'name':'朵',
        'icon1': "/img/duo.png",
        "icon2": '/img/duoactive.png',
        "showImg1": 'duo-dark.png',
        "showImg2": 'duo-bg.png',
        'number': 0
      },
      {
        'name': '女',
        'icon1': "/img/nv.png",
        "icon2": '/img/nvactive.png',
        "showImg1": 'nv-dark.png',
        "showImg2": 'nv-bg.png',
        'number': 0
      },
      {
        name:'郎',
        'icon1': "/img/lang.png",
        "icon2": '/img/langactive.png',
        "showImg1": 'lang-dark.png',
        "showImg2": 'lang-bg.png',
        'number': 0
      }
    ],
    disabled: false,
    activeImg:'https://dnlcjxt.oss-cn-hangzhou.aliyuncs.com/xcx/duo-dark.png',
    imgUrl:"https://dnlcjxt.oss-cn-hangzhou.aliyuncs.com/xcx/",
    activityId:1,
    show:false,
    showBtn: false,
    showBtn2:false
  },
  onLoad: function (options) {
    this.setData({
      activityId:Storage.getActivityId() || ''
    })
    this.queryActivityWordCard()
  },
  cardClicked(e){
    let index = e.currentTarget.dataset.index
    let {datas} = this.data
    let activeImg = datas[index].number > 0 ? datas[index].showImg2 : datas[index].showImg1
    this.setData({
      activeImg: this.data.imgUrl+activeImg
    })
  },
  queryActivityWordCard() {
    let params = {
      activityId: this.data.activityId
    }
    let r = RequestFactory.queryActivityWordCard(params);
    r.finishBlock = (req) => {
      let list = req.responseObject.data || []
      let {datas} = this.data
      list.forEach((item)=>{
        datas.forEach((item0) => {
          if (item0.name == item.awardName){
            Object.assign(item0, item0, item)
          }
        })
      })
      let { activeImg } = this.data
      let { showBtn } = this.data
      if (datas[0].number>1) {
        activeImg = this.data.imgUrl + datas[0].showImg2
        showBtn = true
      }
      let disabled = this.getCardNum()<3? false:true
      this.setData({
        datas: datas,
        disabled: disabled,
        activeImg: activeImg,
        showBtn: showBtn
      })
    };
    Tool.showErrMsg(r)
    r.addToQueue();
  },
  getCardNum(){
    let num = 0
    let { datas } = this.data
    for (let i = 1; i < datas.length; i++) {
      if (datas[i].number > 0) {
        num++
      }
    }
    return num
  },
  configListCard(){
    let num = this.getCardNum()
    if (num < 3) return
    let params = {
      activityId: this.data.activityId
    }
    let r = RequestFactory.configListCard(params);
    r.finishBlock = (req) => {
      this.tipsImg()
      let { datas } = this.data
      if (datas[0].number == 0) {
        this.setData({
          showBtn2: true
        })
      }
      this.queryActivityWordCard()
      this.modelClicked()
    };
    Tool.showErrMsg(r)
    r.addToQueue();
  },
  modelClicked(){
    this.setData({
      show: !this.data.show
    })
  },
  chooseAddress(){
    this.setData({
      showBtn2: false
    })
    Tool.navigateTo('/pages/address/address-list/address-list?door=2')
  },
  tipsImg(){
    let animation = wx.createAnimation({
      duration: 1500,
      timingFunction: 'ease',
    })

    this.animation = animation
    this.setData({
      animationData: animation.export()
    })
    let n = 0
    let m = true
    setInterval(function () {
      n = n + 1;
      if (m) {
        this.animation.translateY(30).step()
        m = !m;
      } else {
        this.animation.translateY(0).step()
        m = !m;
      }
      this.setData({
        animationData: this.animation.export()
      })

    }.bind(this), 1000)
  }
})