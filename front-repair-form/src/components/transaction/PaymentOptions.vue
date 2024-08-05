<template>
  <label
    class="flex cursor-pointer justify-between rounded-[0.625rem] bg-greyLight px-4 py-[0.8125rem]"
    required
  >
    <span class="text-sm font-semibold">{{ label }}</span>
    <input type="radio" name="payment" v-model="model" :value="label" />
  </label>
</template>
<script setup lang="ts">
const model = defineModel()
defineProps({
  label: {
    type: String,
    required: true
  }
})
</script>
<style scoped></style>
