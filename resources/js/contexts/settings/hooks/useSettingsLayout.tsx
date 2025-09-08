import { useQuery } from '@tanstack/react-query'
import { SettingsMap } from '@/contexts/settings/libs/types'
import getSettings from '@/contexts/settings/actions/getSettings'

export const useSettingsLayout = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  })

  const normalizeSettings = data?.reduce((acc, curr) => {
    acc[curr.key] = curr.value
    return acc
  }, {} as SettingsMap)

  return { settings: normalizeSettings, loading: isLoading, error }
}
