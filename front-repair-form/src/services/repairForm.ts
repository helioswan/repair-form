import type { RepairForm } from '@/types/RepairForm'
import type { Transaction } from '@/types/Transaction'

export async function sendRepairForm(repairForm: RepairForm, transaction: Transaction) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.assign(repairForm, transaction))
  }
  return await fetch(import.meta.env.VITE_API_URL + '/repairs', requestOptions)
}

export async function getRepairForms(token: string) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    },
  }
  return await fetch(import.meta.env.VITE_API_URL + '/repairs', requestOptions)
}
