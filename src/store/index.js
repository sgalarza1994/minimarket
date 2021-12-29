import Vue from 'vue'
import Vuex from 'vuex'
import themeConfig from './modules/themeConfig'
import sistemaConfig from './modules/Auth/sistema';
import usuarioAuth from './modules/Auth/index';
import maestros from './maestro/index';
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

// const vuexLocal = new VuexPersistence({
//   storage: window.sessionStorage
// })


export default function (){
  const Store = new Vuex.Store({
    modules: {
      themeConfig,
      sistemaConfig,
      usuarioAuth,
      maestros,
    },
    plugins:[createPersistedState()],
    strict:false
  })
  return Store;
}
