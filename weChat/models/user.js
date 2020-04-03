import request from './request'
import api from './api'
export default {
  login:function(data) {
    console.log(123)
    return request.post(api.login, data)
  }
}