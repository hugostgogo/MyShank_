<template>
    <v-flex class="d-flex flex-column">
      <heating />
      <motor />
    </v-flex>
</template>

<script>
import heating from '../components/heating'
import motor from '../components/motor'
export default {
  components: {
    heating,
    motor
  }
}
</script>
