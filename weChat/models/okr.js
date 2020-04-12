import request from './request'
import api from './api'

export default {
  okrShowIndex: function(data){
    return request.get(api.okr,data)
  },
  insert:function(data){
    return request.post(api.okr,data)
  },
  editShow:function(id){
    return request.get(api.okrItem(id))
  },
  edit:function(id,data){
    return request.put(api.okrItem(id),data)
  },
  itemShow:function(id){
    return request.get(api.okrItemShow(id))
  }
}