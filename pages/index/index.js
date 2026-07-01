Page({
  data: {
    caseList: [
      { name: '兰亭序 · 实木框', emoji: '📜', bg: '#E8DDD0' },
      { name: '梅花图 · 古典框', emoji: '🌸', bg: '#F5E8E0' },
      { name: '山水画 · 现代框', emoji: '🏔️', bg: '#DCE5E0' },
      { name: '书法 · 金属框', emoji: '✍️', bg: '#E8E0D8' }
    ]
  },

  // 打电话
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: '18903578088'
    })
  },

  // 跳转预览页
  goToPreview() {
    wx.navigateTo({
      url: '/pages/preview/preview'
    })
  },

  // 跳转订单列表
  goToOrders() {
  wx.switchTab({
    url: '/pages/order/list/list'
  })
},

  // 跳转作品库
  goToWorks() {
    wx.showToast({
      title: '作品库开发中',
      icon: 'none'
    })
  }
})