import request from './request'
import api from './api'

export default {
  show:function(id,data){
    return request.get(api.todoOkr(id),data)
  },
  insert:function(id,data){
    return request.post(api.todoOkr(id),data)
  },
  delete:function(id,data){
    return request.put(api.todoOkr(id),data)
  }
}