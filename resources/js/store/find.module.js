import ApiService from '../common/api.service'
import { GET_FILES, GET_ROWS, GET_ROWS_REMOTE } from './actions.type'
import { SET_FILES, SET_ROWS, SET_ERROR } from './mutations.type'

const state = {
  files: [],
  rows: [],
  error: ''
}

const getters = {
  getFiles (state) {
    return state.files
  },
  getRows(state) {
    return state.rows
  },
  getError(state) {
    return state.error
  }
}

const actions = {
  [GET_FILES](context) {
    return new Promise(resolve => {
      ApiService.get('/findrows/files')
        .then(({ data }) => {
          context.commit(SET_FILES, data.data)
          resolve(data)
        })
        .catch(({ response }) => {
          resolve(response)
        })
    })
  },
  [GET_ROWS_REMOTE](context, args) {
    return new Promise(resolve => {
      ApiService.get('/findrows/remote?url=' + args.url + '&str=' + args.str + '&hash=' + args.hash)
        .then(({ data }) => {
          context.commit(SET_ROWS, data.data)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.error)
          resolve(response)
        })
    })
  },
  [GET_ROWS](context, args) {
    return new Promise(resolve => {
      ApiService.get('/findrows/file?file=' + args.file + '&str=' + args.str + '&hash=' + args.hash)
        .then(({ data }) => {
          context.commit(SET_ROWS, data.data)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.error)
          resolve(response)
        })
    })
  }
}

const mutations = {
  [SET_FILES] (state, data) {
    state.files = data
  },
  [SET_ERROR] (state, data) {
    state.error = data
  },
  [SET_ROWS] (state, data) {
    state.rows = data
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}