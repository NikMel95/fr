import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { API_URL } from './config'

const ApiService = {
  init () {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_URL
  },

  get(resource) {
    return Vue.axios.get(`${resource}`)
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params)
  },

  delete(resource) {
    return Vue.axios.delete(`${resource}`)
  }
}

export default ApiService 