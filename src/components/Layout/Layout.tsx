import { ReactNode } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import MainContent from './MainContent'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex">
        <Sidebar />
        <MainContent>
          {children}
        </MainContent>
      </div>
    </div>
  )
}

export default Layout 