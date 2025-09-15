// statusBadge.ts
import { UserStatus } from '../types'

export const STATUS_BADGE_CLASSES: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: 'bg-green-100 text-green-800',
  [UserStatus.INACTIVE]: 'bg-gray-100 text-gray-800',
  [UserStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [UserStatus.BLOCKED]: 'bg-red-100 text-red-800',
}
