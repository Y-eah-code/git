Page({
  data: {
    caseList: [
      { name: '兰亭序 · 实木框', emoji: '📜', bg: '#E8DDD0' },
      { name: '梅花图 · 古典框', emoji: '🌸', bg: '#F5E8E0' },
      { name: '山水画 · 现代框', emoji: '🏔️', bg: '#DCE5E0' },
      { name: '书法 · 金属框', emoji: '✍️', bg: '#E8E0D8' }
    ]
  },

  callPhone() {
    wx.makePhoneCall({
      phoneNumber: '18903578088'
    })
  },

  goToPreview() {
    wx.switchTab({
      url: '/pages/preview/preview'
    })
  },

  // 👇 自取
  goToPickup() {
    wx.switchTab({
      url: '/pages/preview/preview?mode=pickup'
    })
  },

  // 👇 外送：填地址 → 跳转 preview
  goToDelivery() {
    wx.showModal({
      title: '填写收货地址',
      editable: true,
      placeholderText: '请输入详细地址（如：临汾市尧都区xx路xx号）',
      confirmText: '确认地址',
      success: (res) => {
        if (res.confirm && res.content) {
          const address = encodeURIComponent(res.content);
          wx.switchTab({
            url: `/pages/preview/preview?mode=delivery&address=${address}`
          })
        } else if (res.confirm && !res.content) {
          wx.showToast({
            title: '地址不能为空',
            icon: 'none'
          })
        }
      }
    })
  },
  // 跳转更多案例
  goToMore() {
    wx.navigateTo({
      url: '/pages/cases/cases'
    })
  }
})