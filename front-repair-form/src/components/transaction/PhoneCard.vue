<template>
  <div
    class="phone-card flex grid-rows-3 flex-col gap-[0.625rem] rounded-[0.625rem] bg-primaryLight p-6"
  >
    <h2 class="py-[0.625rem] text-center text-lg font-semibold text-primary">
      Besoin d’une assistance téléphonique&nbsp;?
    </h2>
    <CoreButton
      label="Afficher le numéro"
      type="fill"
      @trigger="showPhone = true"
      class="mx-auto"
      v-if="!showPhone"
    />
    <a href="tel:0123456789" v-else class="mx-auto text-base text-secondary underline">
      <span> 01.23.45.67.89 </span>
    </a>
  </div>
</template>
<script setup lang="ts">
import CoreButton from '@components/core/CoreButton.vue'
import { ref } from 'vue'
const showPhone = ref(false)
</script>
<style scoped>
.phone-card {
  box-shadow: 4px 7px 18px 7px #0000000d;
}
</style>
