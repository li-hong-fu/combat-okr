import request from './request'
import api from './api'
export default {
  login:function(code='', data, header={}) {
    return request.post(api.login, code)
  }
}