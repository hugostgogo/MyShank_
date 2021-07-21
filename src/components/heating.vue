<template>
  <v-card class="mb-2 pa-3 px-5 d-flex align-center" style="flex-grow: 1">
    <v-flex>
      <v-flex class="d-flex justify-space-between align-center">
        <span class="text-h5">Stylus heating<span v-if="heatingStatus"> : {{ heatingLabel }} A</span></span>
        <v-switch :input-value="heatingStatus" @change="toggle"></v-switch>
      </v-flex>
      <v-fade-transition>
        <v-progress-linear reverse readonly v-if="heatingStatus" :value="heating" color="rgba(0,0,0, 0.7)" style="background: linear-gradient(0.25turn, #00ff00, #ffa500,#ff0000)" height="50"></v-progress-linear>
      </v-fade-transition>
    </v-flex>
    <v-dialog v-model="dialog" width="700">
      <v-card>
        <v-toolbar color="primary" dark>
        </v-toolbar>
        <v-flex class="d-flex flex-column align-center justify-center">
          <v-flex shrink class="py-3">
            <span class="text-h5">Heating  wire connected ?</span>
          </v-flex>
          <v-flex class="d-flex align-center justify-space-aroud py-3">
            <v-btn color="error" @click="confirmDialog(false)" class="mr-2">NO</v-btn>
            <v-btn color="success" @click="confirmDialog(true)" class="ml-2">YES</v-btn>
          </v-flex>
        </v-flex>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data: () => ({
    dialog: false
  }),
  methods: {
    ...mapMutations([
      'setHeating'
    ]),
    confirmDialog (i) {
      this.dialog = false
      this.setHeating(i)
    },
    toggle (val) {
      if (val) {
        this.dialog = true
      }
      else this.confirmDialog(val)
    }
  },
  computed: {
    ...mapGetters([
      'heating',
      'heatingLabel',
      'heatingStatus'
    ])
  },

}
</script>
