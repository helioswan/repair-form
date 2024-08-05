<template>
  <div
    class="repair-card w-full max-w-[30rem] rounded-[0.625rem] bg-white p-6 font-semibold text-secondary"
  >
    <div>
      <h2 class="mb-[0.625rem] text-lg">
        Demande de {{ repairForm.firstname }} {{ repairForm.lastname.toUpperCase() }}
      </h2>
      <div class="flex flex-col gap-3 text-[0.65rem]">
        <div>
          <span class="text-[0.8rem] font-bold">Date de la demande: </span><br />
          {{ formatDate(repairForm.createdAt as string) }}
        </div>
        <div class="">
          <span class="text-[0.8rem] font-bold">Le dépannage concerne: </span>
          <div>
            {{ repairForm.type.toUpperCase() }} -
            {{ repairForm.location }}
            <span v-if="repairForm.reason"> - {{ repairForm.reason }} </span>
            <span v-if="repairForm.detail"> - {{ repairForm.detail }} </span>
          </div>
        </div>
        <div class="">
          <span class="text-[0.8rem] font-bold">Contact: </span><br />
          <span>Prénom: {{ repairForm.firstname }}</span
          ><br />
          <span>Nom: {{ repairForm.lastname }}</span
          ><br />
          <span>Adresse: {{ repairForm.address }} - {{ repairForm.zip }}</span
          ><br />
          <span>
            Email:
            <a :href="'mailto:' + repairForm.email" class="hover:text-primary focus:text-primary">
              {{ repairForm.email }}
            </a>
            <br />
          </span>
          <span>
            Téléphone:
            <a :href="'tel:' + repairForm.phone" class="hover:text-primary focus:text-primary">
              {{ repairForm.phone }}
            </a>
            <br />
          </span>
          <span>Paiement: {{ repairForm.paymentOption }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { RepairForm } from '@/types/RepairForm'
import type { Transaction } from '@/types/Transaction'

defineProps<{ repairForm: RepairForm & Transaction }>()

function formatDate(dateString: string): string {
  const date = new Date(dateString)

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }

  return date.toLocaleString('fr-FR', options)
}
</script>
<style scoped>
.repair-card {
  box-shadow: 4px 7px 18px 7px #0000000d;
}
</style>
