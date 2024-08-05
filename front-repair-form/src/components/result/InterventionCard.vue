<template>
  <div
    class="intervention-card flex grid-rows-3 flex-col gap-6 rounded-[0.625rem] bg-primaryLight p-6"
  >
    <h1 class="py-[0.625rem] text-2xl font-semibold text-primary">
      Réparation d’une fuite de la vanne principale ou avant la vanne
    </h1>
    <ul class="flex flex-col gap-[0.625rem] py-[0.625rem] text-sm font-medium text-secondary">
      <li class="flex gap-[0.625rem]">
        <img alt="" src="@/assets/img/result/euro.svg" width="16" height="16" />
        <span>Entre 150€ et 300€ TTC</span>
      </li>
      <li class="flex items-center gap-[0.625rem]">
        <img alt="" src="@/assets/img/result/valid.svg" width="16" height="16" />
        <span>Gros matériel</span>
      </li>
      <li class="flex items-center gap-[0.625rem]">
        <img alt="" src="@/assets/img/result/valid.svg" width="16" height="16" />
        <span>Déplacement</span>
      </li>
      <li class="flex items-center gap-[0.625rem]">
        <img alt="" src="@/assets/img/result/valid.svg" width="16" height="16" />
        <span>Petites fournitures</span>
      </li>
      <li class="flex items-center gap-[0.625rem]">
        <img alt="" src="@/assets/img/result/valid.svg" width="16" height="16" />
        <span>Nettoyage du chantier</span>
      </li>
      <li class="flex items-center gap-[0.625rem]">
        <img alt="" src="@/assets/img/result/valid.svg" width="16" height="16" />
        <span>Main d’oeuvre</span>
      </li>
    </ul>
    <div>
      <CoreButton label="Demander une intervention" type="fill" @trigger="goToTransaction" />
    </div>
  </div>
</template>
<script setup lang="ts">
import CoreButton from '@components/core/CoreButton.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
function goToTransaction() {
  router.push({ name: 'transaction' })
}
</script>
<style scoped>
.intervention-card {
  box-shadow: 4px 7px 18px 7px #0000000d;
}
</style>
