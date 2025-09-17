export interface User {
  id: number
  name: string
  username: string
  email: string
  avatar?: string
  status: UserStatus
  locale?: string
  metadata?: Record<string, unknown>
  last_login_at?: string | null
  created_at: string
  updated_at: string
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  BLOCKED = 'blocked',
}
