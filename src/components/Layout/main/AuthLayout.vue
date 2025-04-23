<script setup lang="ts">
const { pageData } = storeToRefs(usePageStore())
const { menuOpen } = useMenu()
const taskSheetOpen = ref(false)
</script>

<template>
  <div>
    <Sidebar @open-task-sheet="taskSheetOpen = true" />
    <AppNewTask v-model:open="taskSheetOpen" />
    <div
      class="flex flex-col transition-[margin]"
      :class="{ 'lg:ml-52': menuOpen, 'ml-24': !menuOpen }"
    >
      <TopNavbar />

      <main id="main-content" class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
        <div class="flex items-center">
          <h1 class="text-lg font-semibold md:text-2xl">{{ pageData.title }}</h1>
        </div>
        <slot />
      </main>
    </div>
  </div>
</template>
