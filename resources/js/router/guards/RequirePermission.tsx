import { useAuthStore } from '@/contexts/auth/stores/authStore'
import Loading from '@/contexts/shared/components/Loading'
import { JSX, useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface RequirePermissionProps {
  children: JSX.Element
  permission: string
}

function RequirePermission({ children, permission }: RequirePermissionProps) {
  const location = useLocation()
  const getAuth = useAuthStore(state => state.getAuth)
  const hasPermission = useAuthStore(state => state.hasPermission)
  const user = useAuthStore(state => state.user)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const [isChecking, setIsChecking] = useState<boolean>(true)
  const [hasAccess, setHasAccess] = useState<boolean>(false)

  useEffect(() => {
    const checkPermission = async () => {
      // First ensure user is authenticated
      if (!isAuthenticated || !user) {
        const isAuth = await getAuth()

        if (!isAuth) {
          setHasAccess(false)
          setIsChecking(false)
          return
        }
      }

      // Then check if user has the required permission
      const hasPerm = hasPermission(permission)
      setHasAccess(hasPerm)
      setIsChecking(false)
    }

    checkPermission()
  }, [permission, isAuthenticated, user, getAuth, hasPermission])

  if (isChecking) {
    return (
      <div className="flex h-dvh w-dvh items-center justify-center">
        <Loading />
      </div>
    )
  }

  if (!hasAccess) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />
  }

  return children
}

export default RequirePermission
