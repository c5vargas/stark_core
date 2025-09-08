import Sidebar from '@/contexts/shared/components/Sidebar'
import Navbar from './Navbar'
import { useState } from 'react'

interface LayoutProps {
  pageTitle: string
  children: React.ReactElement[] | React.ReactElement
}

const Layout = ({ pageTitle, children }: LayoutProps) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true)

  return (
    <>
      <Sidebar showSidebar={showSidebar} />
      <main
        className={`ease-soft-in-out relative h-full max-h-screen transition-all duration-200 ${showSidebar && 'xl:ml-68'} ps ps--active-y rounded-xl`}
      >
        <Navbar pageTitle={pageTitle} onHandleSidebar={() => setShowSidebar(prev => !prev)} />
        <div className="mx-auto w-full p-6">{children}</div>
      </main>
    </>
  )
}

export default Layout
