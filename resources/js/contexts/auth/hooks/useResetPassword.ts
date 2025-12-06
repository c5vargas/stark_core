import { FormEvent, useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import resetPasswordAuth from '../actions/resetPasswordAuth'

const useResetPassword = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
  const [token, setToken] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    const emailParam = searchParams.get('email')

    if (tokenParam) {
      setToken(tokenParam)
    }
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam))
    }
  }, [searchParams])

  const handleResetPassword = async (ev: FormEvent<HTMLFormElement>): Promise<void> => {
    ev.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    if (!token || !email) {
      setError('Token or email is missing')
      setLoading(false)
      return
    }

    if (password !== passwordConfirmation) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const { status } = await resetPasswordAuth({
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })

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
    password,
    passwordConfirmation,
    loading,
    error,
    success,
    handleResetPassword,
    setEmail,
    setPassword,
    setPasswordConfirmation,
  }
}

export default useResetPassword
