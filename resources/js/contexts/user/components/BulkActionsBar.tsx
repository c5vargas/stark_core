import { useTranslation } from 'react-i18next'
import { BaseButton } from '@/contexts/shared/components/Button'
import { BulkActionType } from '@/contexts/user/libs/types'
import { Card } from '@/contexts/shared/components/ui/Card'

interface BulkActionsBarProps {
  selectedCount: number
  onAction: (action: BulkActionType) => void
  executing: boolean
  onClear: () => void
}

const BulkActionsBar = ({ selectedCount, onAction, executing, onClear }: BulkActionsBarProps) => {
  const { t } = useTranslation()

  if (selectedCount === 0) return null

  return (
    <Card className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform shadow-lg">
      <div className="flex items-center gap-4 px-4 py-3">
        <span className="text-sm font-medium text-gray-700">
          {t('dashboard.users.selected_count', { count: selectedCount })}
        </span>
        <div className="flex gap-2">
          <BaseButton
            title={t('dashboard.users.activate')}
            variant="primary"
            size="sm"
            loading={executing}
            onClick={() => onAction('activate')}
          />
          <BaseButton
            title={t('dashboard.users.deactivate')}
            variant="secondary"
            size="sm"
            loading={executing}
            onClick={() => onAction('deactivate')}
          />
          <BaseButton
            title={t('dashboard.users.block')}
            variant="warning"
            size="sm"
            loading={executing}
            onClick={() => onAction('block')}
          />
          <BaseButton
            title={t('buttons.delete')}
            variant="danger"
            size="sm"
            loading={executing}
            onClick={() => onAction('delete')}
          />
          <BaseButton title={t('buttons.cancel')} variant="ghost" size="sm" onClick={onClear} />
        </div>
      </div>
    </Card>
  )
}

export default BulkActionsBar
