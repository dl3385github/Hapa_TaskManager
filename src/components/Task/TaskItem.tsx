import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FiClock, FiUser, FiTag, FiCheck } from 'react-icons/fi'
import { TaskSummary, TaskStatus } from '@/types/task'
import { getStatusBadgeColor } from '@/utils/taskUtils'

interface TaskItemProps {
  task: TaskSummary
  onAcceptTask?: (taskId: string) => void
}

const TaskItem = ({ task, onAcceptTask }: TaskItemProps) => {
  const statusColor = getStatusBadgeColor(task.status)
  const formattedDate = format(new Date(task.createdAt), 'MMM d, yyyy')
  
  const handleAcceptClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onAcceptTask) {
      onAcceptTask(task.id)
    }
  }
  
  return (
    <Link 
      to={`/tasks/${task.id}`}
      className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors card-shadow"
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-lg font-medium text-gray-900 dark:text-white">
            {task.title}
          </h4>
          <div className="mt-2 flex flex-wrap gap-2 items-center">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
              {task.status.replace('-', ' ')}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
              {task.priority}
            </span>
            {task.status === 'pending' && onAcceptTask && (
              <button 
                onClick={handleAcceptClick}
                className="btn btn-xs btn-success inline-flex items-center"
              >
                <FiCheck className="mr-1 h-3 w-3" /> Accept
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <FiClock className="mr-1 h-4 w-4" />
            {formattedDate}
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
        <FiUser className="mr-1 h-4 w-4" />
        <span className="mr-4">Assigned: {task.assigneeDIDs.length ? task.assigneeDIDs.join(', ') : 'None'}</span>
        <FiTag className="mr-1 h-4 w-4" />
        <span>Consul: {task.consulId}</span>
      </div>
    </Link>
  )
}

export default TaskItem 