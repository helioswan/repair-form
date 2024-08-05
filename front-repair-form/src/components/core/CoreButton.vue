<template>
  <button
    :class="`flex items-center gap-4 px-6 py-4 text-sm font-semibold ${type}`"
    @click="emit('trigger', $event)"
  >
    <slot name="leading"></slot>
    <span class="mx-auto">{{ label }}</span>
    <slot name="trailling"></slot>
  </button>
</template>
<script setup lang="ts">
defineProps({
  label: { type: String, required: true },
  type: { type: String, required: true, default: 'ghost' },
})
const emit = defineEmits(['trigger'])
</script>
<style scoped>
.ghost {
  @apply rounded-full border border-primary bg-white text-primary duration-200 ease-in-out hover:bg-primaryLight focus:bg-primaryLight;
}
.fill {
  @apply hover:bg-primaryDark hover:border-primaryDark focus:bg-primaryDark focus:border-primaryDark rounded-full border border-primary bg-primary text-white duration-200 ease-in-out;
}
</style>
