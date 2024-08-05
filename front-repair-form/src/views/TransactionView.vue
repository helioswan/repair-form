<template>
  <section class="container mx-auto flex flex-col justify-center gap-6 px-4 py-12 md:flex-row">
    <TransactionCard class="mb-auto max-w-[38.75rem]" />
    <div class="flex flex-col gap-8 md:max-w-[25rem]">
      <InterventionCard />
      <PhoneCard />
      <p class="text-[0.625rem]">
        <span class="font-semibold">
          Vous êtes recontactés sous 20 minutes après votre passage de commande.
        </span>
        <br />
        L'artisan vous proposera un rendez-vous dès qu'il aura pris connaissance de votre commande.
        Une fois sur place, il analysera la situation et vous présentera un devis définitif. En cas
        de non acceptation du devis, aucun frais n'est engagé (ni déplacement, ni établissement du
        devis).
      </p>
    </div>
  </section>
</template>
<script setup lang="ts">
import TransactionCard from '@components/transaction/TransactionCard.vue'
import InterventionCard from '@components/transaction/InterventionCard.vue'
import PhoneCard from '@components/transaction/PhoneCard.vue'
</script>
