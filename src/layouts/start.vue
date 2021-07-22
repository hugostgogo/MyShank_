<template>
  <div class="d-flex flex-column align-center justify-center white" style="height: 100vh;">
    <img src="@/assets/logo.jpg" style="max-width: 100vw; max-height: 70vh;"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  created() {
    setTimeout(() => {
      this.$router.push('selection')
    }, 1500)
  },
}
</script>

<style>
.fadeIn-enter-active {
  transition: all 5s ease;
}

.fadeIn-enter {
  opacity: 0;
}
</style>
