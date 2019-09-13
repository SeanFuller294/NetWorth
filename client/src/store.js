import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'
import AuthService from './AuthService'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let _api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    posts: [],
    comments: [],
    post: {},
    userSearchResults: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    resetState(state, user) {
      state.user = {}
    },

    setPosts(state, posts) {
      state.posts = posts
    },
    setUserSearchResults(state, users) {
      state.userSearchResults = users
    },
    setActivePost(state, post) {
      state.post = post
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds)
        commit('setUser', user)
        router.push({ name: "home" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async login({ commit, dispatch }, creds) {
      debugger
      try {
        let user = await AuthService.Login(creds)
        commit('setUser', user)
        router.push({ name: "home" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout()
        if (!success) { }
        commit('resetState')
        router.push({ name: "login" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    //#endregion

    //#region -- USERS --
    async getUser({ commit, dispatch }) {
      try {
        let res = await _api.get('users/:userId')
        commit('setUser', res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async findUsersByEmail({ commit, dispatch }, query) {
      try {
        //NOTE the query for this method will be the user name
        let res = await _api.get('users/find?email=' + query)
        commit('setUserSearchResults', res.data)
      } catch (error) {
        //TODO handle this catch
        console.error(error)
      }

    },
    //#endregion

    //#region -- POSTS --
    async getPosts({ commit, dispatch }) {
      try {
        let res = await _api.get('posts')
        commit('setPosts', res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async getPostById({ commit, dispatch }, payload) {
      try {
        let res = await _api.get(`posts/${payload.postId}`)
        commit('setActivePost', res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async deletePost({ dispatch }, payload) {
      try {
        let res = await _api.delete('posts/' + payload)
        dispatch('getPosts')
        router.push({ name: 'home' })
      } catch (error) {
        console.error(error)
      }
    },
    async addPost({ dispatch }, payload) {
      try {
        let res = await _api.post('posts', payload)
        dispatch('getPosts')
      } catch (error) {
        console.error(error)
      }
    },
    //#endregion

    //#region -- COMMENTS --
    async getComments({ commit, dispatch }) {
      try {
        let res = await _api.get('posts/:postId/comments')
        commit('setComments', res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteComment({ dispatch }, payload) {
      try {
        let res = await _api.delete('posts/:postId/' + payload)
        dispatch('getComments')
        router.push({ name: 'home' })
      } catch (error) {
        console.error(error)
      }
    },
    async addComment({ dispatch }, payload) {
      try {
        let res = await _api.post('posts/:postId/comments', payload)
        dispatch('getComments')
      } catch (error) {
        console.error(error)
      }
    }


    //#endregion
  }
})
