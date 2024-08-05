<template>
  <button
    class="flex w-full items-center justify-between rounded-[0.625rem] bg-greyLight p-[0.8125rem] duration-200 ease-in-out hover:bg-primaryLight hover:text-primary focus:bg-primaryLight focus:text-primary"
    @click="selectAnwser"
  >
    <span class="text-left text-sm font-semibold">{{ label }}</span>
    <img alt="" src="@/assets/img/icons/arrow-right.svg" width="24" height="24" />
  </button>
</template>
<script setup lang="ts">
const props = defineProps({
  label: { type: String, required: true },
  index: { type: Number, required: true }
})
const emit = defineEmits(['trigger'])
function selectAnwser($event: any) {
  $event.target.blur()
  emit('trigger', props.label, props.index)
}
</script>
<style scoped></style>
