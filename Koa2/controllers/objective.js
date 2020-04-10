const Objective = require('./../models/objective')
const Keyresult = require('./../models/keyresult')

const objectiveController = {
  delete:async function(ctx,next){
    try{
      let id = ctx.params.id
      await Objective.delete(id)
      await Keyresult.select({objective_id:id}).del()

      ctx.body = {code:200,message:'删除成功!'}
    }catch(e){
      ctx.body = {code:0,message:'发生错误!'}
    }
  },
  update:async function(ctx,next){
    try{
      let id = ctx.params.id
      let state = ctx.request.body.state
      let finished_time = new Date()
      await Objective.update(id,{state,finished_time})
      await Keyresult.select({objective_id:id}).update({state,finished_time})
      ctx.body = {code:200,message:'成功!'}
    }catch(e){
      ctx.body = {code:0,message:'错误'}
    }
  }
}

module.exports = objectiveController