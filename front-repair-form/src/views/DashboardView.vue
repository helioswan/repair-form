<template>
  <div class="container mx-auto flex flex-col items-center gap-8 px-4 py-12">
    <section class="flex w-full flex-col items-center gap-8">
      <h1 class="text-center text-[2.125rem] font-bold">Liste des dossiers</h1>
      <img alt="" src="@/assets/img/form/decoration-primary.svg" width="80" height="17" />
      <div>
        <RepairCard v-for="(repairForm, index) in repairForms" :key="index" :repair-form="repairForm"/>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import RepairCard from '@/components/dashboard/RepairCard.vue'
import type { RepairForm } from '@/types/RepairForm'
import type { Transaction } from '@/types/Transaction'
import { getRepairForms } from '@/services/repairForm'

const repairForms = ref<(RepairForm & Transaction)[]>()

const fetchRepairForms = async () => {
  const token = localStorage.getItem('token')
  if (!token) return
  getRepairForms(token)
    .then(function (response) {
      if (response.status === 200) return response.json()
      else throw new Error('Something went wrong')
    })
    .then((data) => {
      repairForms.value = data
    })
    .catch((error) => {
      console.error(error)
    })
}

fetchRepairForms()
</script>
<style scoped>
.card-shadow {
  box-shadow: 4px 7px 18px 7px #0000000d;
}
</style>
