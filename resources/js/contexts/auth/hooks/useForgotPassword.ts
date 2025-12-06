import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import forgetPasswordAuth from '../actions/forgetPasswordAuth'

const useForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const handleForgotPassword = async (ev: FormEvent<HTMLFormElement>): Promise<void> => {
    ev.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const { status } = await forgetPasswordAuth({ email })

      if (status) {
        setSuccess(true)
        setTimeout(() => {
          navigate('/auth/login')
        }, 3000)
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An error has occurred, please try again later')
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    email,
    loading,
    error,
    success,
    handleForgotPassword,
    setEmail,
  }
}

export default useForgotPassword
