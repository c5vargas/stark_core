import { Switch } from '@/contexts/shared/components/ui/form/Switch'

interface PermissionItemProps {
  roleId: number
  permId: number
  name: string
  description: string
  enabled: boolean
  onToggle: () => void
}

export const PermissionItem: React.FC<PermissionItemProps> = ({
  roleId,
  permId,
  name,
  description,
  enabled,
  onToggle,
}) => {
  const id = `role-${roleId}-perm-${permId}`

  return (
    <div className="flex flex-col justify-between rounded-lg border border-gray-200 bg-gray-50 p-3 shadow-sm transition hover:bg-gray-100">
      <div>
        <p className="mb-1 text-sm font-semibold">[{name}]</p>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
      <div className="mt-2 self-end">
        <Switch id={id} checked={enabled} onChange={onToggle} label={enabled ? 'On' : 'Off'} />
      </div>
    </div>
  )
}
