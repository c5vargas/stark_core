export interface User {
  id: number
  name: string
  username: string
  email: string
  avatar?: string
  status: UserStatus
  locale?: string
  password?: string
  metadata?: Record<string, unknown>
  last_login_at?: string | null
  created_at: string
  updated_at: string
  roles?: string[]
  permissions?: string[]
  custom_fields?: CustomFieldValue[]
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  BLOCKED = 'blocked',
}

export interface UserSession {
  id: number
  user_id: number
  token: string
  ip_address?: string | null
  user_agent?: string | null
  last_activity?: string | null
  expires_at?: string | null
  is_expired: boolean
  created_at?: string
  updated_at?: string
}

export interface CustomField {
  id: number
  name: string
  type: CustomFieldType
  label: string
  required: boolean
  options?: string[] | null
  order: number
  created_at?: string
  updated_at?: string
}

export interface CustomFieldValue {
  id: number
  custom_field_id: number
  value: string | number | boolean | null
  custom_field?: CustomField
}

export type CustomFieldType = 'text' | 'textarea' | 'select' | 'date' | 'number' | 'email'

export interface UserStatistics {
  total: number
  active: number
  inactive: number
  pending: number
  blocked: number
  new_this_month: number
}

export type BulkActionType = 'activate' | 'deactivate' | 'block' | 'delete'

export interface BulkActionRequest {
  action: BulkActionType
  ids: number[]
}

export interface SyncRolesRequest {
  role_ids: number[]
}

export interface SyncPermissionsRequest {
  permission_ids: number[]
}

export interface Category {
  id: number
  name: string
  description?: string | null
  created_at?: string
  updated_at?: string
}
