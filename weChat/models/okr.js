import request from './request'
import api from './api'

export default {
  okrShowIndex: function(data){
    return request.get(api.okrShowIndex,data)
  },
  insert:function(data){
    return request.post(api.okrShowIndex,data)
  },
  editShow:function(id){
    return request.get(api.okr(id))
  },
  edit:function(id,data){
    return request.put(api.okr(id),data)
  }
}