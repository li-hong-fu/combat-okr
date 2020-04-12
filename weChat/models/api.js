const PREFIX  = 'http://localhost:3000/api';
export default {
  login: `${PREFIX}/login`,
  todo: `${PREFIX}/todo`,
  todoIndex:(id) => `${PREFIX}/todo/${id}`,
  okr: `${PREFIX}/okr`,
  okrItem:(id) => `${PREFIX}/okr/${id}`,
  keyresult:(id) => `${PREFIX}/okr/keyresult/${id}`,
  todoOkr:(id) => `${PREFIX}/okr/todo/${id}/keyresult`,
  okrItemShow:(id) => `${PREFIX}/okr/item/${id}`
}