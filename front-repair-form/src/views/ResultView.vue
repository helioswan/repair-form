<template>
  <section class="container mx-auto flex flex-col justify-center gap-6 px-4 py-12 md:flex-row">
    <InformationCard class="mb-auto max-w-[38.75rem]" />
    <div class="flex flex-col gap-8 md:max-w-[25rem]">
      <InterventionCard />
      <p class="text-[0.625rem]">
        <span class="font-semibold">
          Vous êtes recontactés sous 20 minutes après votre passage de commande.
        </span>
        <br />Si l’origine de votre panne nécessite un diagnostic complémentaire, il s’agit d’une
        intervention à part entière demandant l’exêrtise d’un professionnel. Celle-ci fera l’objet
        d’une facturation.
      </p>
    </div>
  </section>
</template>
<script setup lang="ts">
import InformationCard from '@components/result/InformationCard.vue'
import InterventionCard from '@components/result/InterventionCard.vue'
</script>
