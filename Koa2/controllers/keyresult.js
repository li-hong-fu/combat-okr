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
  }
}

module.exports = keyresultController