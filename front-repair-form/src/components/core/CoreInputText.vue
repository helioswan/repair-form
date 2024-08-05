<template>
  <div class="my-5 flex flex-col">
    <label
      :class="{ 'valid-input': isValid, 'error-input': hasError }"
      class="relative block border-collapse rounded-[0.625rem] border border-greyLighter"
    >
      <div
        class="absolute left-3 top-0 inline-block -translate-y-[90%] bg-white px-3 py-1 text-xs font-normal"
      >
        <span>{{ label }}</span>
        <span
          v-if="required"
          class="text-error"
          :class="{ 'valid-input': isValid, 'error-input': hasError }"
          >*</span
        >
      </div>
      <input
        :type="type"
        v-model="model"
        :name="name"
        :aria-invalid="errorMessage ? true : false"
        :required="required"
        :aria-describedby="'transaction-form-' + name + '-error'"
        class="w-full rounded-[0.625rem] bg-transparent px-2 py-2 text-sm font-normal"
      />
    </label>
    <span
      class="block text-[0.5rem] font-normal text-error"
      :id="'transaction-form-' + name + '-error'"
      aria-live="polite"
      v-if="errorMessage"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
const model = defineModel()
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    required: false
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  isValid: {
    type: Boolean,
    required: false
  },
  errorMessage: {
    type: String,
    required: false
  }
})
const emit = defineEmits(['onError', 'update:modelValue'])
const hasError = computed(() => {
  if (props.errorMessage) return true
  return false
})
</script>
<style scoped>
.valid-input {
  @apply border-valid text-valid;
}
.error-input {
  @apply border-error text-error;
}
</style>
