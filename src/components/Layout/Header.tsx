import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiBell, FiUser, FiMoon, FiSun } from 'react-icons/fi'

const Header = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    // In a real implementation, this would toggle a class on the document or use a theme context
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
                Hapa Task Manager
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>
            <button className="ml-4 p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <FiBell className="h-5 w-5" />
            </button>
            <div className="ml-4 relative">
              <button className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <FiUser className="h-5 w-5" />
              </button>
            </div>
            <button className="md:hidden ml-4 p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <FiMenu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 