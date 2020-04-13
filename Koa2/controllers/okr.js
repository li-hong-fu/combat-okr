const Objective = require('./../models/objective')
const Keyresult = require('./../models/keyresult')
const Todo = require('./../models/todo')
const TodoKeyresult = require('./../models/todoKeyresult')
const { formatTime } = require('./../utils/date')

const okrController = {
  showIndex: async function(ctx,next){
    try{
      const objectives = await Objective.all()
      objectives.forEach(data => {
        if(data.created_time){
          data.created_time = formatTime(data.created_time)
        }
        if(data.finished_time){
          data.finished_time = formatTime(data.finished_time)
        }
      })
      ctx.body = { code:200,data:objectives }
    }catch(e){
      ctx.body = { code:0,message:'发生错误!' }
    }
  },
  insert: async function(ctx,next){
    try{
      let title = ctx.request.body.objective
      let keyresult = ctx.request.body.keyresult
      let user_id = ctx.request.header.id
      let created_time = new Date()
      let state = 0

      if(!title || !keyresult){
        ctx.body = {code:0,message:'缺少必要参数!'}
        return
      }

      const objectives = await Objective.insert({title,user_id,created_time,state})
      let objective_id = objectives[0]
      keyresult.forEach(async (data) => {
        let title = data.title
        await Keyresult.insert({title,objective_id,created_time,state})
      })
      ctx.body = {code:200,message:'添加成功啦!'}
    }catch(e){
      ctx.body = {code:0,message:'发生错误!'}
    }
  },
  editShow: async function(ctx,next){
    try{
      let id = ctx.params.id
      const objectives = await Objective.select({id})
      const keyresults = await Keyresult.select({objective_id:id})
      let keyresultsTmp = keyresults.map(data => data)

      objectives.forEach(data => {
        if(data.created_time){
          data.created_time = formatTime(data.created_time)
        }
        data.keyresult = []
      })
      objectives[0].keyresult = keyresultsTmp

      ctx.body = {code:200,data:objectives}
    }catch(e){
      ctx.body = {code:0,message:'发生错误!'}
    }
  },
  edit: async function(ctx,next){
    try{
      let id = ctx.params.id
      let title = ctx.request.body.params.objective
      let keyresult = ctx.request.body.params.keyresults
      let created_time = new Date()

      await Objective.update(id,{title})
      keyresult.forEach(async (data) => {
        if(data.id){
          await Keyresult.update(data.id,{title:data.title})
        }else{
          await Keyresult.insert({objective_id:id,title:data.title,state:0,created_time})
        }
      })

      ctx.body = {code:200,message:'编辑成功!'}
    }catch(e){
      ctx.body = {code:0,message:'发生错误!'}
    }
  },
  showItem: async function(ctx,next){
    try{
      let id = ctx.params.id
      const objective = await Objective.select({id})
      objective.forEach(data => {
        if(data.created_time){
          data.created_time = formatTime(data.created_time)
        }
        if(data.finished_time){
          data.finished_time = formatTime(data.finished_time)
        }
      })

      const keyresult = await Keyresult.select({objective_id:id})
      let keyresult_ids = keyresult.map(data => data.id)
      const todoKeyresult = await TodoKeyresult.all().whereIn("keyresult_id",keyresult_ids)

      let todo_id = todoKeyresult.map(data => data.todo_id)
      const todo = await Todo.all().whereIn('id',todo_id)
      console.log(todo)
      let keyresults = {}
      keyresult.forEach((data,index) => {
        data.todos =[]
        keyresults[index] = data
        todoKeyresult.forEach(data => {
          if(keyresult[index].id == data.keyresult_id){
            let todoIds = data.todo_id
            todo.forEach(data =>{
             if(todoIds == data.id){
              keyresults[index].todos.push(data)
             }
           })
          }
        })
      })
     
      ctx.body = {code:200,data:objective,keyresults}
    }catch(e){
      ctx.body = {code:0,message:'错误'}
    }
  }
}

module.exports = okrController
