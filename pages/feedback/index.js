// pages/feedback/index.js
Page({

  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      }
    ],
    chooseImgs: [],
    textVal: ""
  },

  UpLoadImgs: [],

  handleTabsItemChange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },

  handleChooseImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    });
  },

  handleRemoveImg(e) {
    const { index } = e.currentTarget.dataset;
    let { chooseImgs } = this.data;
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs
    })
  },

  hadleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
  },

  handleFormSubmit() {
    const { textVal, chooseImgs } = this.data;
    // if(!textVal.trim()){
    //   wx.showToast({
    //     title: '请输入反馈内容',
    //     icon: 'none',
    //     mask: true,
    //   });
    //   return;
    // }
    wx.showLoading({
      title: "正在上传中",
      mask: true,
    });
    if (chooseImgs.length != 0) {
      chooseImgs.forEach((v, i) => {
        //   var upTask = wx.uploadFile({
        //     url: 'http://tuchuang.org/',
        //     filePath: v,
        //     name: "file",
        //     formData: {},
        //     success: (result)=>{
        //       console.log(result);
        //       let url = JSON.parse(result.data).url;
        //       this.UpLoadImgs.push(url);
        if (i === chooseImgs.length - 1) {
          console.log("把文本和图片提交到后台");
          this.setData({
            textVal: "",
            chooseImgs: []
          })
          wx.navigateBack({
            delta: 1
          });
        }
      })
    }else {
      wx.hideLoading();
      console.log("只是提交了文本");
      wx.navigateBack({
        delta: 1
      });
    }
  }
})