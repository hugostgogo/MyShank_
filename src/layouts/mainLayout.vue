<template>
  <v-layout column fill-height>
    <v-flex shrink>
      <v-tabs fixed-tabs>
        <v-tab :to="{ name: 'selection' }">Source selection</v-tab>
        <v-tab :to="{ name: 'sensors' }">Sensors</v-tab>
        <v-tab :to="{ name: 'functions' }">Functions</v-tab>
        <v-tab :to="{ name: 'settings' }">Settings</v-tab>
      </v-tabs>
    </v-flex>
    <v-flex grow>
      <transition name="custom" mode="out-in">
        <router-view class="pa-5" style="height: 100%"/>
      </transition>
    </v-flex>
  </v-layout>
</template>
<script>
export default {

}
</script>

<style>
.custom-enter-active {
  transition: all .25s;
}

.custom-leave-active {
  transition: all .25s;
}

.custom-enter,
.custom-leave-to
{
  opacity: 0;
}
</style>
