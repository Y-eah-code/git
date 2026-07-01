Page({
  data: {
    caseList: [
      {
        name: '兰亭序 · 实木框',
        emoji: '📜',
        bg: '#E8DDD0',
        desc: '经典实木画框，适合书法作品',
        tags: ['实木', '书法', '古典']
      },
      {
        name: '梅花图 · 古典框',
        emoji: '🌸',
        bg: '#F5E8E0',
        desc: '仿古风格，衬托花鸟画的雅致',
        tags: ['花鸟', '仿古', '雅致']
      },
      {
        name: '山水画 · 现代框',
        emoji: '🏔️',
        bg: '#DCE5E0',
        desc: '简约现代框，适合山水意境',
        tags: ['简约', '现代', '山水']
      },
      {
        name: '书法 · 金属框',
        emoji: '✍️',
        bg: '#E8E0D8',
        desc: '金属质感，现代与传统结合',
        tags: ['金属', '现代', '书法']
      },
      {
        name: '花鸟图 · 圆角框',
        emoji: '🌺',
        bg: '#F0E8E0',
        desc: '圆润边框，柔和优雅',
        tags: ['圆角', '花鸟', '优雅']
      },
      {
        name: '篆刻 · 窄边框',
        emoji: '🔲',
        bg: '#E0D8D0',
        desc: '窄边设计，突出作品本身',
        tags: ['窄边', '极简', '篆刻']
      }
    ]
  },

  // 跳转详情（暂时弹窗提示）
  goToDetail(e) {
    const index = e.currentTarget.dataset.index
    const item = this.data.caseList[index]
    wx.showToast({
      title: `${item.name}`,
      icon: 'none'
    })
    // 后续可跳转详情页：
    // wx.navigateTo({
    //   url: `/pages/cases/detail/detail?id=${index}`
    // })
  }
})