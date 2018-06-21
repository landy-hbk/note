import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


const createStore = () => {
  return new Vuex.Store({
    state: {
      userName: 'landy'
    },
    
  })
}

export default createStore