// pages/live/live.js
Page({

  data: {
    num:0
  },
  handleInput(e){
    console.log(e.detail.value)
    this.setData({
      num:e.detail.value
    })
  },
  handletap(e){
    //获取自定义属性operation
    const operation = e.currentTarget.dataset.operation;
    this.setData({
      num: (this.data.num+operation) * 1
    })
  }
});