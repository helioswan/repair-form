<template>
  <RouterLink
    :to="'/form/' + locationName"
    class="card-shadow flex h-[9.375rem] w-[9.375rem] flex-col rounded-[0.625rem] p-2 duration-150 ease-in-out"
    :class="selected ? 'bg-primary' : 'bg-primaryLight'"
    @mouseover="selected = true"
    @mouseleave="selected = false"
    @focus="selected = true"
    @blur="selected = false"
  >
    <component :is="is" :color="selected ? colors.primaryLight : colors.primary" class="m-auto" />
    <span class="mx-auto bg-primary px-2 text-center text-sm text-primaryLight">
      {{ displayName }}
    </span>
  </RouterLink>
</template>
<script setup lang="ts">
import { computed, ref, defineAsyncComponent } from 'vue'
const props = defineProps({
  locationName: {
    required: true,
    type: String
  },
  displayName: {
    required: true,
    type: String
  }
})
const selected = ref(false)
const is = computed(() =>
  defineAsyncComponent(() => import(`@/components/icons/${props.locationName}Icon.vue`))
)
const colors = {
  primary: '#FF445F',
  primaryLight: '#FFF0F1'
}
</script>
<style scoped>
.card-shadow {
  box-shadow: 4px 7px 18px 7px #0000000d;
}
</style>
