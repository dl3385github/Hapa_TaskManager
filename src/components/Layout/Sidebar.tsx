import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  FiHome, 
  FiCheckSquare, 
  FiPlus, 
  FiUsers, 
  FiClock, 
  FiStar 
} from 'react-icons/fi'

const Sidebar = () => {
  return (
    <aside className="w-64 hidden md:block bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <div className="px-4 py-6">
        <nav className="space-y-1">
          <NavItem to="/" icon={<FiHome />} label="Dashboard" />
          <NavItem to="/tasks" icon={<FiCheckSquare />} label="My Tasks" />
          <NavItem to="/tasks/create" icon={<FiPlus />} label="Create Task (Sim)" />
          <NavItem to="/pending" icon={<FiClock />} label="Pending Invitations" />
          <NavItem to="/completed" icon={<FiStar />} label="Completed Tasks" />
        </nav>
        
        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            My Consuls
          </h3>
          <div className="mt-2 space-y-1">
            <ConsulItem id="consul-1" name="Product Team" />
            <ConsulItem id="consul-2" name="Design Team" />
            <ConsulItem id="consul-3" name="Marketing Team" />
          </div>
        </div>
      </div>
    </aside>
  )
}

interface NavItemProps {
  to: string
  icon: React.ReactNode
  label: string
}

const NavItem = ({ to, icon, label }: NavItemProps) => {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) => 
        `group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
          isActive 
            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
            : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
        }`
      }
    >
      <span className="mr-3 h-5 w-5">{icon}</span>
      {label}
    </NavLink>
  )
}

interface ConsulItemProps {
  id: string
  name: string
}

const ConsulItem = ({ id, name }: ConsulItemProps) => {
  return (
    <NavLink 
      to={`/consuls/${id}`}
      className={({ isActive }) => 
        `group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
          isActive 
            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
            : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
        }`
      }
    >
      <span className="mr-3 h-5 w-5">
        <FiUsers />
      </span>
      {name}
    </NavLink>
  )
}

export default Sidebar 