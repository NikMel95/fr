import ApiService from '../common/api.service'
import { GET_USERS, SQL_RESET, SQL_TEST, ADD_USER, SQL_DELETE, SQL_RESULT } from './actions.type'
import { SET_USERS, CLEAR_USERS, DELETE_USER, SET_RESULT } from './mutations.type'

const state = {
  users: [],
  result: []
}

const getters = {
  getUsers (state) {
    return state.users
  }, 
  getResult (state) {
    return state.result
  }
}

const actions = {
  [GET_USERS] (context) {
    return new Promise(resolve => {
      ApiService.get('/sql')
        .then(({ data }) => {
          context.commit(SET_USERS, data)
          resolve(data)
        })
        .catch(({ response }) => {
          resolve(response)
        })
    })
  },
  [SQL_RESET] (context) {
    return new Promise(resolve => {
      ApiService.get('/sql/reset')
        .then(({ data }) => {
          context.commit(CLEAR_USERS)
          resolve(data)
        })
        .catch(({ response }) => {
          resolve(response)
        })
    })
  },
  [SQL_TEST] (context) {
    return new Promise(resolve => {
      ApiService.post('/sql/test')
        .then(({ data }) => {
          context.commit(SET_USERS, data.data)
          resolve(data)
        })
        .catch(({ response }) => {
          resolve(response)
        })
    })
  },
  [ADD_USER] (context, id) {
    return new Promise(resolve => {
      ApiService.post('/sql', {group_id: id})
        .then(({ data }) => {
          context.commit(SET_USERS, data.data)
          resolve(data)
        })
        .catch(({ response }) => {
          resolve(response)
        })
    })
  },
  [SQL_DELETE] (context, id) {
    return new Promise(resolve => {
      ApiService.delete('/sql/' + id)
        .then(({ data }) => {
          context.commit(DELETE_USER, id)
          resolve(data)
        })
        .catch(({ response }) => {
          resolve(response)
        })
    })
  }
  ,
  [SQL_RESULT] (context) {
    return new Promise(resolve => {
      ApiService.get('/sql/select')
        .then(({ data }) => {
          context.commit(SET_RESULT, data)
          resolve(data)
        })
        .catch(({ response }) => {
          resolve(response)
        })
    })
  }
}

const mutations = {
  [SET_USERS] (state, data) {
    state.users = state.users.concat(data)
  },
  [CLEAR_USERS] (state, data) {
    state.users = []
  },
  [DELETE_USER] (state, data) {
    var temp = []
    for(var i = 0; i < state.users.length; i++) {
      if(state.users[i].id != data) {
        temp.push(state.users[i])
      }
    }
    state.users = temp
  },
  [SET_RESULT] (state, data) {
    state.result = data
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}