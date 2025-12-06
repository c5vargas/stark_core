import { getLng } from '@/i18n'
import { format } from '@formkit/tempo'

export const formatDate = (date: string | Date, formatVal: string) => {
  return format(date, formatVal, getLng())
}
