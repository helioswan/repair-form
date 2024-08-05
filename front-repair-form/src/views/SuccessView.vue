<template>
  <section class="container mx-auto flex flex-col justify-center gap-6 px-4 py-12 text-center">
    <Vue3Lottie :animationData="ValidJSON" :height="200" :width="200" :loop="false" />
    <h1 class="text-4xl font-semibold text-primary">Votre demande a bien été prise en compte</h1>
    <p class="mx-auto max-w-[50rem]">
      Vous êtes recontactés sous 20 minutes après votre passage de commande. L'artisan vous
      proposera un rendez-vous dès qu'il aura pris connaissance de votre commande. Une fois sur
      place, il analysera la situation et vous présentera un devis définitif. En cas de non
      acceptation du devis, aucun frais n'est engagé (ni déplacement, ni établissement du devis).
    </p>
  </section>
</template>
<script setup lang="ts">
import ValidJSON from '@/assets/json/valid-animation.json'
</script>
