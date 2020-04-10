import todoModel from './../../models/todo'

Page({
  data:{
    showData: [],
    value: ''
  },
  onShow:function(){
    this.onLoad()
  },
  onLoad:function(){
    todoModel.todoShow({state:0}).then(res => {
      this.setData({showData:res.data.data})
    }).catch(e => {
      console.log(e)
    })
  },
  todoAdd:function(event){
    let title = this.data.value = event.detail.value
    todoModel.insert({ title }).then(res => {
      if(res.data.code === 200){
        this.setData({
          value:''
        })
        wx.showToast({ title: '添加成功',icon: 'success',duration: 2000})
        this.onLoad()
      }
    })
  },
  showActionSheet:function(event){
    let id = event.currentTarget.dataset.id
    let that = this;
    let index = event.currentTarget.dataset.index
    wx.showActionSheet({
      itemList:['关联','完成','删除'],
      success(res){
        // if(res.tapIndex === 1){
        //   that.todoUpdate(id,index)
        // }else if(res.tapIndex === 2){
        //   that.todoDelete(id,index)
        // }
        switch(res.tapIndex){
          case 0:
            wx.navigateTo({ url:'/pages/todo_keyresult/todo_keyresult?id='+id })
            break;
          case 1:
            that.todoUpdate(id,index)
            break;
          case 2:
            that.todoDelete(id,index)
            break;
        }
      },
      fail(res){
        console.log(res)
      }
    })
  },
  todoUpdate:function(id,index){
    todoModel.update(id,{state:1}).then(res => {
      let todos = this.data.showData
      todos.splice(index,1)
      this.setData({
        showData:todos
      })
    }).catch(e => {
      console.log(e)
    })
  },
  todoDelete:function(id,index){
    todoModel.delete(id).then(res => {
      let todos = this.data.showData
      todos.splice(index,1)
      this.setData({
        showData:todos
      })
    })
  }
})
