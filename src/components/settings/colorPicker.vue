<template>
    <v-dialog>
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-on="on" v-bind="attrs" fab color="primary" x-large>
              <v-icon>mdi-palette</v-icon>
            </v-btn>
        </template>
        <v-card>
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