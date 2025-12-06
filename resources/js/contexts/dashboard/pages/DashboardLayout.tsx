import { useAuthStore } from '@/contexts/auth/stores/authStore'
import { AnalyticsTracker } from '@/contexts/shared/components/AnalyticsTracker'

type Props = {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  const { user } = useAuthStore()
  const bgImage = `${import.meta.env.VITE_APP_URL}/assets/images/illustrations/curved.webp`

  return (
    <main>
      <AnalyticsTracker />
      <div
        className="relative flex min-h-75 items-center overflow-hidden rounded-2xl bg-cover bg-center p-0"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <span className="absolute inset-y-0 h-full w-full bg-gradient-to-tl from-purple-700 to-pink-500 bg-cover bg-center opacity-60"></span>
      </div>

      <div className="shadow-blur relative mx-6 -mt-16 flex min-w-0 flex-auto flex-col overflow-hidden rounded-2xl border-0 bg-white/80 bg-clip-border p-4 break-words backdrop-blur-2xl backdrop-saturate-200">
        <div className="-mx-3 flex flex-wrap">
          <div className="w-auto max-w-full flex-none px-3">
            <div className="ease-soft-in-out relative inline-flex h-19 w-19 items-center justify-center rounded-xl text-base text-white transition-all duration-200">
              <span className="shadow-soft-sm bg-opacity-75 flex h-19 w-19 w-full items-center justify-center rounded-xl bg-white text-4xl font-bold text-gray-900 uppercase">
                {user?.name.slice(0, 2)}
              </span>
            </div>
          </div>
          <div className="my-auto w-auto max-w-full flex-none px-3">
            <div className="h-full">
              <h5 className="mb-1">{user?.name}</h5>
              <p className="mb-0 text-sm leading-normal font-semibold">{user?.email}</p>
            </div>
          </div>
          <div className="mx-auto mt-4 w-full max-w-full px-3 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12">
            <div className="relative right-0">
              {/* <ul className="relative flex flex-wrap p-1 list-none bg-transparent rounded-xl" nav-pills="" role="list">
                  <li className="z-30 flex-auto text-center">
                    <a className="z-30 block w-full px-0 py-1 mb-0 transition-all border-0 rounded-lg ease-soft-in-out bg-inherit text-slate-700" nav-link="" href="javascript:;" role="tab" aria-selected="true">
                      <figure></figure>
                      <span className="ml-1">App</span>
                    </a>
                  </li>
                  <li className="z-30 flex-auto text-center">
                    <a className="z-30 block w-full px-0 py-1 mb-0 transition-all border-0 rounded-lg ease-soft-in-out bg-inherit text-slate-700" nav-link="" href="javascript:;" role="tab" aria-selected="false">
                      <figure></figure>
                      <span className="ml-1">Messages</span>
                    </a>
                  </li>
                  <li className="z-30 flex-auto text-center">
                    <a className="z-30 block w-full px-0 py-1 mb-0 transition-colors border-0 rounded-lg ease-soft-in-out bg-inherit text-slate-700" nav-link="" href="javascript:;" role="tab" aria-selected="false">
                      <figure></figure>
                      <span className="ml-1">Settings</span>
                    </a>
                  </li>
                </ul> */}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">{children}</div>
    </main>
  )
}

export default DashboardLayout
