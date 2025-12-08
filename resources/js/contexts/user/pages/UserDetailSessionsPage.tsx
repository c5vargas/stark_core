import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { InfoCard } from '@/contexts/settings/components/InfoCard'
import { Card } from '@/contexts/shared/components/ui/Card'
import { BaseButton } from '@/contexts/shared/components/Button'
import { User } from '@/contexts/user/libs/types'
import { UserSession } from '@/contexts/user/libs/types'
import getUserSessions from '@/contexts/user/actions/getUserSessions'
import revokeUserSession from '@/contexts/user/actions/revokeUserSession'
import revokeAllUserSessions from '@/contexts/user/actions/revokeAllUserSessions'
import { useAlert } from '@/contexts/shared/contexts/AlertContext'
import { formatDate } from '@/contexts/shared/utils/date'
import { Badge } from '@/contexts/shared/components/ui/Badge'

const UserDetailSessionsPage = () => {
  const { t } = useTranslation()
  const { showAlert } = useAlert()
  const queryClient = useQueryClient()
  const { user } = useOutletContext<{ user: User }>()

  const { data: sessions, isLoading } = useQuery({
    queryKey: ['user-sessions', user.id],
    queryFn: () => getUserSessions(user.id),
  })

  const { mutateAsync: revokeSession, isPending: revoking } = useMutation({
    mutationFn: (sessionId: number) => revokeUserSession(user.id, sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-sessions', user.id] })
      showAlert(t('messages.controller.user.session_revoked'), 'success')
    },
    onError: (err: Error) => showAlert(err.message, 'error'),
  })

  const { mutateAsync: revokeAll, isPending: revokingAll } = useMutation({
    mutationFn: () => revokeAllUserSessions(user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-sessions', user.id] })
      showAlert(t('messages.controller.user.all_sessions_revoked'), 'success')
    },
    onError: (err: Error) => showAlert(err.message, 'error'),
  })

  if (isLoading) {
    return <div className="text-center">Loading...</div>
  }

  return (
    <div className="-mx-3 flex flex-wrap">
      <div className="w-full space-y-4">
        <InfoCard
          title={t('dashboard.users.sessions')}
          description={t('dashboard.users.sessions_desc')}
        />

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">{t('dashboard.users.sessions.active')}</h3>
            {sessions && sessions.length > 0 && (
              <BaseButton
                title={t('dashboard.users.sessions.revoke_all')}
                variant="outline"
                loading={revokingAll}
                onClick={() => revokeAll()}
              />
            )}
          </div>

          {!sessions || sessions.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              {t('dashboard.users.sessions.no_sessions')}
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session: UserSession) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{t('dashboard.users.sessions.device')}</span>
                      <Badge variant={session.is_expired ? 'error' : 'success'}>
                        {session.is_expired ? 'Expired' : 'Active'}
                      </Badge>
                    </div>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">
                          {t('dashboard.users.sessions.ip_address')}:
                        </span>{' '}
                        {session.ip_address || '-'}
                      </div>
                      <div>
                        <span className="font-medium">
                          {t('dashboard.users.sessions.last_activity')}:
                        </span>{' '}
                        {session.last_activity ? formatDate(session.last_activity, 'medium') : '-'}
                      </div>
                      {session.expires_at && (
                        <div>
                          <span className="font-medium">
                            {t('dashboard.users.sessions.expires_at')}:
                          </span>{' '}
                          {formatDate(session.expires_at, 'medium')}
                        </div>
                      )}
                      {session.user_agent && (
                        <div className="text-xs text-gray-500">{session.user_agent}</div>
                      )}
                    </div>
                  </div>
                  {!session.is_expired && (
                    <BaseButton
                      title={t('dashboard.users.sessions.revoke')}
                      variant="danger"
                      size="sm"
                      loading={revoking}
                      onClick={() => revokeSession(session.id)}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default UserDetailSessionsPage
