import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { SettingsMap } from '@/contexts/settings/libs/types'
import { useAlert } from '@/contexts/shared/contexts/AlertContext'
import { useTranslation } from 'react-i18next'
import updateSettings from '@/contexts/settings/actions/updateSettings'
import getSettings from '@/contexts/settings/actions/getSettings'

export const useSettings = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const { showAlert } = useAlert()

  const { data, isLoading, error } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  })

  const { mutateAsync: update, isPending: updating } = useMutation({
    mutationFn: (payload: Partial<SettingsMap>) => updateSettings(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
      showAlert(t('controller.updated'), 'success')
    },
    onError: (err: Error) => showAlert(err.message, 'error'),
  })

  const normalizeSettings = data?.reduce((acc, curr) => {
    acc[curr.key] = curr.value
    return acc
  }, {} as SettingsMap)

  return { settings: normalizeSettings, loading: isLoading, updating, error, update }
}
