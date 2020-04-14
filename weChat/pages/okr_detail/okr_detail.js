import okrModel from '../../models/okr'
import krModel from '../../models/keyresult'
import oModel from '../../models/objective'

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
    })
  },
  handEdit:function(event){
    let status = event.currentTarget.dataset.finished
    let index = event.currentTarget.dataset.index
    let id = event.currentTarget.dataset.id
    
    let that = this
    wx.showActionSheet({
      itemList:['标记已完成'],
      success(res){
        console.log(res)
        switch(res.tapIndex){
          case 0:
            that.handEditKr(id,index,status)
            break;
        }
      },
      fail(res){
        console.log(res)
      }
    })
  },
  handEditKr:function(id,index,status){
    let okrDetail = this.data.okrDetail
    let stateChange = status ? 0 :1
    krModel.update(id,{state:stateChange}).then(res => {
      okrDetail[index].state = stateChange
      this.setData({okrDetail:okrDetail})
    })
  },
  handEditKrObjective:function(event){
    let id = event.currentTarget.dataset.id
    let state = event.currentTarget.dataset.state
    let objective = this.data.objective
    oModel.update(id,{state:state ? 0 : 1}).then(res => {
      this.setData({objective:objective})
    })
  }
})
