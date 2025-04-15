<script setup lang="ts">
interface LinkProp {
  to?: string
  icon: string
  title: string
}

defineProps<{
  links: LinkProp[]
}>()

const logout = () => {
  console.log('logout')
}
</script>

<template>
  <template v-for="link in links">
    <RouterLink
      v-if="link.to"
      :to="link.to"
      :key="link.title"
      class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground"
      active-class="bg-primary/10 text-primary"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </RouterLink>
    <a
      v-else
      class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground cursor-pointer"
      @click="logout"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </a>
  </template>
</template>

<style scoped></style>
