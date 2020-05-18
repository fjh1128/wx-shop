// pages/auth/index.js
Page({

  handleGetUserInfo(e){
    const {encryptedData,rawData,iv,signature} = e.detail;
    const code = "061PNBG70vuAFC1O2QG70lpOG70PNBGI";
    const loginParams = {encryptedData,rawData,iv,signature,code};
    var reqTask = wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin',
      data: {loginParams},
      method: 'POST',
      success: (result)=>{
        console.log(result);
        
      }
    });
  }
})