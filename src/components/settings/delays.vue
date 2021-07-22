<template>
  <v-dialog fullscreen v-model="dialog" transition="dialog-bottom-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-flex xs6 tag="v-card" v-on="on" v-bind="attrs" class="mr-3 pa-3 d-flex flex-column justify-center align-center" v-ripple="{ class: 'primary--text' }">
  
          <v-icon size="75">mdi-av-timer</v-icon>  
          <v-card-title>FUNCTION DELAYS</v-card-title>
      
      </v-flex>
    </template>
    <v-card>
      <v-toolbar color="primary">
        <v-flex class="d-flex align-center justify-space-between pa-5">
          <v-flex>
            <span class="text-h4">Functions delays</span>
          </v-flex>

            <v-btn icon x-large @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-flex>
      </v-toolbar>
        <v-flex column justify-space-around class="px-16 pt-10" grow>
          <v-flex grow>
            <label class="text-h6">LEAD IN delay</label>
            <v-flex class="d-flex align-center justify-space-around">
              <v-btn x-large icon color="error" @click="setLeadIn(parseInt(form.leadInDelay) - 10)">
                <v-icon x-large>mdi-minus</v-icon>
              </v-btn>
              <v-flex class="d-flex align-center justify-center pa-5">
                <v-text-field outlined hide-details suffix="ms" v-model="form.leadInDelay" @keyup.enter="setLeadIn(form.leadInDelay)">
                </v-text-field>
              </v-flex>
              <v-btn x-large icon color="success" @click="setLeadIn(parseInt(form.leadInDelay) + 10)">
                <v-icon x-large>mdi-plus</v-icon>
              </v-btn>
            </v-flex>
          </v-flex>
          <v-flex grow>
            <label class="text-h6">SPACE delay</label>
            <v-flex class="d-flex align-center justify-space-around">
                <v-btn x-large icon color="error" @click="setSpace(parseInt(form.spaceDelay) - 10)">
                  <v-icon x-large>mdi-minus</v-icon>
                </v-btn>

                <v-flex class="d-flex align-center justify-center pa-5">
                  <v-text-field outlined hide-details suffix="ms" v-model="form.spaceDelay">
                  </v-text-field>
                </v-flex>

                <v-btn x-large icon color="success" @click="setSpace(parseInt(form.spaceDelay) + 10)">
                  <v-icon x-large>mdi-plus</v-icon>
                </v-btn>
            </v-flex>
          </v-flex>
        </v-flex>

    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    dialog: false
  }),
  methods: {
    ...mapActions({
      setLeadIn: 'setLeadIn',
      setSpace: 'setSpace',
    })
  },
  computed: {
    ...mapGetters({
      leadInDelay: 'leadInDelay',
      spaceDelay: 'spaceDelay'
    }),
    form () {
      return { spaceDelay: this.spaceDelay, leadInDelay: this.leadInDelay }
    }
  }
}
</script>
