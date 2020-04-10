import todoModel from '../../models/todo'

Page({
  data: {
    showData:[]
  },
  onShow:function(){
    this.onLoad()
  },
  onLoad:function(){
    todoModel.todoShow({state:1}).then(res => {
      this.setData({
        showData:res.data.data
      })
    })
  },
  showActionSheet:function(event){
    let id = event.currentTarget.dataset.id
    let index = event.currentTarget.dataset.index
    let that = this
    wx.showActionSheet({
      itemList:['未完成','删除'],
      success(res){
        if(res.tapIndex === 0){
          that.todoUpdate(id,index)
        }else if(res.tapIndex === 1){
          that.todoDelete(id,index)
        }
      },
      fail(res){
        console.log(res)
      }
    })
  },
  todoUpdate:function(id,index){
    todoModel.update(id,{state:0}).then(res => {
      let todos = this.data.showData
      todos.splice(index,1)
      this.setData({
        showData:todos
      })
    })
  },
  todoDelete:function(id,index){
    todoModel.delete(id).then(res => {
      let todos = this.data.showData
      todos.splice(index,1)
      this.setData({showData:todos})
    })
  }
})
