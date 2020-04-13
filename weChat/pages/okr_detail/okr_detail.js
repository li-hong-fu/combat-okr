import okrModel from '../../models/okr'

Page({
  data:{
    objective:'',
    okrDetail:''
  },
  onLoad:function(options){
    let id = options.id
    okrModel.itemShow(id).then(res => {
      let objectives = res.data.data
      let okrDetails = res.data.keyresults
      this.setData({
        objective:objectives,
        okrDetail:okrDetails
      })
      console.log(this.data.objective)
      console.log(this.data.okrDetail)
    })
  },
  handEdit:function(event){
    let state = event.currentTarget.dataset.finished
    let index = event.currentTarget.dataset.index
    let id = event.currentTarget.dataset.id
    console.log(state,index,id)
    wx.showActionSheet({
      itemList:['标记已完成'],
      success(res){
        console.log(res)
        switch(res.tapIndex){
          case 0:
            
        }
      },
      fail(res){
        console.log(res)
      }
    })
  }
})
