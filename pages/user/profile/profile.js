Page({
  data: {
    allCount: 0,
    pendingCount: 0,
    makingCount: 0,
    doneCount: 0,
    userInfo: {
      nickName: '',
      avatarUrl: '',
      phone: ''
    }
  },

  onShow() {
    this.loadUserInfo()
    this.loadOrderStats()
  },

  // 加载用户信息
  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo') || {}
    this.setData({ userInfo })
  },

  // 获取用户信息（通过 button 的 open-type 触发）
  getUserInfo(e) {
    if (e.detail.userInfo) {
      const userInfo = e.detail.userInfo
      wx.setStorageSync('userInfo', {
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl,
        phone: this.data.userInfo.phone || ''
      })
      this.setData({
        userInfo: {
          ...this.data.userInfo,
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl
        }
      })
      wx.showToast({ title: '授权成功', icon: 'success' })
    } else {
      wx.showToast({ title: '已取消授权', icon: 'none' })
    }
  },

  // 获取手机号（点击手机号触发）
  getPhoneNumber(e) {
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      // 演示数据，真实环境需后端解密
      const phone = '138****' + String(Math.floor(1000 + Math.random() * 9000))
      const userInfo = { ...this.data.userInfo, phone: phone }
      wx.setStorageSync('userInfo', userInfo)
      this.setData({ userInfo })
      wx.showToast({ title: '手机号授权成功', icon: 'success' })
    } else {
      wx.showToast({ title: '已取消授权', icon: 'none' })
    }
  },

  // 加载订单统计
  loadOrderStats() {
    const orders = wx.getStorageSync('orders') || []
    const allCount = orders.length
    const pendingCount = orders.filter(item => item.status === 'pending').length
    const makingCount = orders.filter(item => item.status === 'confirmed' || item.status === 'making').length
    const doneCount = orders.filter(item => item.status === 'done').length
    this.setData({ allCount, pendingCount, makingCount, doneCount })
  },

  // 跳转订单列表
  goToOrders() {
    wx.switchTab({
      url: '/pages/order/list/list'
    })
  },

  // 作品库
  goToWorks() {
    wx.showToast({ title: '作品库开发中', icon: 'none' })
  },

  // 门店信息
  goToStore() {
    wx.showModal({
      title: '门店信息',
      content: '地址：山西省临汾市尧都区鼓楼北王麻子巷福强画院点睛阁\n营业时间：9:00-18:00\n电话：189-0357-8088',
      showCancel: false,
      confirmText: '知道了'
    })
  },

  // 联系店家
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: '18903578088'
    })
  }
})