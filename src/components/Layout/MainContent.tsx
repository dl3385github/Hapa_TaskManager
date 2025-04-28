import { ReactNode } from 'react'

interface MainContentProps {
  children: ReactNode
}

const MainContent = ({ children }: MainContentProps) => {
  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </main>
  )
}

export default MainContent 