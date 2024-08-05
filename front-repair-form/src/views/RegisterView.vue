<template>
  <section class="container mx-auto flex flex-col items-center gap-8 px-4 py-12">
    <form class="flex w-full flex-col items-center gap-8" @submit="onSubmit">
      <h1 class="text-center text-[2.125rem] font-bold">S'inscrire</h1>
      <img alt="" src="@/assets/img/form/decoration-primary.svg" width="80" height="17" />
      <div
        class="card-shadow flex w-full max-w-[30rem] flex-col gap-2 rounded-[0.625rem] border border-greyLight bg-white px-6 py-8 sm:px-[2.375rem]"
      >
        <CoreInputText
          label="Email"
          required
          type="text"
          name="email"
          v-model="email"
          :errorMessage="errors.email"
        />
        <CoreInputText
          label="Mot de passe"
          required
          type="password"
          name="password"
          v-model="password"
          :errorMessage="errors.password"
        />
        <CoreButton label="S'inscrire" type="fill" @trigger="onSubmit" class="text-center" />
        <span class="mx-auto mt-4 text-xs"
          >Vous avez déjà un compte ?
          <RouterLink
            :to="{ name: 'login' }"
            class="text-primary hover:text-primaryDark focus:text-primaryDark"
          >
            Se connecter</RouterLink
          >
        </span>
      </div>
    </form>
  </section>
</template>
<script setup lang="ts">
import CoreInputText from '@components/core/CoreInputText.vue'
import CoreButton from '@components/core/CoreButton.vue'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import { register } from '@/services/auth'

const router = useRouter()

const validationSchema = toTypedSchema(
  zod.object({
    email: zod
      .string({ message: "L'email doit être valide" })
      .email({ message: "L'email doit être valide" }),
    password: zod
      .string({ message: 'Le mot de passe est requis' })
      .min(8, { message: 'Le mot de passe doit contenir au minimum 8 caractères' })
  })
)

const { handleSubmit, errors } = useForm({
  validationSchema
})
const { value: email } = useField('email')
const { value: password } = useField('password')

const isLoading = ref(false)
const submitError = ref(false)

const onSubmit = handleSubmit((values) => {
  if (isLoading.value) return
  isLoading.value = true
  submitError.value = true
  register(values)
    .then((res) => {
      if (res.status === 201) {
        router.push({ name: 'login' })
      }
    })
    .catch(() => {
      submitError.value = true
    })
    .finally(() => {
      isLoading.value = false
    })
})
</script>

<style scoped>
.card-shadow {
  box-shadow: 4px 7px 18px 7px #0000000d;
}
</style>
