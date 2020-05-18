// pages/search/index.js
Page({

  data: {
    goods:[],
    isFocus:false,
    inputValue:""
  },
  timeId:-1,

  handleInput(e){
    const {value} = e.detail;
    if(!value.trim()){
      this.setData({
        goods:[],
        isFocus:false
      })
      return
    }
    this.setData({
      isFocus:true
    })
    clearTimeout(this.timeId);
    this.timeId = setTimeout(() => {
      this.getSearch(value)
    }, 1000);
  },

  getSearch(query){
    var reqTask = wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch',
      data: {query},
      success: (result)=>{
        console.log(result);
        this.setData({
          goods:result.data.message
        })
      }
    });
  },

  handleCancel(){
    this.setData({
      goods:[],
      isFocus:false,
      inputValue:""
    })
  }

})