<template>
<v-speed-dial
    v-model="fab"
    direction="left"
    transition="scale-transition"
  >
    <template v-slot:activator>
      <v-btn
        v-model="fab"
        color="primary"
        dark
        fab
      >
        <v-icon v-if="fab">
          mdi-close
        </v-icon>
        <v-icon v-else>
          mdi-dots-hexagon
        </v-icon>
      </v-btn>
    </template>
    <div class="d-flex flex-column align-center px-2">
      <v-btn fab dark small color="primary" @click="leadIn">
        <v-icon>mdi-contain-start</v-icon>
      </v-btn>
      <v-chip label small>Lead In</v-chip>
    </div>
    <div class="d-flex flex-column align-center px-2">
      <v-btn fab dark small color="primary" @click="space">
        <v-icon>mdi-keyboard-space</v-icon>
      </v-btn>
      <v-chip label small>Space</v-chip>
    </div>
  </v-speed-dial>
</template>
<script>
import { mapActions } from "vuex"
  export default {
    data: () => ({
      fab: false
    }),
    methods: {
      ...mapActions([
        'leadIn',
        'space'
      ])
    }
  }
</script>
