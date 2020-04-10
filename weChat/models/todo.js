import request from './request'
import api from './api'

export default {
  todoShow: function(data){
    return request.get(api.todo,data)
  },
  insert: function(data){
    return request.post(api.todo,data)
  },
  update: function(id,data){
    return request.put(api.todoIndex(id),data)
  },
  delete: function(id){
    return request.delete(api.todoIndex(id))
  }
}