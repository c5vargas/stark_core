import { ReactElement } from 'react'

export interface Setting {
  id: number
  key: string
  value: string | null
}

export interface SettingsMap {
  app_name: string
  app_descr: string
  app_color: string
  [key: string]: string | null
}

export interface NavItem {
  route: string
  icon: ReactElement<SVGElement>
  name: string
}
