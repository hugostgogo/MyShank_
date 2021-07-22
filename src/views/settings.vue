<template>
  <v-layout fill-height column>
      <span class="text-h5 mb-3">Settings</span>
      <v-flex class="d-flex justify-center" style="width: 100%" xs12>
        <color-picker />
        <delays />
      </v-flex>
  </v-layout>
</template>
<script>
import delays from '@/components/settings/delays'
import colorPicker from '@/components/settings/colorPicker'
export default {
  components: {
    delays,
    colorPicker
  }
}
</script>
