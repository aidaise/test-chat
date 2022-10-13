import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages: []
  },
  mutations: {
    ADD_MSG(state, payload) {
      console.log('PAY', payload)
      state.messages = payload
    },
  },
  actions: {
    GET_MSG({commit}) {
      axios.get('http://localhost:3000/messages')
          .then((el) => {
            commit('ADD_MSG', el?.data)
          })
    }
  }
})