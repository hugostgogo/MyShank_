<template>
  <div class="d-flex flex-column align-center justify-center" style="height: 100%;">
    <img src="@/assets/logo.jpg" style="height: 100vh;"/>
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
    }, 5000)
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
