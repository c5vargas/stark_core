import { create } from 'zustand';
import { Auth, CredentialsType } from '../libs/types';
import loginAuth from '../actions/loginAuth';
import getAuth from '../actions/getAuth';

export const tokenInitialState = window.localStorage.getItem('__auth__') || ''

interface AuthState {
  user: Auth | null;
  token: string;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (credentials: CredentialsType) => Promise<boolean>;
  logout: () => void;
  getAuth: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: tokenInitialState,
  isAuthenticated: tokenInitialState !== '',
  loading: false,
  error: null,

  login: async (credentials: CredentialsType) => {
    set({ loading: true, error: null });
    try {
      const {results, status} = await loginAuth(credentials);

      if(!status) {
        return false;
      }

      if(results.token)
        window.localStorage.setItem('__auth__', results.token)

      set({ user: results.user, token: results.token, isAuthenticated: true, loading: false });

      return !!status
    } catch (error: any) {
      set({ error: error.message, loading: false });
      return false
    }
  },

  logout: () => {
    window.localStorage.removeItem('__auth__')
    set({ user: null, token: '', isAuthenticated: false });
  },

  getAuth: async () => {
    set({ loading: true, error: null });
    try {
      const {user, status} = await getAuth();

      if(!status)
        throw new Error("No token received");

      set({ user: user.data, isAuthenticated: true, loading: false });
      return true
    } catch (error: any) {
      set({ error: error.message, loading: false });
      return false
    }
  }
}));
