import okrModel from '../../models/okr'

Page({
  data:{},
  onLoad:function(options){
    let id = options.id
    okrModel.itemShow(id).then(res => {
      console.log(res)
    })
  }
})
