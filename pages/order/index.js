// pages/order/index.js
Page({

 
  data: {
    orders:[],
    tabs:[
      {
        id:1,
        value:"全部",
        isActive:true
      },
      {
        id:2,
        value:"待付款",
        isActive:false
      },
      {
        id:3,
        value:"待收货",
        isActive:false
      },
      {
        id:4,
        value:"退款/退货",
        isActive:false
      }
    ],
  },

  getOrders(type){
    var reqTask = wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/my/orders/all',
      data: {type},
      success: (result)=>{
        // this.setData({
        //   orders:result.orders.map(v=>({...v,creat_time_cn:(new Date(v.creat_time*1000).toLocaleString())}))
        // })
        console.log(result);
      }
    });
  },

  handleTabsItemChange(e){
    const {index} = e.detail;
    this.changeTitleByIndex(index);
    this.getOrders(index+1);
  },

  changeTitleByIndex(index){
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },

  onShow(){
    const token = wx.getStorageSync("token");
    var pages =  getCurrentPages();
    let currentPage = pages[pages.length-1];
    const {type} = currentPage.options;
    this.getOrders(type);
    this.changeTitleByIndex(type-1);
  }

})