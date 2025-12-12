/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormData } from './types'

type PayloadValue = string | number | boolean | File | null

const formatPayload = <T extends Record<string, any>>(payload: T): FormData => {
  const formattedPayload: FormData = {} as FormData

  Object.keys(payload).forEach(key => {
    const value = payload[key] as PayloadValue
    formattedPayload[key] = value
  })

  return formattedPayload
}

export default formatPayload
