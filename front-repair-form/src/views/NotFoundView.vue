<template>
  <div class="flex flex-col items-center justify-center gap-8 text-center">
    <div>
      <h1 class="text-4xl font-bold">404</h1>
      <p class="text-xl">Page not found</p>
    </div>
    <CoreButton label="Go back home" type="ghost" @trigger="goToHome" />
  </div>
</template>
<script setup lang="ts">
import CoreButton from '@components/core/CoreButton.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
function goToHome() {
  router.push({ name: 'home' })
}
</script>
<style scoped></style>
