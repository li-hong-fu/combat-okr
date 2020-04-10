import okrModel from '../../models/okr'
import objectiveModel from '../../models/objective'

Page({
  data:{
    Objective:[]
  },
  onShow:function(){
    okrModel.okrShowIndex().then(res => {
      this.setData({
        Objective:res.data.data
      })
    })
  },
  handCreate:function(){
    wx.navigateTo({
      url:'/pages/okr_create/okr_create'
    })
  },
  okrActionSheet:function(event){
    let id = event.currentTarget.dataset.id
    let index = event.currentTarget.dataset.index
    let status = event.currentTarget.dataset.state
    let that = this
    wx.showActionSheet({
      itemList:['查看','编辑','已完成','删除'],
      success(res){
        switch(res.tapIndex){
          case 0:
            wx.navigateTo({ url:'/pages/okr_detail/okr_detail?id='+id })
            break;
          case 1:
            wx.navigateTo({ url:'/pages/okr_edit/okr_edit?id='+id })
            break;
          case 2:
            that.okrState(id,index,status)
            break;
          case 3:
            wx.showModal({
              content:'确定要删除吗',
              success (res){
                if(res.confirm){
                  that.okrDelete(id,index)
                }
              }
            })
            break;
        }
      },
      fail(res){
        console.log(res)
      }
    })
  },
  okrState(id,index,status){
    objectiveModel.update(id,{state:status ? 0 : 1}).then(res => {
      let objectives = this.data.Objective
      objectives[index].state = status
      this.setData({Objective:objectives})
      this.onShow()
    })
  },
  okrDelete:function(id,index){
    objectiveModel.delete(id).then(res => {
      let objectives = this.data.Objective
      objectives.splice(index,1)
      this.setDate({Objective:objectives})
    })
  }
})
