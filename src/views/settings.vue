<template>
  <v-flex>
    <v-card class="pa-5 d-flex flex-column" style="height: 100%">

      <span class="text-h5">Settings</span>

      <v-divider class="my-3" color="white"/>
      <v-flex class="pa-3 d-flex align-center" grow>
        <v-flex grow>
          <v-color-picker hide-inputs @update:color="changeColor(colors.primary)" dot-size="50" swatches-max-height="200" @change="setColor(colors.primary)" v-model="colors.primary"></v-color-picker>
        </v-flex>
        <v-divider vertical class="mx-10" color="white"/>
        <delays />
      </v-flex>
    </v-card>
  </v-flex>
</template>
<script>
import delays from '@/components/settings/delays'
import { mapActions } from 'vuex'
  export default {
    data: () => ({
      colors: {
        primary: '#000000'
      }
    }),
    created () {
      this.colors.primary = this.$vuetify.theme.currentTheme.primary
    },
    methods: {
      changeColor () {
        this.setColor(this.colors.primary)
        this.$vuetify.theme.currentTheme.primary = this.colors.primary
      },
      ...mapActions({
        setColor: 'setColor'
      })
    },
    components: {
      delays,
    }
  }
</script>
