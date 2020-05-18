// pages/goods_list/index.js
Page({

  
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsList:[]
  },

  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },

  totalPages:1,

  handleTabsItemChange(e){
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },

  getGoodList(){
    wx.showLoading({
      title: '加载中',
    })
    var reqTask = wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
      success: (result)=>{
        const {total} = result.data.message;
        this.totalPages = Math.ceil({total}/this.QueryParams.pagesize)
        this.setData({
          goodsList:[...this.data.goodsList,...result.data.message.goods]
        })
        wx.stopPullDownRefresh()
      }
    });
    wx.hideLoading()
  },

  onLoad: function (options) {
    this.QueryParams.cid = options.cid||"";
    this.QueryParams.query = options.query||"";
    this.getGoodList();
  },

  onReachBottom(){
    if(this.QueryParams.pagenum>=this.totalPages){
      wx.showToast({title: '没有下一页数据'});
    }else{
      this.QueryParams.pagenum++;
      this.getGoodList();
    }
  },

  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum = 1;
    this.getGoodList()
  }

})