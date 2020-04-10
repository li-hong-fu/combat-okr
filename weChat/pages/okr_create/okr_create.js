import okrModel from '../../models/okr'

Page({
  data:{
    objective:'',
    keyresult:[{
      title:''
    }]
  },
  handAddKeyresult:function(){
    let keyresult = this.data.keyresult
    keyresult.push({title:''})
    this.setData({ keyresult:keyresult })
  },
  handDeleteKeyresult:function(event){
    let index = event.currentTarget.dataset.index
    let keyresult = this.data.keyresult
    keyresult.splice(index,1)
    this.setData({keyresult:keyresult})
  },
  handObjective:function(event){
    let value = event.detail.value
    this.setData({objective:value})
  },
  handKeyresult:function(event){
    let index = event.currentTarget.dataset.index
    let value = event.detail.value
    let keyresult = this.data.keyresult
    keyresult[index].title = value
    this.setData({keyresult:keyresult})
  },
  handCreate:function(){
    let objective = this.data.objective
    let keyresult = this.data.keyresult
    let params = { objective,keyresult }
    
    if(!objective || !keyresult){
      wx.showToast({ title: '缺少必要参数!',image: '/images/error.png',duration: 2000})
      return
    }

    okrModel.insert(params).then(res => {
      wx.showToast({ title: '添加成功',icon: 'success',duration: 2000})
      wx.switchTab({url:'/pages/okr/okr'})
    })
  }
})
