import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Task } from '@/types/task'
import { getTaskById } from '@/services/taskService'
import TaskComments from '@components/Task/TaskComments'
import TaskDetailView from '@components/Task/TaskDetailView'

const TaskDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      const loadTask = async () => {
        try {
          setLoading(true)
          const fetchedTask = await getTaskById(id)
          setTask(fetchedTask)
          setError(null)
        } catch (err) { // Catch specific errors if possible
          console.error("Failed to load task:", err)
          setError(err instanceof Error ? err.message : "Failed to load task details.")
        } finally {
          setLoading(false)
        }
      }
      loadTask()
    } else {
      setError("Task ID is missing.")
      setLoading(false)
    }
  }, [id])

  if (loading) {
    return <div>Loading task details...</div>
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  if (!task) {
    return <div>Task not found.</div>
  }

  return (
    <div>
      <TaskDetailView task={task} />
      <div className="mt-8">
        <TaskComments taskId={task.id} />
      </div>
    </div>
  )
}

export default TaskDetailPage 