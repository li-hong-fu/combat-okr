const config = require('../config')
const APPID = config.miniapp.appid;
const SECRET = config.miniapp.secret
const axios = require('axios')

const LOGINAPI = function(APPID,SECRET,JSCODE){
  return `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${JSCODE}&grant_type=authorization_code`
}

class Weixin {
  code2Session(code){
    return axios.get(LOGINAPI(APPID,SECRET,code))
  }
}

module.exports = new Weixin()