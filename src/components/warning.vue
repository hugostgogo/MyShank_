<template>
  <v-dialog :value="dialog" persistent width="800">
    <v-card>
      <v-toolbar elevation="0" color="error">
        <v-toolbar-title>Error</v-toolbar-title>
      </v-toolbar>
      <v-flex class="pa-5">
        <v-flex class="d-flex flex-column align-center pb-5">
          <v-flex class="d-flex justify-center align-center pb-3">
            <v-icon size="120" class="mr-n3" color="error">mdi-thermometer-alert</v-icon>
          </v-flex>
          <v-flex class="text-center d-flex flex-column">
            <span>Heating wire broken</span>
            <span class="grey--text text-caption">Heating disabled</span>
          </v-flex>
        </v-flex>
        <v-flex class="d-flex align-center justify-space-around">
          <v-btn color="error" @click="dialog = false">OK</v-btn>
        </v-flex>
      </v-flex>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({
      setErrorDialog: 'errorDialog'
    })
  },
  computed: {
    ...mapGetters({
      errorDialog: 'errorDialog'
    }),
    dialog: {
      get () {
        return this.errorDialog
      },
      set (val) {
        this.setErrorDialog(val)
      }
    }
  },

}
</script>
