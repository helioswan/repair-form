export interface Transaction {
  firstname: string
  lastname: string
  address: string
  zip: string
  email: string
  phone: string
  paymentOption: string
  generalTerms: boolean
  retractTerms: boolean
  commercialOffer?: boolean
}
