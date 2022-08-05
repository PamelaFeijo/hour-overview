import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const getEmployeeDefaultState = () => {
  return {
    name: 'John Doe',
    title: 'Developer',
    totalWeekHours: 0,
    hoursWorked: 0
  }
}

export default new Vuex.Store({
  state: {
    allEmployees: [],
    employee:  getEmployeeDefaultState()
  },
  getters: {
    allEmployees(state) {
      return state.allEmployees;
    },
  },
  mutations: {
    SET_EMPLOYEES(state, employees) {
      state.allEmployees = employees;
    },
    RESET_FORM(state) {
      Object.assign(state.employee, getEmployeeDefaultState());
    },
    SET_SELECTED_EMPLOYEE(state, employee) {
      console.log(employee, 'employee')
      Vue.set(state, "employee", employee);
    },
  },
  actions: {
    async getAllEmployees({ commit }){
      try {
        const response = await axios.get(`http://localhost:5000/api/hour`);
        commit("SET_EMPLOYEES", response.data)
      } catch(error){
        console.error(error)
      }
    },
    async addEmployee({ commit }, employee: { name: string, title: string, totalWeekHours: number, hoursWorked: number }){
      console.log( employee, "show state" )
      try {
        const response = await axios.post(`http://localhost:5000/api/hour`, employee);
        //commit("SET_COUNTRIES", response.data)
        console.log( response.data)
      } catch(error){
        console.error(error)
      }
    }
  },
  modules: {
  }
})


