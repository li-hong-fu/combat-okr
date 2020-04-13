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
  }
})
