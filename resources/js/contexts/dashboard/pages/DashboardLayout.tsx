import { useAuthStore } from "@/contexts/auth/stores/authStore";

type Props = {
  children: React.ReactNode
}

const DashboardLayout = ({children}: Props) => {
  const {user} = useAuthStore();
  const bgImage = `${import.meta.env.VITE_APP_URL}/assets/images/illustrations/curved.webp`

  return (
    <main>
        <div className="min-h-75 relative flex items-center overflow-hidden rounded-2xl bg-cover bg-center p-0" style={{
          backgroundImage: `url(${bgImage})`
        }}>
          <span className="absolute inset-y-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-purple-700 to-pink-500 opacity-60"></span>
        </div>

        <div className="relative flex flex-col flex-auto min-w-0 p-4 mx-6 -mt-16 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
          <div className="flex flex-wrap -mx-3">
            <div className="flex-none w-auto max-w-full px-3">
              <div className="text-base ease-soft-in-out h-19 w-19 relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
                <span className="w-full h-19 w-19 shadow-soft-sm rounded-xl flex items-center justify-center uppercase font-bold text-4xl bg-white bg-opacity-75 text-gray-900">
                  {user?.name.slice(0,2)}
                </span>
              </div>
            </div>
            <div className="flex-none w-auto max-w-full px-3 my-auto">
              <div className="h-full">
                <h5 className="mb-1">{user?.name}</h5>
                <p className="mb-0 font-semibold leading-normal text-sm">{user?.email}</p>
              </div>
            </div>
            <div className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12">
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

      <div className="mt-8">
        {children}
      </div>

    </main>
  )
}

export default DashboardLayout