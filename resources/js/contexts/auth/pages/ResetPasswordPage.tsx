import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import useResetPassword from '../hooks/useResetPassword'

const ResetPasswordPage = () => {
  const { t } = useTranslation()
  const {
    email,
    password,
    passwordConfirmation,
    loading,
    error,
    success,
    setEmail,
    setPassword,
    setPasswordConfirmation,
    handleResetPassword,
  } = useResetPassword()

  return (
    <main className="ease-soft-in-out ps mt-0 transition-all duration-200">
      <div className="relative flex min-h-screen items-center overflow-hidden bg-cover bg-center p-0">
        <div className="z-1 container">
          <div className="-mx-3 flex flex-wrap">
            <div className="mx-auto flex w-full max-w-full shrink-0 flex-col px-3 md:w-7/12 md:flex-0 lg:mx-0 lg:w-5/12 xl:w-4/12">
              <div className="lg:py4 relative flex min-w-0 flex-col rounded-2xl border-0 bg-transparent bg-clip-border break-words shadow-none">
                <div className="mb-0 p-6 pb-0">
                  <h4 className="leading-5 font-bold">{t('auth.reset_password.h4')}</h4>
                  <p className="mb-0">{t('auth.reset_password.p')}</p>
                </div>

                <div className="flex-auto p-6">
                  {success ? (
                    <div className="mb-4 rounded-lg bg-green-50 p-4 text-green-800">
                      <p className="text-sm">{t('auth.reset_password.success')}</p>
                    </div>
                  ) : (
                    <form role="form" onSubmit={handleResetPassword}>
                      <div className="mb-4">
                        <input
                          value={email}
                          onChange={e => setEmail(e.currentTarget.value)}
                          type="email"
                          placeholder={t('auth.login.email')}
                          className="focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-3 text-sm font-normal text-gray-700 transition-all outline-none placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          value={password}
                          onChange={e => setPassword(e.currentTarget.value)}
                          type="password"
                          placeholder={t('auth.login.password')}
                          className="focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-3 text-sm font-normal text-gray-700 transition-all outline-none placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                          required
                          minLength={8}
                        />
                      </div>
                      <div className="mb-1">
                        <input
                          value={passwordConfirmation}
                          onChange={e => setPasswordConfirmation(e.currentTarget.value)}
                          type="password"
                          placeholder={t('auth.reset_password.password_confirmation')}
                          className="focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-3 text-sm font-normal text-gray-700 transition-all outline-none placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                          required
                          minLength={8}
                        />
                      </div>

                      <span
                        className={`${error ? 'opacity-100' : 'opacity-0'} text-sm text-red-600 duration-500`}
                      >
                        {error}
                      </span>

                      <div className="text-center">
                        <button
                          type="submit"
                          className={`mt-6 mb-0 w-full cursor-pointer rounded-lg border-0 px-6 py-4 text-center align-middle font-bold text-white uppercase transition-all ${loading ? 'cursor-not-allowed opacity-50' : 'hover:shadow-soft-xs hover:scale-[1.02] active:opacity-85'} leading-pro ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-purple-700 to-pink-500 text-xs`}
                          disabled={loading}
                        >
                          <span>
                            {loading ? t('shared.loading') : t('auth.reset_password.submit')}
                          </span>
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="mt-4 text-center">
                    <Link
                      to="/auth/login"
                      className="text-sm text-purple-600 transition-colors hover:text-purple-800"
                    >
                      {t('auth.reset_password.back_to_login')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-0 right-0 my-auto hidden h-full w-6/12 max-w-full flex-0 flex-col justify-center px-3 pr-0 text-center lg:flex">
              <div className="relative m-4 flex h-full flex-col justify-center rounded-xl bg-gradient-to-tl from-purple-700 to-pink-500 px-24">
                <img
                  className="absolute left-0 opacity-40"
                  src="/assets/images/shapes/pattern-lines.svg"
                  alt="pattern-lines"
                />
                <div className="relative">
                  <img
                    className="relative z-2 w-full max-w-125"
                    src="/assets/images/illustrations/chat.webp"
                    alt="chat-img"
                  />
                </div>
                <h4 className="mt-12 font-bold text-white">"{t('auth.login.motivation.h4')}"</h4>
                <p className="text-white">{t('auth.login.motivation.p')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ResetPasswordPage
