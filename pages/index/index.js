//Page Object
Page({
  data: {
    swiperList: [],
    cateList: [],
    floorList: []
  },
  
  getSwiperList(){
    var reqTask = wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: (result)=>{
        this.setData({
          swiperList:result.data.message
        })
      }
    });
  },
  
  getCateList(){
    var reqTask = wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
      success: (result)=>{
        this.setData({
          cateList:result.data.message
        })
      }
    });
  },

  getFloorList(){
    var reqTask = wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
      success: (result)=>{
        this.setData({
          floorList:result.data.message
        })
      }
    });
  },

  onLoad: function(options){
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  }
});