import request from './request'
import api from './api'

export default {
  delete:function(id){
    return request.delete(api.okrItem(id))
  },
  update:function(id,data){
    return request.post(api.okrItem(id),data)
  }
}