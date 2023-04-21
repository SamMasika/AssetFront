import axios from "axios";

export default {
  namespaced: true,
  state: {
    sections: [],
    isLoading: false,
  },
  
getters:{
    getSection(state){
        return state.sections
    },
    getLoading(state){
        return state.isLoading
    }
},

  mutations: {
    setSection(state, sections) {
      state.sections = sections;
    },
    setLoading(state, isLoading) {
        state.isLoading = isLoading;
      },
  },
  actions: {
    fetchData({ commit }) {
        commit('setLoading', true);
        axios.get('/section-list')
          .then(response => {
            commit('setSection', response.data.data);
            setTimeout(() => {
                commit('setLoading', false);
             }, 700);
           
          })
          .catch(error => {
            commit( error);
           
          });
      }
  }
  
};
