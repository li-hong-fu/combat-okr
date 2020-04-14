import request from './request'
import api from './api'

export default {
  delete:function(id){
    return request.delete(api.keyresult(id))
  },
  update:function(id,data){
    return request.put(api.keyresult(id),data)
  }
}