Page({

  data: {
    goodsObj: {},
    isCollect: false
  },
  GoodsInfo: {},

  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const { goods_id } = options;
    this.getGoodsDetail(goods_id);
  },

  getGoodsDetail(goods_id) {
    var reqTask = wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',
      success: (result) => {
        let collect = wx.getStorageSync("collect") || [];
        let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id);
        this.setData({
          goods_name: result.data.message,
          isCollect
        })
      }
    });
  },
  

  handlePrevewImage(e) {
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },

  handleCartAdd() {
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if (index === -1) {
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    } else {
      cart[index].num++;
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    });



  },

  handleCollect() {
    let isCollect = false;
    let collect = wx.getStorageSync("collect") || [];
    let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if (index !== -1) {
      collect.splice(index, 1);
      isCollect = false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
    } else {
      collect.push(this.GoodsInfo);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }
    wx.setStorageSync("collect", collect);
    this.setData({
      isCollect
    })
  }
})