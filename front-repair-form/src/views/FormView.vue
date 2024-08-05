<template>
  <div class="container mx-auto flex flex-col items-center gap-8 px-4 py-12">
    <section class="flex w-full flex-col items-center gap-8">
      <h1 class="text-center text-[2.125rem] font-bold">{{ currentNode.data.question }}</h1>
      <img alt="" src="@/assets/img/form/decoration-primary.svg" width="80" height="17" />
      <div
        class="card-shadow w-full max-w-[58.8125rem] rounded-[0.625rem] border border-greyLight px-6 py-8 sm:px-[2.375rem]"
      >
        <div class="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AnswerButton
            v-for="(anwser, index) in anwsers"
            :label="anwser.name"
            :index="index"
            @trigger="selectAnwser"
            :key="index"
          />
        </div>
        <CoreButton
          label="Étape précédente"
          type="ghost"
          @trigger="goToPreviousStep"
          class="mx-auto sm:m-0"
        >
          <template v-slot:leading>
            <img alt="" src="@/assets/img/icons/arrow-left.svg" width="24" height="24" />
          </template>
        </CoreButton>
      </div>
    </section>
    <div class="w-full max-w-[58.8125rem]">
      <ArgumentBlock />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import ArgumentBlock from '@components/form/ArgumentBlock.vue'
import AnswerButton from '@components/form/AnswerButton.vue'
import CoreButton from '@components/core/CoreButton.vue'
import formJSON from '@/assets/json/form.json'
import { useRepairFormStore } from '@/stores/repairForm'
import type { Ref } from 'vue'
import type { FormNode, NodeStack } from '@/types/FormNode'
import type { RepairForm } from '@/types/RepairForm'

const router = useRouter()
const route = useRoute()
const repairFormStore = useRepairFormStore()
const { setForm } = repairFormStore

const nodeStack: Ref<NodeStack[]> = ref([
  {
    data: formJSON as FormNode,
    userResponse: route.params.type
  }
] as NodeStack[])
const currentNode = computed(() => nodeStack.value[nodeStack.value.length - 1])
const anwsers = computed<FormNode[] | undefined>(() => currentNode.value.data.anwsers)
const currentStep = ref(0)
function goToPreviousStep() {
  if (currentStep.value === 0) {
    router.push({ name: 'home' })
  } else {
    currentStep.value--
    nodeStack.value.pop()
  }
}
function selectAnwser(anwser: string, index: number): void {
  if (!currentNode.value.data.anwsers) return
  const newNode = {
    data: currentNode.value.data.anwsers[index],
    userResponse: anwser
  }
  nodeStack.value.push(newNode)
  currentStep.value++
  if (newNode.data.anwsers === undefined) {
    const formatedUserResponse = nodeStack.value.map((node) => node.userResponse)
    const repairFormData: RepairForm = {
      type: formatedUserResponse[0] as string,
      location: formatedUserResponse[1] as string,
      reason: formatedUserResponse[2] as string,
      detail: formatedUserResponse[3] as string
    }
    setForm(repairFormData)
    router.push({ name: 'result' })
    return
  }
}
</script>
<style scoped>
.card-shadow {
  box-shadow: 4px 7px 18px 7px #0000000d;
}
</style>
