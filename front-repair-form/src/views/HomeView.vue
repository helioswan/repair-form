<template>
  <section class="bg-secondary">
    <div class="container mx-auto my-12 flex flex-col items-center gap-8 px-4 sm:my-32">
      <h1 class="text-center text-4xl font-bold leading-tight text-white sm:text-[3.375rem]">
        Mon problème concerne&nbsp;:
      </h1>
      <img alt="" src="@/assets/img/form/decoration-white.svg" width="80" height="17" />
      <div role="group" class="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <LocationButton
          v-for="(location, index) in locations"
          :key="index"
          :location-name="location.locationName"
          :display-name="location.displayName"
        />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import LocationButton from '@components/form/LocationButton.vue'
const locations = [
  { displayName: 'Plomberie', locationName: 'plomberie' },
  { displayName: 'Electricité', locationName: 'electricite' },
  { displayName: 'Chauffage', locationName: 'chauffage' },
  { displayName: 'Serrurerie', locationName: 'serrurerie' },
  { displayName: 'Vitrerie', locationName: 'vitrerie' },
  { displayName: 'Electroménager', locationName: 'electromenager' }
]
</script>
