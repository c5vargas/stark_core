import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useAlert } from '@/contexts/shared/contexts/AlertContext'
import bulkUserAction from '@/contexts/user/actions/bulkUserAction'
import { BulkActionType } from '@/contexts/user/libs/types'

export const useBulkActions = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const { showAlert } = useAlert()
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const { mutateAsync: executeAction, isPending: executing } = useMutation({
    mutationFn: (action: BulkActionType) => bulkUserAction({ action, ids: selectedIds }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] })
      setSelectedIds([])
      showAlert(t('messages.controller.user.bulk_action_success'), 'success')
    },
    onError: (err: Error) => showAlert(err.message, 'error'),
  })

  const toggleSelection = (id: number) => {
    setSelectedIds(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]))
  }

  const selectAll = (ids: number[]) => {
    setSelectedIds(ids)
  }

  const clearSelection = () => {
    setSelectedIds([])
  }

  return {
    selectedIds,
    toggleSelection,
    selectAll,
    clearSelection,
    executeAction,
    executing,
  }
}
