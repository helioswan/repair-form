import type { RepairForm } from '@/types/RepairForm'
import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useRepairFormStore = defineStore('RepairForm', () => {
  const repairForm = ref<RepairForm | undefined>()
  function setForm(form: RepairForm) {
    repairForm.value = form
  }
  function resetForm() {
    repairForm.value = {
      location: '',
      type: '',
      reason: null,
      detail: null
    }
  }
  return {
    repairForm,
    setForm,
    resetForm
  }
})
