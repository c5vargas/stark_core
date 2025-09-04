import Sidebar from "@/contexts/shared/components/Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";

interface LayoutProps {
  pageTitle: string,
  children: React.ReactElement[] | React.ReactElement
}

const Layout = ({pageTitle, children}: LayoutProps) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  return (
    <>
      <Sidebar showSidebar={showSidebar} />
      <main className={`relative h-full max-h-screen transition-all duration-200 ease-soft-in-out ${showSidebar && 'xl:ml-68'} rounded-xl ps ps--active-y`}>
        <Navbar pageTitle={pageTitle} onHandleSidebar={() => setShowSidebar(prev => !prev)} />
        <div className="w-full p-6 mx-auto">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;