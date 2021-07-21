<template>
<v-app>
  <v-main style="max-height: 100vh;">
    <transition name="custom" mode="out-in">
      <router-view />
    </transition>
    <warning-dialog />
  </v-main>
</v-app>
</template>

<script>
import warningDialog from '@/components/warning'
import { mapMutations, mapGetters, mapActions } from "vuex"
export default {
  name: 'App',
  mounted() {
    const primaryColor = localStorage.getItem('primaryColor')
    if (primaryColor) this.$vuetify.theme.currentTheme.primary = primaryColor

    this.initialize()

    const leadInDelay = localStorage.getItem('leadInDelay')
    const spaceDelay = localStorage.getItem('spaceDelay')

    if (leadInDelay) this.setLeadInDelay(leadInDelay)
    if (spaceDelay) this.setSpaceDelay(spaceDelay)

    window.setInterval(() => {
      if (this.heatingStatus || this.speedStatus) this.syncADC({heating: this.heatingStatus, speed: this.speedStatus})
    }, 500)
  },
  methods: {
    ...mapMutations([
      'setLeadInDelay',
      'setSpaceDelay'
    ]),
    ...mapActions([
      'initialize',
      'syncADC',
    ])
  },
  computed: {
    ...mapGetters({
      speedStatus: 'speedStatus',
      heatingStatus: 'heatingStatus'
    })

  },
  components: {
    warningDialog
  }
};
</script>

<style>
* {
  cursor: 'none' !important;
}

::-webkit-scrollbar {
  width: 0px;
}

.custom-enter-active {
  transition: all .25s;
  transition-delay: .25s;
}

.custom-leave-active {
  transition: all .25s;
}

.custom-enter {
  opacity: 0;
}

.custom-leave-to
{
  transform: translateY(100%);
}
</style>
