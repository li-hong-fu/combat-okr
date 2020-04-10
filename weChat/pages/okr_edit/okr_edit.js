import okrModel from '../../models/okr'
import keyresultModel from '../../models/keyresult'

Page({
  data:{
    objectives:'',
    keyresults:[],
    id:null
  },
  onLoad:function(options){
    let id = options.id
    okrModel.editShow(id).then(res => {
      let objective = res.data.data
      this.setData({
        objectives:objective[0].title,
        keyresults:objective[0].keyresult,
        id:id
      })
    })
  },
  handAddKeyresult:function(){
    let keyresult = this.data.keyresults
    keyresult.push({title:''})
    this.setData({ keyresults:keyresult })
  },
  handDeleteKeyresult:function(event){
    let index = event.currentTarget.dataset.index
    let id = event.currentTarget.id
    keyresultModel.delete(id).then(res => {
      let keyresult = this.data.keyresults
      keyresult.splice(index,1)
      this.setData({keyresults:keyresult})
    })
    
  },
  handObjective:function(event){
    let value = event.detail.value
    this.setData({objectives:value})
  },
  handKeyresult:function(event){
    let index = event.currentTarget.dataset.index
    let value = event.detail.value
    let keyresult = this.data.keyresults
    keyresult[index].title = value
    this.setData({
      keyresults:keyresult
    })
  },
  handEdit:function(){
    let objective = this.data.objectives
    let keyresult = this.data.keyresults
    let keyresults = []
    keyresult.forEach(data => {
      keyresults.push(data)
    })
    
    if(!objective || !keyresults.length){
      wx.showToast({
        title: '目标和成果为必填项目',
        icon: 'none',
        mask: true,
        duration: 2000
      })
      return
    }
    
    let tmp = keyresults.every(data => data.title)
    if(!tmp){
      wx.showToast({
        title: '成果为必填项目',
        icon: 'none',
        mask: true,
        duration: 2000
      })
      return
    }

    let id = this.data.id
    let params = { objective,keyresults }
    okrModel.edit(id,{params}).then(res => {
      wx.showToast({
        title: '编辑成功',
        icon: 'success',
        mask: true,
        duration: 2000
      })
      wx.switchTab({
        url:'/pages/okr/okr'
      })
    })
  }
})
