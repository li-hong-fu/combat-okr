const Objective = require('./../models/objective')
const Keyresult = require('./../models/keyresult')
const TodoKeyresult = require('./../models/todoKeyresult')

const todoOkrController = {
  show:async function(ctx,next){
    try{
      let id = ctx.params.id
      let user_id = ctx.request.header.id
      let params = { user_id, state:0 }

      const objective = await Objective.select(params)
      let objectiveIds = objective.map(data => data.id)
      
      const keyresult = await Keyresult.all().whereIn("objective_id",objectiveIds)

      const todoKeyresults = await TodoKeyresult.select({todo_id:id})
      let keyresultIds = todoKeyresults.map(data => data.keyresult_id)

      let okr = []
      objective.forEach(data => {
        data.keyresults = []
        okr[data.id] = data
      })
      keyresult.forEach(data => {
        data.active = keyresultIds.includes(data.id)
        okr[data.objective_id].keyresults.push(data)
      })
      
      okr = Object.values(okr)
      ctx.body = {code:200,data:okr}
    }catch(e){
      ctx.body = {code:0,message:'错误'}
    }
  },
  insert:async function(ctx,next){
    try{
      let todo_id = ctx.request.body.todo_id
      let keyresult_id = ctx.request.body.keyresult_id
      await TodoKeyresult.insert({todo_id,keyresult_id})
      ctx.body = {code:200,message:'添加成功'}
    }catch(e){
      console.log(
        ctx.body = {code:0,message:'错误'}
      )
    }
  },
  delete:async function(ctx,next){
    try{
      let todo_id = ctx.request.body.todo_id
      let keyresult_id = ctx.request.body.keyresult_id
      await TodoKeyresult.select({todo_id,keyresult_id}).del()
      ctx.body = {code:200,message:'删除成功'}
    }catch(e){
      console.log(
        ctx.body = {code:0,message:'错误'}
      )
    }
  },
}

module.exports = todoOkrController