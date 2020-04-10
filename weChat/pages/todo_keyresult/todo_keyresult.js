import todoOkrModel from '../../models/todoKeyresult'

Page({
  data:{
    okr:''
  },
  onLoad:function(options){
    let id = options.id
    todoOkrModel.show(id).then(res => {
      console.log(res)
    })
  }
})
