Page({
  data: {
    currentTab: 'all',  // all | pending | making | done
    orders: [],
    filteredOrders: []
  },

  onShow() {
    this.loadOrders()
  },

  // 加载订单
  loadOrders() {
    let orders = wx.getStorageSync('orders') || []
    // 按时间倒序（最新的在前面）
    orders.sort((a, b) => {
      // 如果有 createTime 就按时间排序，否则按添加顺序
      if (a.createTime && b.createTime) {
        return new Date(b.createTime) - new Date(a.createTime)
      }
      return 0
    })
    this.setData({ orders })
    this.filterOrders('all')
  },

  // 切换Tab
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.filterOrders(tab)
  },

  // 筛选订单
  filterOrders(tab) {
    const { orders } = this.data
    let filtered = []
    
    if (tab === 'all') {
      filtered = orders
    } else if (tab === 'pending') {
      filtered = orders.filter(item => item.status === 'pending')
    } else if (tab === 'making') {
      filtered = orders.filter(item => item.status === 'confirmed' || item.status === 'making')
    } else if (tab === 'done') {
      filtered = orders.filter(item => item.status === 'done')
    }

    this.setData({
      currentTab: tab,
      filteredOrders: filtered
    })
  },

  // 点击订单进入详情
  goToDetail(e) {
    const index = e.currentTarget.dataset.index
    const order = this.data.filteredOrders[index]
    // 暂时用 toast 展示
    wx.showModal({
      title: '订单详情',
      content: `订单号：${order.orderNo}\n状态：${this.getStatusText(order.status)}\n总价：¥${order.totalPrice}`,
      confirmText: '知道了'
    })
  },

  // 获取状态文字
  getStatusText(status) {
    const map = {
      'pending': '待确认',
      'confirmed': '已确认',
      'making': '制作中',
      'done': '已完成',
      'cancelled': '已取消'
    }
    return map[status] || status
  }
})