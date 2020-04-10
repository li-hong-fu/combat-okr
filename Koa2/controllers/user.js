const Weinxin = require('./../models/weixin')
const authCode = require('./../utils/authCode')
const User = require('./../models/user')

const userController = {
  userLogin: async (ctx,next) => {
    // try{
      let code = ctx.request.body.code
      let created_time = new Date()

      if(!code){
        ctx.body = { code:0, message:'缺少code参数' }
        return
      }
      const weixinRequest = await Weinxin.code2Session(code)
      let open_id = weixinRequest.data.openid

      const users = await User.select({ open_id })
      let user = users[0]
      let user_id
      if(!user){
        let id = await User.insert({open_id,created_time})
        user_id = id[0]
      }else{
        user_id = user.id
      }
      
      let auth_code = open_id + '\t' + created_time + '\t' + user_id
      let token = authCode(auth_code,'ENCODE')
      // ctx.body = { code:200, message:user_id,token:token }
      ctx.state.code = 200
      ctx.state.data = {id:user_id,token:token}
    // }catch(e){
      // ctx.body = { code:0, message:e }
    // }
  }
}

module.exports = userController
