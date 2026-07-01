Page({
  data: {
    currentTab: 'all',
    orders: [],
    filteredOrders: []
  },

  onShow() {
    this.loadOrders()
  },

  // 加载订单数据
  loadOrders() {
    // 从本地存储读取订单，如果没有则用模拟数据
    let orders = wx.getStorageSync('orders') || []
    
    // 如果没有订单，生成模拟数据
    if (orders.length === 0) {
      orders = this.generateMockOrders()
      wx.setStorageSync('orders', orders)
    }
    
    this.setData({ orders })
    this.filterOrders()
  },

  // 生成模拟订单数据
  generateMockOrders() {
    const now = Date.now()
    return [
      {
        id: 1,
        productName: '兰亭序 · 实木框',
        emoji: '📜',
        spec: '实木框 · 60x120cm',
        totalPrice: '368.00',
        quantity: 1,
        status: 'pending',
        statusText: '待接单',
        createTime: this.formatTime(now - 3600000 * 2)
      },
      {
        id: 2,
        productName: '山水画 · 现代框',
        emoji: '🏔️',
        spec: '金属框 · 80x150cm',
        totalPrice: '520.00',
        quantity: 1,
        status: 'making',
        statusText: '制作中',
        createTime: this.formatTime(now - 3600000 * 24)
      },
      {
        id: 3,
        productName: '梅花图 · 古典框',
        emoji: '🌸',
        spec: '实木框 · 50x90cm',
        totalPrice: '288.00',
        quantity: 1,
        status: 'done',
        statusText: '已完成',
        createTime: this.formatTime(now - 3600000 * 48)
      }
    ]
  },

  // 格式化时间
  formatTime(timestamp) {
    const date = new Date(timestamp)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${month}-${day} ${hours}:${minutes}`
  },

  // 切换Tab
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ currentTab: tab })
    this.filterOrders()
  },

  // 筛选订单
  filterOrders() {
    const { currentTab, orders } = this.data
    let filtered = orders
    if (currentTab !== 'all') {
      filtered = orders.filter(item => item.status === currentTab)
    }
    this.setData({ filteredOrders: filtered })
  },

  // 取消订单
  cancelOrder(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定要取消此订单吗？',
      success: (res) => {
        if (res.confirm) {
          let orders = this.data.orders
          orders = orders.filter(item => item.id !== id)
          wx.setStorageSync('orders', orders)
          this.setData({ orders })
          this.filterOrders()
          wx.showToast({ title: '已取消', icon: 'success' })
        }
      }
    })
  },

  // 再来一单
  reOrder(e) {
    const id = e.currentTarget.dataset.id
    const order = this.data.orders.find(item => item.id === id)
    if (order) {
      wx.showToast({ 
        title: `已加入订单：${order.productName}`,
        icon: 'none'
      })
    }
  },

  // 去首页逛逛
  goToIndex() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})