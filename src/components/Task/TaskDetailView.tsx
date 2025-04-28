import React from 'react'
import { Task } from '@/types/task'
import { format } from 'date-fns'
import { FiCalendar, FiUser, FiUsers, FiTag, FiHash, FiClock } from 'react-icons/fi'
import { getStatusBadgeColor, getPriorityLabel } from '@/utils/taskUtils'

interface TaskDetailViewProps {
  task: Task
}

const TaskDetailView = ({ task }: TaskDetailViewProps) => {
  const statusColor = getStatusBadgeColor(task.status)
  const priorityLabel = getPriorityLabel(task.priority)

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        {/* Title and Status */}
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{task.title}</h1>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
            {task.status.replace('-', ' ')}
          </span>
        </div>

        {/* Description */}
        {task.description && (
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">Description</h2>
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{task.description}</p>
          </div>
        )}

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <FiHash className="mr-2 h-4 w-4" />
            <span>ID: {task.id}</span>
          </div>
          <div className="flex items-center">
            <FiUser className="mr-2 h-4 w-4" />
            <span>Created By: {task.createdBy}</span>
          </div>
          <div className="flex items-center">
            <FiUsers className="mr-2 h-4 w-4" />
            <span>Assignee: {task.assignedTo || 'None'}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">👑</span> {/* Placeholder for Priority */}
            <span>Priority: {priorityLabel}</span>
          </div>
          <div className="flex items-center">
            <FiUsers className="mr-2 h-4 w-4" />
            <span>Consul: {task.consulId}</span>
          </div>
          <div className="flex items-center">
            <FiCalendar className="mr-2 h-4 w-4" />
            <span>Created: {format(new Date(task.createdAt), 'PPP p')}</span>
          </div>
          <div className="flex items-center">
            <FiClock className="mr-2 h-4 w-4" />
            <span>Updated: {format(new Date(task.updatedAt), 'PPP p')}</span>
          </div>
          {task.deadline && (
            <div className="flex items-center">
              <FiCalendar className="mr-2 h-4 w-4 text-red-500" />
              <span className="text-red-600 dark:text-red-400">Deadline: {format(new Date(task.deadline), 'PPP')}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {task.tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Voting Section (Simplified) - REMOVED as voting happens externally */}
        {/* 
        {task.status === 'pending' && task.votes && (
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Voting</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Votes: {task.votes.filter(v => v.isApproved).length} Approve / {task.votes.filter(v => !v.isApproved).length} Reject
            </p>
          </div>
        )}
        */}
      </div>
    </div>
  )
}

export default TaskDetailView 