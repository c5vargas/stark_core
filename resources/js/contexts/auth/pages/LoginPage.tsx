import { useTranslation } from "react-i18next";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const { t } = useTranslation();
  const {email, password, errorMessage, loading, setEmail, setPassword, handleLogin} = useLogin();

  return (
    <main className="mt-0 transition-all duration-200 ease-soft-in-out ps">
      <div className="relative flex items-center min-h-screen p-0 overflow-hidden bg-center bg-cover">
        <div className="container z-1">
          <div className="flex flex-wrap -mx-3">
            <div className="flex flex-col w-full max-w-full px-3 mx-auto lg:mx-0 shrink-0 md:flex-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
              <div className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none lg:py4 rounded-2xl bg-clip-border">

                <div className="p-6 pb-0 mb-0">
                  <h4 className="font-bold leading-5">{t('auth.login.h4')}</h4>
                  <p className="mb-0">{t('auth.login.p')}</p>
                </div>
                
                <div className="flex-auto p-6">
                  <form role="form" onSubmit={handleLogin}>
                    <div className="mb-4">
                      <input value={email} onChange={(e) => setEmail(e.currentTarget.value)} type="email" placeholder={t('auth.login.email')} className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" />
                    </div>
                    <div className="mb-1">
                      <input value={password} onChange={(e) => setPassword(e.currentTarget.value)} type="password" placeholder={t('auth.login.password')} className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" />
                    </div>
                    
                    <span className={`${errorMessage ? 'opacity-100' : 'opacity-0'} duration-500 text-red-600 text-sm`}>{errorMessage}</span>

                    <div className="text-center">
                      <button 
                        type="submit" 
                        className={`w-full px-6 py-4 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:opacity-85 hover:shadow-soft-xs'} bg-gradient-to-tl from-purple-700 to-pink-500 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25`} 
                        disabled={loading}>
                        <span>{loading ? t('shared.loading') : t('auth.login.submit')}</span>
                      </button>
                    </div>
                    
                  </form>

                </div>
              </div>
            </div>

            <div className="absolute top-0 right-0 flex-col justify-center hidden w-6/12 h-full max-w-full px-3 pr-0 my-auto text-center flex-0 lg:flex">
              <div className="relative flex flex-col justify-center h-full px-24 m-4 bg-gradient-to-tl from-purple-700 to-pink-500 rounded-xl">
                <img className="absolute left-0 opacity-40" src="/assets/images/shapes/pattern-lines.svg" alt="pattern-lines" />
                  <div className="relative">
                    <img className="relative w-full max-w-125 z-2" src="/assets/images/illustrations/chat.webp" alt="chat-img" />
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

export default LoginPage