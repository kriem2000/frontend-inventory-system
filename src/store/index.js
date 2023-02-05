import { createStore } from "vuex";
import axiosConfig from "../includes/axiosConfig";

export default createStore({
  state: {
    user: null,
    authenticated: false,
    token: localStorage.getItem("IS-token") || null,
    allRoles: [],
    allUnits: [],
    config: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("IS-token")}`,
      },
    },
  },
  mutations: {
    setAuthenticated(state, data) {
      state.user = data.user;
      state.authenticated = true;
      state.allRoles = data.roles;
      if (data.token != null) {
        localStorage.setItem("IS-token", data.token);
        state.token = localStorage.getItem("IS-token");
      }
    },
    setUnAuthenticated(state) {
      state.user = null;
      state.authenticated = false;
      localStorage.removeItem("IS-token");
      state.token = null;
      state.allRoles = [];
    },
    setUnits(state, units) {
      state.allUnits = units;
    },
  },
  actions: {
    async signInAction({ state, commit, dispatch }, val) {
      let response;
      await axiosConfig
        .post("login", val)
        .then((res) => {
          let token = res.data.info.token;
          let user = res.data.info.user;
          let roles = res.data.info.roles;
          state.config.headers.Authorization = "Bearer " + token;
          let data = {
            user: user,
            token: token,
            roles: roles,
          };
          dispatch("fetchAllUnits");
          commit("setAuthenticated", data);
          response = res;
        })
        .catch(() => {});
      return response;
    },
    signOutAction({ commit }) {
      commit("setUnAuthenticated");
    },
    async restoreSession({ state, commit, dispatch }) {
      await axiosConfig
        .get("restoreSession", state.config)
        .then((res) => {
          let user = res.data.info.user;
          let roles = res.data.info.roles;
          dispatch("fetchAllUnits");
          let data = {
            user: user,
            token: null,
            roles: roles,
          };
          commit("setAuthenticated", data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    async fetchAllUnits({ state, commit }) {
      await axiosConfig.get("units", state.config).then((res) => {
        commit("setUnits", res.data.info);
      });
    },
  },
  getters: {
    allRoles(state) {
      return state.allRoles;
    },
    allUnits(state) {
      return state.allUnits;
    },
    config(state) {
      return state.config;
    },
    user(state) {
      return state.user;
    },
  },
  modules: {},
});
