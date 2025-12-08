import { useAuthStore } from '@/contexts/auth/stores/authStore'
import Loading from '@/contexts/shared/components/Loading'
import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation()

  const { getAuth } = useAuthStore()
  const [hasPermission, setHasPermission] = useState<boolean | undefined>()

  useEffect(() => {
    const fetchData = async () => {
      const isAuth = await getAuth()
      setHasPermission(isAuth)
    }

    fetchData()
  }, [])

  if (hasPermission === undefined) {
    return (
      <div className="flex h-dvh w-dvh items-center justify-center">
        <Loading />
      </div>
    )
  }

  return hasPermission ? children : <Navigate to="/" state={{ from: location }} replace />
}

export default RequireAuth
