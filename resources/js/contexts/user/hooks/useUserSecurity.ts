import { useState } from 'react'
import { useUserPage } from './useUserPage'

export const useUserSecurity = () => {
  const { user, updating, update } = useUserPage()
  const [password, setPassword] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setPassword(value)
  }

  const resetForm = () => setPassword('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    update({ id: user.id, password }).then(() => {
      resetForm()
    })
  }

  return {
    password,
    user,
    loading: updating,
    handleChange,
    handleSubmit,
    resetForm,
  }
}
