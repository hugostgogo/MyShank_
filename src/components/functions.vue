<template>
<v-flex class="d-flex" style="height: 100%; width: 100%" xs12>
    <v-card @click="leadIn" class="mr-3 pa-3 d-flex flex-column justify-center align-center" style="flex-grow: 1" v-ripple="{ class: 'primary--text' }">
        <v-icon size="100">mdi-contain-start</v-icon>
        <v-card-title>LEAD IN</v-card-title>
    </v-card>


    <v-card @click="space" class="pa-3 d-flex flex-column justify-center align-center" style="flex-grow: 1" v-ripple="{ class: 'primary--text' }">
      <v-icon size="100">mdi-keyboard-space</v-icon>
      <v-card-title>SPACE</v-card-title>
    </v-card>
</v-flex>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions([
      'space',
      'leadIn'
    ])
  },
}
</script>
