<template>
<v-card class="mt-2 pa-3 px-5 d-flex align-center" style="flex-grow: 1">
    <v-flex>
      <v-flex class="d-flex justify-space-between align-center">
        <span class="text-h5">Motor speed <span v-if="speedStatus">: {{ speed }} %</span></span>
        <v-switch :input-value="speedStatus" @change="setSpeed"></v-switch>
      </v-flex>
      <v-fade-transition>
        <v-progress-linear v-if="speedStatus" top :value="speed" height="50" readonly></v-progress-linear>
      </v-fade-transition>
    </v-flex>
</v-card>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'speed',
        'speedStatus',
      ])
    },
    methods: {
      ...mapMutations([
        'setSpeed'
      ]),
    }
  }
</script>
