<template>
    <v-dialog width="400">
        <template v-slot:activator="{ on, attrs }">
             <v-flex xs6 tag="v-card" v-on="on" v-bind="attrs" content-class="" class="mr-3 pa-3 d-flex flex-column justify-center align-center" v-ripple="{ class: 'primary--text' }">
                <v-icon size="75">mdi-palette</v-icon>
                <v-card-title>COLOR</v-card-title>
            </v-flex>
        </template>
        <v-card class="d-flex flex-column align-center justify-center pa-3">
            <v-color-picker class="align-self-center" hide-inputs @update:color="changeColor(colors.primary)" dot-size="50" swatches-max-height="200" @change="setColor(colors.primary)" v-model="colors.primary"></v-color-picker>
        </v-card>
    </v-dialog>
</template>

<script>
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
}
</script>