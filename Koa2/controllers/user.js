const Weinxin = require('./../models/weixin')
const authCode = require('./../utils/authCode')
const User = require('./../models/user')

const userController = {
  userLogin: async (ctx,next) => {
    
    try{
      let code = ctx.request.body.code
      let created_time = new Date()

      if(!code){
        ctx.body = { code:0, message:'缺少code参数' }
        return
      }
      let weixinRequest = await Weinxin.code2Session(code)
      let open_id = weixinRequest.data.openid
      
      let users = await User.insert({open_id,created_time})
      let auth_code = open_id + '\t' + created_time + '\t' + users[0]
      let token = authCode(auth_code,'ENCODE')
      ctx.body = { code:200, message:users,token:token }
    }catch(e){
      ctx.body = { code:0, message:e }
    }
  }
}

module.exports = userController
