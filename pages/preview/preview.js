Page({
  data: {
    step: 1,                      // 1:上传 2:裁剪 3:选框 4:预览
    uploadedImage: '',            // 上传的图片本地路径
    selectedFrameId: null,        // 选中的画框ID
    selectedMat: '#F5F0E6',       // 选中的卡纸颜色
    
    // 模拟画框数据（后续从数据库读取）
    frameList: [
      { id: 1, name: '古典实木深棕', color: '#6B4F3A' },
      { id: 2, name: '古典实木红棕', color: '#8B4513' },
      { id: 3, name: '现代简约黑色', color: '#2C2C2C' },
      { id: 4, name: '现代简约白色', color: '#F5F5F5' },
      { id: 5, name: '金属金色', color: '#C9A94E' },
      { id: 6, name: '金属银色', color: '#C0C0C0' }
    ],
    
    // 模拟卡纸数据
    matList: [
      { id: 1, name: '米白', color: '#F5F0E6' },
      { id: 2, name: '深灰', color: '#6B6B6B' },
      { id: 3, name: '黑色', color: '#1A1A1A' },
      { id: 4, name: '金色', color: '#D4A05A' },
      { id: 5, name: '藏蓝', color: '#2C3E6B' },
      { id: 6, name: '暗红', color: '#8B3A3A' }
    ]
  },

  // 选择图片
  chooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]
        this.setData({
          uploadedImage: tempFilePath,
          step: 2
        })
        wx.showToast({ title: '上传成功，请裁剪画心', icon: 'none' })
      }
    })
  },

  // 下一步
  nextStep() {
    const { step, uploadedImage } = this.data
    if (step === 1) {
      wx.showToast({ title: '请先上传字画', icon: 'none' })
      return
    }
    if (step === 2 && !uploadedImage) {
      wx.showToast({ title: '请先上传字画', icon: 'none' })
      return
    }
    this.setData({ step: step + 1 })
  },

  // 选择画框
  selectFrame(e) {
    const id = e.currentTarget.dataset.id
    this.setData({ selectedFrameId: id })
  },

  // 选择卡纸
  selectMat(e) {
    const color = e.currentTarget.dataset.color
    this.setData({ selectedMat: color })
  },

  // 保存效果图
  saveImage() {
    wx.showToast({ title: '保存功能开发中', icon: 'none' })
  },

  // 跳转下单页
  goToOrder() {
    if (!this.data.selectedFrameId) {
      wx.showToast({ title: '请先选择画框', icon: 'none' })
      return
    }
    wx.showToast({ title: '下单页开发中', icon: 'none' })
  }
})