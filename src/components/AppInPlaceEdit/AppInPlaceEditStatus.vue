<script setup lang="ts">
const value = defineModel<'in_progress' | 'completed'>()
const { readonly = false } = defineProps<{ readonly?: boolean }>()

const emit = defineEmits(['commit'])

const toggleValue = () => {
  if (readonly) return
  if (value.value === 'completed') {
    value.value = 'in_progress'
  } else {
    value.value = 'completed'
  }
  emit('commit')
}
</script>

<template>
  <div class="text-2xl cursor-pointer pt-2" @click="toggleValue">
    <Transition name="scale" mode="out-in">
      <iconify-icon
        v-if="value === 'completed'"
        icon="lucide:circle-check"
        class="text-green-500"
      />
      <iconify-icon v-else icon="lucide:circle-dot" class="text-yellow-500" />
    </Transition>
  </div>
</template>
