/**
 * 加载store模块
 */
import Vue from "vue";
import Vuex from "vuex";

import user from "./user";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user
  }
});
