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

export interface SettingsMap {
  app_name: string
  app_descr: string
  app_color: string
  mail_from_address: string
  mail_contact_address: string
  mail_from_name: string
  mail_driver: string
  mail_host: string
  mail_port: string
  mail_encryption: string
  mail_username: string
  mail_password: string
  [key: string]: string | null
}

export interface NavItem {
  route: string
  icon: ReactElement<SVGElement>
  name: string
}
