import { useNavigate } from 'react-router-dom'
import { User } from '@/contexts/user/libs/types'

export const UserListItem = ({ user }: { user: User }) => {
  const navigate = useNavigate()

  const handleEdit = (item: User) => {
    navigate(`/dashboard/users/${item.id}`)
  }

  return (
    user && (
      <tr
        className="h-14 cursor-pointer duration-300 hover:bg-gray-100 [&>td]:min-w-[120px] [&>td]:px-6"
        onClick={() => handleEdit(user)}
      >
        <td className="w-full border-collapse border-y border-slate-200">
          <span className="mb-0 text-sm leading-normal text-gray-600 capitalize">{user.name}</span>
        </td>
      </tr>
    )
  )
}
