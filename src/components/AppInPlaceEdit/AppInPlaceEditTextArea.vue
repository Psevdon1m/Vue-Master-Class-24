<script setup lang="ts">
const value = defineModel<string>()

const emit = defineEmits(['commit'])
</script>

<template>
  <textarea
    class="w-full rounded-md border-none bg-transparent p-1 focus:outline-none focus:border-none focus:bg-gray-800 focus:rounded-md"
    v-model="value"
    @blur="$emit('commit')"
  />
</template>
