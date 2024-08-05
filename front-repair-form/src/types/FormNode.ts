export interface FormNode {
  name: string
  question?: string
  anwsers?: FormNode[]
}
export interface NodeStack {
  data: FormNode
  userResponse?: string
}