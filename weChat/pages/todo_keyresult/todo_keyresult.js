import todoOkrModel from '../../models/todoKeyresult'

Page({
  data:{
    okr:[],
    id:null
  },
  onLoad:function(options){
    let id = options.id
    todoOkrModel.show(id).then(res => {
      this.setData({
        okr:res.data.data,
        id:id
      })
      console.log(this.data.okr)
    })
  },
  handleChange:function(event){
    let todo_id = this.data.id
    console.log(event)
  }
})
