const Keyresult = require('./../models/keyresult')

const keyresultController = {
  delete:async function(ctx,next){
    try{
      let id = ctx.params.id
      await Keyresult.delete(id)
      ctx.body = {code:200,message:'成功'}
    }catch(e){
      ctx.body = {code:0,message:'错误'}
    }
  },
  update:async function(ctx,next){
    try{
      console.log(ctx.request.body)
      let id = ctx.params.id
      let state = ctx.request.body.state
      let finished_time = state ? new Date() : null
      await Keyresult.update(id,{state,finished_time})
      ctx.body = {code:200,message:'成功'}
    }catch(e){
      ctx.body = {code:0,message:'错误'}
    }
  }
}

module.exports = keyresultController