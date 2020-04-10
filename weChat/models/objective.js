import request from './request'
import api from './api'

export default {
  delete:function(id){
    return request.delete(api.okr(id))
  },
  update:function(id,data){
    return request.post(api.okr(id),data)
  }
}