import { create } from 'zustand'
import { Auth, CredentialsType } from '../libs/types'
import loginAuth from '../actions/loginAuth'
import getAuth from '../actions/getAuth'
import { isErrorWithMessage } from '@/contexts/shared/libs/isErrorWithMessage'

export const tokenInitialState = window.localStorage.getItem('__auth__') || ''

interface AuthState {
  user: Auth | null
  token: string
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  login: (credentials: CredentialsType) => Promise<boolean>
  logout: () => void
  getAuth: () => Promise<boolean>
  hasPermission: (permission: string) => boolean
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  token: tokenInitialState,
  isAuthenticated: tokenInitialState !== '',
  loading: false,
  error: null,

  login: async (credentials: CredentialsType) => {
    set({ loading: true, error: null })
    try {
      const { results, status } = await loginAuth(credentials)
      const { token, user } = results

      if (!status) {
        return false
      }

      if (token) window.localStorage.setItem('__auth__', token)

      // Ensure permissions array exists
      if (!user.permissions) {
        user.permissions = []
      }

      set({ user, token, isAuthenticated: true, loading: false })

      return !!status
    } catch (error: unknown) {
      if (isErrorWithMessage(error)) {
        set({ error: error.message, loading: false })
      } else {
        set({ error: 'An error has occurred, please try again later', loading: false })
      }
      return false
    }
  },

  logout: () => {
    window.localStorage.removeItem('__auth__')
    set({ user: null, token: '', isAuthenticated: false })
  },

  getAuth: async () => {
    set({ loading: true, error: null })
    try {
      const { results, status } = await getAuth()
      const user = results.data

      if (status !== 201) throw new Error('No token received')

      // Ensure permissions array exists
      if (!user.permissions) {
        user.permissions = []
      }

      set({ user, isAuthenticated: true, loading: false })
      return true
    } catch (error: unknown) {
      if (isErrorWithMessage(error)) {
        set({ error: error.message, loading: false })
      } else {
        set({ error: 'An error occured' })
      }
    }
    return false
  },

  hasPermission: (permission: string): boolean => {
    const state = useAuthStore.getState()
    if (!state.user || !state.user.permissions) {
      return false
    }
    return state.user.permissions.includes(permission)
  },
}))
