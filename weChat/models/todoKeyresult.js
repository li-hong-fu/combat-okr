import request from './request'
import api from './api'

export default {
  show:function(id,data){
    return request.get(api.todoOkr(id),data)
  }
}