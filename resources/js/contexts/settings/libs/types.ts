import { ReactElement } from 'react'

export interface Setting {
  id: number
  key: string
  value: string | null
}

export interface Language {
  name: string
  code: string
}

export interface Permission {
  id: number
  name: string
  guard_name: string
  created_at: string
  updated_at: string
  descr: string
}

export interface Role {
  id: number
  name: string
  guard_name: string
  created_at: string
  updated_at: string
  permissions: Permission[]
}

export interface SettingsMap {
  app_name: string
  app_descr: string
  app_color: string
  app_locale: string
  app_timezone: string
  app_translations: string
  analytics_property_id: string
  manager_measurement_id: string
  maps_api_key: string
  mail_from_address: string
  mail_contact_address: string
  mail_from_name: string
  mail_driver: string
  mail_host: string
  mail_port: string
  mail_encryption: string
  mail_username: string
  mail_password: string
  gdpr_cookies_page: string
  gdpr_privacy_page: string
  [key: string]: string | null
}

export interface NavItem {
  route: string
  icon: ReactElement<SVGElement>
  name: string
}
