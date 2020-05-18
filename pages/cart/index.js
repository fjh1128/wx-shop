Page({

  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },

  onShow(){
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart")||[];
    this.setData({address});
    this.setCart(cart)
  },

  setCart(cart) {
    const allChecked = cart.length?cart.every(v=>v.checked):false;    
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice += v.num * v.goods_price;
        totalNum += v.num
      }
    });
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("cart", cart);
  },

  handleChooseAddress() {
    wx.getSetting({
      success: (result)=>{
        const scopeAddress = result.authSetting["scope.address"];
        if(scopeAddress===true||scopeAddress===undefined){
          wx.chooseAddress({
            success: (result1)=>{
              wx.setStorageSync("address", result1);
            }
          });
        }else{
          wx.openSetting({
            success: (result2)=>{
              wx.chooseAddress({
                success: (result3)=>{
                  wx.setStorageSync("address", result3);
                }
              });
            }
          });
        }
      }
    });
  },

  handleItemChange(e){
    const goods_id = e.currentTarget.dataset.id;
    let {cart} = this.data;
    let index = cart.findIndex(v=>v.goods_id===goods_id);
    cart[index].checked = !cart[index].checked;
    this.setCart(cart)
  },

  handleItemAllCheck(){
    let {cart,allChecked} = this.data;
    allChecked = !allChecked;
    cart.forEach(v=>v.checked=allChecked);
    this.setCart(cart)
  },

  handleItemNumEdit(e){
    const {operation,id} = e.currentTarget.dataset;
    let {cart} = this.data;
    const index = cart.findIndex(v=>v.goods_id===id);
    if(cart[index].num===1&&operation===-1){
      wx.showModal({
        title: '提示',
        content: '您是否要删除该商品',
        success :res=>{
          if (res.confirm) {
            cart.splice(index,1);
            this.setCart(cart)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      
    }else{
      cart[index].num += operation;
      this.setCart(cart)
    }
  },

  handlePay(){
    const {address,totalNum} = this.data;
    if(!address.userName){
      wx.showToast({
        title: '您还没有选择收货地址',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if(totalNum===0){
      wx.showToast({
        title: '您还没有选购商品',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.navigateTo({
      url: '../pay/index'     
    });
  },

  onLoad: function (options) {

  }

})