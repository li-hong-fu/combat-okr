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
    let okr = this.data.okr
    let active = event.currentTarget.dataset.active
    let index = event.currentTarget.dataset.index
    let keyresult_id = event.currentTarget.dataset.keyresult_id
    let objective_index = event.currentTarget.dataset.objective_index
    if(!active){
      todoOkrModel.insert(todo_id,{todo_id,keyresult_id}).then(res => {
        okr[objective_index].keyresults[index].active = !active
        this.setData({okr:okr})
      })
    }else{
      todoOkrModel.delete(todo_id,{todo_id,keyresult_id}).then(res => {
        okr[objective_index].keyresults[index].active = !active
        this.setData({okr:okr})
      })
    }
  }
})
