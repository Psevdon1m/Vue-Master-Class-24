<script setup lang="ts"></script>

<template>
  <AuthLayout>
    <RouterView v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <Component :is="Component" :key="route.name" />
        <template #fallback>
          <span class="loading loading-spinner loading-lg"></span>
        </template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
