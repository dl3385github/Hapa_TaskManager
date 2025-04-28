import React, { useState, useEffect, useCallback } from 'react'
import TaskItem from './TaskItem'
import { TaskStatus, TaskPriority, TaskSummary } from '@/types/task'
import { getTasks, updateTaskStatus } from '@/services/taskService'

// This would typically come from an API
const mockTasks = [
  {
    id: '1',
    title: 'Implement task list view',
    status: 'approved' as TaskStatus,
    createdAt: '2025-01-01T00:00:00Z',
    priority: 'high',
    consulId: 'consul-1',
    creatorDID: 'did:example:123',
    assigneeDIDs: ['did:example:456']
  },
  {
    id: '2',
    title: 'Design user dashboard',
    status: 'pending' as TaskStatus,
    createdAt: '2025-01-02T00:00:00Z',
    priority: 'medium',
    consulId: 'consul-1',
    creatorDID: 'did:example:789',
    assigneeDIDs: []
  },
  {
    id: '3',
    title: 'Add comment functionality',
    status: 'in-progress' as TaskStatus,
    createdAt: '2025-01-03T00:00:00Z',
    priority: 'high',
    consulId: 'consul-2',
    creatorDID: 'did:example:123',
    assigneeDIDs: ['did:example:456', 'did:example:789']
  }
]

interface TaskListProps {
  filter?: TaskStatus | 'all' | 'pending-invitation'
  consulId?: string
}

const TaskList = ({ filter = 'all', consulId }: TaskListProps) => {
  const [tasks, setTasks] = useState<TaskSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true)
      const fetchedTasks = await getTasks()
      
      let filteredTasks = fetchedTasks
      if (filter && filter !== 'all') {
        const statusFilter = filter === 'pending-invitation' ? 'pending' : filter
        filteredTasks = fetchedTasks.filter(task => task.status === statusFilter)
      }
      
      if (consulId) {
        filteredTasks = filteredTasks.filter(task => task.consulId === consulId)
      }
      
      setTasks(filteredTasks)
      setError(null)
    } catch (err) {
      console.error("Failed to load tasks:", err)
      setError("Failed to load tasks.")
    } finally {
      setLoading(false)
    }
  }, [filter, consulId])

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  const handleAcceptTask = useCallback(async (taskId: string) => {
    try {
      const updatedTask = await updateTaskStatus(taskId, 'approved')
      if (updatedTask) {
        loadTasks()
      } else {
        setError(`Failed to accept task ${taskId}.`)
      }
    } catch (err) {
      console.error(`Failed to accept task ${taskId}:`, err)
      setError(err instanceof Error ? err.message : `Failed to accept task ${taskId}.`)
    }
  }, [loadTasks])

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return <p className="text-red-500 text-center p-4">Error: {error}</p>
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="mt-4 space-y-3">
          {tasks.length > 0 ? (
            tasks.map(task => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onAcceptTask={task.status === 'pending' ? handleAcceptTask : undefined} 
              />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No tasks found matching this criteria.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskList 