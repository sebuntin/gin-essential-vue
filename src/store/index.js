import Vue from 'vue';
import Vuex from 'vuex';
import user from './module/user';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    // 这里放全局参数
  },
  mutations: {
    // 这里是set方法
  },
  getters: {// 这里是get方法
  },
  actions: {
  },
  modules: {
    user,
  },
});
