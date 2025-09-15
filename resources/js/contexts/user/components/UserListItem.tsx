import { useNavigate } from 'react-router-dom'
import { User } from '@/contexts/user/libs/types'
import { formatDate } from '@/contexts/shared/utils/date'
import { STATUS_BADGE_CLASSES } from '@/contexts/user/libs/utils/statusBadge'
import { isUserOnline } from '@/contexts/user/libs/utils/isUserOnline'
import clsx from 'clsx'

export const UserListItem = ({ user }: { user: User }) => {
  const navigate = useNavigate()

  const handleEdit = (item: User) => {
    navigate(`/dashboard/users/${item.id}`)
  }

  const online = isUserOnline(user.last_login_at)

  return (
    user && (
      <tr
        className="h-14 cursor-pointer duration-300 hover:bg-gray-100 [&>td]:min-w-[120px] [&>td]:px-6"
        onClick={() => handleEdit(user)}
      >
        <td className="flex w-full border-collapse items-center gap-2 border-y border-slate-200">
          {user.avatar && (
            <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
          )}
          <span className="text-sm font-medium text-gray-800 capitalize">{user.name}</span>
          {online && (
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" title="Online" />
          )}
        </td>
        <td className="border-y border-slate-200">
          <span className="text-sm text-gray-600">{user.email}</span>
        </td>
        <td className="border-y border-slate-200">
          <span
            className={clsx(
              'inline-block rounded px-2 py-0.5 text-xs font-semibold',
              STATUS_BADGE_CLASSES[user.status]
            )}
          >
            {user.status}
          </span>
        </td>
        <td className="border-y border-slate-200">
          <span className="text-sm text-gray-500">
            {user.created_at ? formatDate(user.created_at, 'medium') : '-'}
          </span>
        </td>
      </tr>
    )
  )
}
