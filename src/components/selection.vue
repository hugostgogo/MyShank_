<template>
  <v-card class="pa-5 d-flex flex-column align-stretch" style="height: 100%">
    <v-flex class="d-flex justify-space-between align-center" shrink>
      <span class="text-h5">Source selection</span>
      <fab />
    </v-flex>
    <v-flex class="d-flex no-wrap justify-center align-stretch justify-space-between pa-5" grow style="width:100%">
      <v-flex class="d-flex flex-column align-center" xs3>
        <v-card style="height:100%; width: 100%" :class="`d-flex flex-column justify-center align-center ${phono.value ? 'primary' : 'grey darken-3'}`" :elevation="phono.value ? 5 : 0" @click="setSelection(phono.pin)">
          <img src="@/assets/phono.png" style="height: 100px" />
          <span class="text-h5 mt-3">{{ phono.label }}</span>
        </v-card>
      </v-flex>

      <v-flex class="d-flex flex-column align-center" xs3>
        <v-card style="height:100%; width: 100%" :class="`d-flex flex-column justify-center align-center ${feedBack.value ? 'primary' : 'grey darken-3'}`" :elevation="feedBack.value ? 5 : 0" @click="setSelection(feedBack.pin)">
          <img src="@/assets/feed_back.png" style="height: 100px" />
          <span class="text-h5 mt-3">{{ feedBack.label }}</span>
        </v-card>
      </v-flex>

      <v-flex class="d-flex flex-column align-center" xs3>
        <v-card style="height:100%; width: 100%" :class="`d-flex flex-column justify-center align-center ${lineIn.value ? 'primary' : 'grey darken-3'}`" :elevation="lineIn.value ? 5 : 0" @click="setSelection(lineIn.pin)">
          <img src="@/assets/line_in.png" style="height: 100px" />
          <span class="text-h5 mt-3">{{ lineIn.label }}</span>
        </v-card>
      </v-flex>
    </v-flex>
    <v-flex class="d-flex" v-if=" heatingStatus || speedStatus">
      <v-flex class="d-flex flex-column justify-center align-center" v-if="heatingStatus">
        <h5>STYLUS HEATING</h5>
        <h3>{{ heatingLabel }} A</h3>
      </v-flex>
      <v-flex class="d-flex flex-column justify-center align-center" v-if="speedStatus">
        <h5>MOTOR SPEED</h5>
        <h3>{{ speedLabel }} %</h3>
      </v-flex>
    </v-flex>
  </v-card>
</template>
<script>
import fab from '../components/fab'
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'phono',
      'feedBack',
      'lineIn',
      'heatingLabel',
      'speedLabel',
      'speedStatus',
      'heatingStatus'
    ]),
  },
  methods: {
    ...mapMutations([
      'setSelection'
    ]),
  },
  components: {
    fab
  }
}
</script>
