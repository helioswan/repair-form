export interface RepairForm {
  type: string
  location: string
  reason: string | null
  detail: string | null
  createdAt?: string
}
