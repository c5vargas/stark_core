export interface Auth {
  id: string
  name: string
  email: string
  role: string
  permissions: string[]
}

export interface CredentialsType {
  email: string
  password: string
}
