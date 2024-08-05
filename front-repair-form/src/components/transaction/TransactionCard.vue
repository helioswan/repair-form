<template>
  <form
    @submit="onSubmit"
    class="transaction-card flex w-full flex-col gap-6 rounded-[0.625rem] bg-white p-6 font-semibold text-secondary"
    id="form"
  >
    <fieldset>
      <legend class="mb-2 flex items-center gap-[0.625rem] py-[0.625rem] text-lg font-semibold">
        <span class="flex h-6 w-6 items-center justify-center bg-primary font-extrabold text-white">
          1
        </span>
        Informations
      </legend>
      <p class="text-xs font-normal text-secondary">
        Les champs précédés d'une étoile (<span class="text-error">*</span>) sont obligatoires
      </p>
      <div class="grid grid-cols-1 gap-[0.625rem] py-5 lg:grid-cols-2">
        <CoreInputText
          label="Prénom"
          required
          type="text"
          name="firstname"
          v-model="firstname"
          :errorMessage="errors.firstname"
        />
        <CoreInputText
          label="Nom"
          required
          type="text"
          name="lastname"
          v-model="lastname"
          :errorMessage="errors.lastname"
        />
        <CoreInputText
          label="Adresse (numéro et voie)"
          required
          type="text"
          name="address"
          v-model="address"
          :errorMessage="errors.address"
        />
        <CoreInputText
          label="Code postal"
          name="zip"
          type="text"
          v-model="zip"
          required
          :errorMessage="errors.zip"
        />
        <CoreInputText
          label="Téléphone"
          name="phone"
          required
          v-model="phone"
          type="tel"
          :errorMessage="errors.phone"
        />
        <CoreInputText
          label="Adresse email"
          name="email"
          required
          v-model="email"
          type="text"
          :errorMessage="errors.email"
        />
      </div>
    </fieldset>
    <fieldset class="flex flex-col gap-[0.625rem]">
      <legend class="flex items-center gap-[0.625rem] py-[0.625rem] text-lg font-semibold">
        <span class="flex h-6 w-6 items-center justify-center bg-primary font-extrabold text-white">
          2
        </span>
        Modes de paiement<span class="text-error">*</span>
      </legend>
      <PaymentOption label="Payer sur place" v-model="paymentOption" />
      <PaymentOption label="Payer en ligne" v-model="paymentOption" />
      <span
        class="block text-[0.5rem] font-normal text-error"
        id="transaction-form-general-error"
        aria-live="polite"
        v-if="errors.paymentOption"
      >
        {{ errors.paymentOption }}
      </span>
    </fieldset>
    <div class="flex flex-col p-[0.625rem] text-xs font-normal">
      <label class="flex cursor-pointer items-center gap-[0.625rem] px-1 py-[0.625rem]">
        <input
          type="checkbox"
          class="cursor-pointer"
          v-model="generalTerms"
          value="generalTerms"
          required
        />
        <div>
          <span>
            J’accepte les
            <a href="" target="_blank" class="text-link">
              conditions générales d’utilisation du service
            </a>
            <span class="text-error">*</span>
          </span>
          <span
            class="block text-[0.5rem] font-normal text-error"
            id="transaction-form-general-error"
            aria-live="polite"
            v-if="errors.generalTerms"
          >
            {{ errors.generalTerms }}
          </span>
        </div>
      </label>
      <label class="flex cursor-pointer items-center gap-[0.625rem] px-1 py-[0.625rem]">
        <input
          type="checkbox"
          v-model="retractTerms"
          value="retractTerms"
          class="cursor-pointer"
          id="retractTerms"
          required
        />
        <div>
          <span>
            J’ai bien pris connaissance des
            <a href="" target="_blank" class="text-link">
              dispositions relatives au droit de rétractation
            </a>
            <span class="text-error">*</span>
          </span>
          <span
            class="block text-[0.5rem] font-normal text-error"
            id="transaction-form-general-error"
            aria-live="polite"
            v-if="errors.retractTerms"
          >
            {{ errors.retractTerms }}
          </span>
        </div>
      </label>
      <label class="flex cursor-pointer items-center gap-[0.625rem] px-1 py-[0.625rem]">
        <input
          type="checkbox"
          class="cursor-pointer"
          v-model="commercialOffer"
          value="commercialOffer"
        />
        <span>
          Je souhaite recevoir par voie électronique des offres commerciales personnalisées
        </span>
      </label>
    </div>
    <div class="flex flex-col gap-[0.625rem] lg:flex-row">
      <CoreButton
        label="Étape précédente"
        type="ghost"
        @trigger="goToPreviousStep"
        class="mx-auto lg:m-0"
      >
        <template v-slot:leading>
          <img alt="" src="@/assets/img/icons/arrow-left.svg" width="24" height="24" />
        </template>
      </CoreButton>
      <CoreButton
        label="Passer commande et payer en ligne"
        type="fill"
        @trigger="onSubmit"
        id="submit"
        class="mx-auto lg:m-0"
      />
    </div>
    <span class="block text-[0.5rem] font-normal text-error" aria-live="polite" v-if="submitError">
      Une erreur est survenue, veuillez réessayer plus tard
    </span>
  </form>
</template>
<script setup lang="ts">
import CoreInputText from '@components/core/CoreInputText.vue'
import CoreButton from '@components/core/CoreButton.vue'
import PaymentOption from '@components/transaction/PaymentOptions.vue'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { useRouter } from 'vue-router'
import { sendRepairForm } from '@/services/repairForm'
import { useRepairFormStore } from '@/stores/repairForm'
import { ref } from 'vue'
import type { RepairForm } from '@/types/RepairForm'
const router = useRouter()
const { repairForm } = useRepairFormStore()
const validationSchema = toTypedSchema(
  zod.object({
    firstname: zod
      .string({ message: 'Le prénom est requis' })
      .min(1, { message: 'Le prénom est requis' })
      .max(50, { message: 'Le prénom ne peut pas dépasser 50 caractères' }),
    lastname: zod
      .string({ message: 'Le nom de famille est requis' })
      .min(1, { message: 'Le nom de famille est requis' })
      .max(50, { message: 'Le nom de famille ne peut pas dépasser 50 caractères' }),
    address: zod
      .string({ message: "L'adresse est requise" })
      .min(1, { message: "L'adresse est requise" })
      .max(100, { message: "L'adresse ne peut pas dépasser 100 caractères" }),
    zip: zod
      .string({ message: 'Le code postal est requis' })
      .min(1, { message: 'Le code postal est requis' })
      .max(10, { message: 'Le code postal ne peut pas dépasser 10 caractères' }),
    email: zod
      .string({ message: "L'email doit être valide" })
      .email({ message: "L'email doit être valide" }),
    phone: zod
      .string({ message: 'Le numéro de téléphone est requis' })
      .min(1, { message: 'Le numéro de téléphone est requis' })
      .max(15, { message: 'Le numéro de téléphone ne peut pas dépasser 15 caractères' }),
    paymentOption: zod.string({ message: "Le choix d'un moyen de paiement est requis" }),
    generalTerms: zod.literal<boolean>(true, {
      errorMap: () => ({
        message: 'Vous devez accepter les conditions générales d’utilisation du service'
      })
    }),
    retractTerms: zod.literal<boolean>(true, {
      errorMap: () => ({
        message: 'Vous devez accepter les dispositions relatives au droit de rétractation'
      })
    }),
    commercialOffer: zod.boolean().optional()
  })
)
const { handleSubmit, errors } = useForm({
  validationSchema
})
const { value: firstname } = useField('firstname')
const { value: lastname } = useField('lastname')
const { value: address } = useField('address')
const { value: zip } = useField('zip')
const { value: email } = useField('email')
const { value: phone } = useField('phone')
const { value: paymentOption } = useField('paymentOption')
const { value: generalTerms } = useField('generalTerms')
const { value: retractTerms } = useField('retractTerms')
const { value: commercialOffer } = useField('commercialOffer')
const isLoading = ref(false)
const submitError = ref(false)
const onSubmit = handleSubmit((values) => {
  if (isLoading.value) return
  isLoading.value = true
  submitError.value = true
  sendRepairForm(repairForm as RepairForm, values)
    .then((e) => {
      if (e.status === 201) {
        router.push({ name: 'success' })
      }
    })
    .catch(() => {
      submitError.value = true
    })
    .finally(() => {
      isLoading.value = false
    })
})
function goToPreviousStep() {
  router.push({ name: 'result' })
}
</script>
<style scoped>
.transaction-card {
  box-shadow: 4px 7px 18px 7px #0000000d;
}
</style>
