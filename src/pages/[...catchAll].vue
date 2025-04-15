<script setup lang="ts">
useErrorStore().showErrorPage({
  error: 'Page not found',
  code: 404,
})
</script>

<template>
  <div></div>
</template>

<style scoped>
/* You can remove the style block entirely if you don't need any custom CSS */
</style>
