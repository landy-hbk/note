import Vuex from 'vuex' 
import Vue from 'vue'

 Vue.use(Vuex)

const moduleA ={
	namespaced: true,
	state: {
		name: '小明',
		age: 18
	},
	getters: {
		getNewName: state => {
			return () =>  state.name + '同学' 
		}
	},
	mutations: {
		changeName(state, back) {
			state.name = '小红';
			back ? back : '';
		}
		
	},
	actions: {
		asyncChangeName(context) {
			setTimeout(() => {
				context.commit('changeName')
			}, 1000)
		}
	}
};


const store = new Vuex.Store({
	modules: {
		moduleA,
	}
})

export default store