import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useAlert } from '@/contexts/shared/contexts/AlertContext'
import { useTranslation } from 'react-i18next'
import getLocales from '@/contexts/settings/actions/getLocales'
import updateLocalization, {
  IUpdateLocalization,
} from '@/contexts/settings/actions/updateLocalization'
import createLocale, { ICreateLocale } from '@/contexts/settings/actions/createLocale'

export const useLocalization = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const { showAlert } = useAlert()

  const { data, isLoading } = useQuery({
    queryKey: ['localization'],
    queryFn: getLocales,
  })

  const { mutateAsync: update, isPending: updating } = useMutation({
    mutationFn: (payload: IUpdateLocalization) => updateLocalization(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['localization'] })
      showAlert(t('controller.updated'), 'success')
    },
    onError: (err: Error) => showAlert(err.message, 'error'),
  })

  const { mutateAsync: create, isPending: creating } = useMutation({
    mutationFn: (payload: ICreateLocale) => createLocale(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['localization'] })
      showAlert(t('controller.updated'), 'success')
    },
    onError: (err: Error) => showAlert(err.message, 'error'),
  })

  return { languages: data, creating, updating, loading: isLoading, create, update }
}
