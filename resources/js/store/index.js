import Vue from 'vue';
import Vuex from 'vuex';

import find from './find.module'
import users from './users.module'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    find,
    users
  }
});