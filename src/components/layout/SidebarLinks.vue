<script setup lang="ts">
interface LinkProp {
  to?: string
  icon: string
  title: string
}

defineProps<{
  links: LinkProp[]
}>()

const emit = defineEmits<{
  (e: 'logout', title: string): void
}>()

const logout = (link: LinkProp) => {
  emit('logout', link.title)
}

const { menuOpen } = useMenu()
</script>

<template>
  <template v-for="link in links">
    <RouterLink
      v-if="link.to"
      :to="link.to"
      :key="link.title"
      class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary text-muted-foreground"
      active-class="bg-primary/10 text-primary"
      :class="{ 'justify-center': !menuOpen, 'justify-normal': menuOpen }"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="text-nowrap" :class="{ block: menuOpen, hidden: !menuOpen }">
        {{ link.title }}
      </span>
    </RouterLink>
    <a
      v-else
      class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary text-muted-foreground cursor-pointer"
      @click="logout(link)"
      :class="{ 'justify-center': !menuOpen, 'justify-normal': menuOpen }"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="text-nowrap" :class="{ block: menuOpen, hidden: !menuOpen }">
        {{ link.title }}
      </span>
    </a>
  </template>
</template>

<style scoped></style>
