import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    commands: {
      phono: {
        label: 'Phono',
        pin: 16,
        value: true
      },
      feedBack: {
        label: 'Feed back',
        pin: 22,
        value: false
      },
      lineIn: {
        label: 'Line In',
        pin: 18,
        value: false
      },
    },
    displays: {
      heating: {
        value: 250,
      },
      speed: {
        value: 128,
      }
    },
    status: {
      heating: false,
      speed: false
    },
    space: {
      delay: 450
    },
    leadIn: {
      delay: 5400
    },
    errorDialog: false
  },
  getters: {
    phono: state => {
      return state.commands.phono
    },
    feedBack: state => {
      return state.commands.feedBack
    },
    lineIn: state => {
      return state.commands.lineIn
    },
    heating: state => {
      return parseInt(100 - state.displays.heating.value)
    },
    heatingLabel: state => {
      var value = (state.displays.heating.value / 100).toString()
      return value.slice(0, 4)
    },
    speed: state => {
      return state.displays.speed.value
    },
    speedLabel: state => {
     return state.displays.speed.value
    },
    speedStatus: state => {
      return state.status.speed
    },
    heatingStatus: state => {
      return state.status.heating
    },
    leadInDelay: state => {
      return state.leadIn.delay
    },
    spaceDelay: state => {
      return state.space.delay
    },
    errorDialog: state => state.errorDialog,
  },
  mutations: {
    setSelection(state, pin) {
      window.ipcRenderer.invoke('setSource', pin).then(result => {
         console.log(result);
         state.commands.phono.value = result.phono ? true : false
         state.commands.feedBack.value = result.feedBack ? true : false
         state.commands.lineIn.value = result.lineIn ? true : false
      })
    },

    syncHeating(state, value) {
      state.displays.heating.value = value
    },

    syncSpeed(state, value) {
      state.displays.speed.value = value
    },

    setSpeed(state, payload) {
      console.log(window)
      state.status.speed = payload
      if (!payload) window.ipcRenderer.invoke('stopSpeed', payload)
    },

    setHeating(state, payload) {
      state.status.heating = payload
      window.ipcRenderer.send('setHeating', payload)
    },

    setLeadInDelay(state, delay) {
      state.leadIn.delay = delay
    },
    setSpaceDelay(state, delay) {
      state.space.delay = delay
    },
    errorDialog (state, value = true) {
      state.errorDialog = value
    }
  },
  actions: {
    leadIn: (store) => {
      const state = store.getters.speedStatus
      store.commit('setSpeed', false)
      window.ipcRenderer.send('leadIn', store.state.leadIn.delay)
      setTimeout(() => {
        store.commit('setSpeed', state)
      }, store.state.leadIn.delay)
    },
    space: (store) => {
      const state = store.getters.speedStatus
      store.commit('setSpeed', false)
      window.ipcRenderer.send('space', store.state.space.delay)
      setTimeout(() => {
        store.commit('setSpeed', state)
      }, store.state.space.delay)
    },
    setLeadIn: (store, delay) => {
      localStorage.setItem('leadInDelay', delay)
      store.commit('setLeadInDelay', delay)
    },
    setSpace: (store, delay) => {
      localStorage.setItem('spaceDelay', delay)
      store.commit('setSpaceDelay', delay)
    },
    setColor: (store, color) => {
      localStorage.setItem('primaryColor', color)
    },
    initialize: (store) => {
      console.log("INIT")
      store.commit('setSpeed', false)
      store.commit('setHeating', false)
    },

    errorDialog: (store, value = true) => {
      store.commit('errorDialog', value)
    },

    syncADC: async (store, payload) => {
      const value = await window.ipcRenderer.invoke('getADC', payload.heating, payload.speed)
      store.commit('syncSpeed', value.speed)
      store.commit('syncHeating', value.heating)

      if (value.heating > 95) {
        store.commit('setHeating', false)
        store.commit('errorDialog', true)
      }
    },

  },
  modules: {

  }
})
