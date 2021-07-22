<template>
  <v-flex>
    <v-card class="pa-5 d-flex flex-column" style="height: 100%">

      <span class="text-h5">Settings</span>

      <v-divider class="my-3" color="white"/>

      <v-flex class="pa-3 d-flex align-center justify-space-around" grow>
        
        <color-picker />
        <v-divider vertical class="mx-10" color="white"/>
        <delays />
      </v-flex>

    </v-card>
  </v-flex>
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
