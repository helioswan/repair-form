<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <main class="flex min-h-screen flex-col">
    <RouterView name="Header"></RouterView>
    <RouterView v-slot="{ Component }" class="flex-1">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
    <RouterView name="Footer"></RouterView>
  </main>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
