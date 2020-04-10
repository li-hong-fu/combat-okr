const Todo = require('./../models/todo')
const { formatTime } = require('./../utils/date')

const todoController = {
  todoShow: async (ctx, next) => {
    let state = ctx.request.query.state
    try{
      const todos = await Todo.select({state})
      todos.forEach(data => {
        if(data.created_time){
          data.created_time = formatTime(data.created_time)
        }
        if(data.finished_time){
          data.finished_time = formatTime(data.finished_time)
        }
      })
      ctx.body = { code:200,data: todos }
    }catch(e){
      ctx.body = { code:0,message:"失败" }
    }
  },
  insert: async (ctx, next) => {
    try{
      let title = ctx.request.body.title
      let user_id = ctx.header.id
      let created_time = new Date()

      if(!title || !user_id){
        ctx.body = {code:0,message:'缺少必要参数!'}
        return
      }

      const todos = await Todo.insert({title,user_id,created_time})
      let id = todos[0]
      ctx.body = {code:200,id:id}
    }catch(e){
      ctx.body = { code:0,message:"添加失败" }
    }
  },
  update: async (ctx, next) => {
    try{
      let id = ctx.params.id
      let params = ctx.request.body
      params.finished_time = params.state ? new Date() : null
      const todos = await Todo.update(id,params)
      ctx.body = { code:200,message:'完成!' }
    }catch(e){
      ctx.body = { code:0,message:"错误" }
    }
  },
  delete: async (ctx, next) => {
    try{
      let id = ctx.params.id
      const todos = await Todo.delete(id)
      ctx.body = { code:200,message:'删除成功!' }
    }catch(e){
      ctx.body = { code:0,message:'错误'}
    }
  }
}

module.exports = todoController