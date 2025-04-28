import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Task, TaskPriority, TaskStatus } from '@/types/task'
import { createTask } from '@/services/taskService'
import { useNavigate } from 'react-router-dom'

// Validation schema using Zod - Updated for simulation
const taskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title cannot exceed 100 characters'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  consulId: z.string().min(1, 'Simulated Consul ID is required'), 
  createdBy: z.string().min(1, 'Simulated Creator DID is required'), 
  assignedTo: z.string().optional(),
  deadline: z.string().optional(), 
  tags: z.string().optional(),
  // Simulate vote results - just indicating approval for simplicity
  simulatedApproved: z.boolean().default(true)
})

type TaskFormInputs = z.infer<typeof taskSchema>

const TaskForm = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TaskFormInputs>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      priority: 'medium',
      consulId: 'consul-simulated-1', // Example simulated ID
      createdBy: 'did:simulated:creator', // Example simulated DID
      simulatedApproved: true
    }
  })

  const onSubmit: SubmitHandler<TaskFormInputs> = async (data) => {
    console.log("Simulating approved task creation with data:", data)
    try {
      // Prepare data for the createTask service
      // Note: votes and comments are empty as this simulates an approved task arriving
      const taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'votes' | 'comments'> = {
        title: data.title,
        description: data.description || '',
        priority: data.priority as TaskPriority,
        createdBy: data.createdBy,
        consulId: data.consulId,
        assignedTo: data.assignedTo || undefined,
        deadline: data.deadline ? new Date(data.deadline).getTime() : undefined,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
        attachments: [], // Initialize empty
      }

      // Use the service to create the task (which now sets status based on simulated vote)
      const newTask = await createTask(taskData, data.simulatedApproved ? 'approved' : 'rejected')
      
      console.log('Simulated task created:', newTask)
      reset() 
      navigate(`/tasks/${newTask.id}`) 
    } catch (error) { 
      console.error('Failed to simulate task creation:', error)
      // TODO: Add user-friendly error display
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded-lg bg-white dark:bg-gray-800">
      {/* Form explanation */}
      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-md text-sm text-blue-700 dark:text-blue-300">
        <strong>Note:</strong> This form simulates the arrival of an already voted-on task into the Task Manager. In the real Hapa system, tasks are created externally after a Consul vote.
      </div>
      
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className={`mt-1 block w-full form-input ${errors.title ? 'border-red-500' : ''}`}
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
        <textarea
          id="description"
          {...register('description')}
          rows={3}
          className="mt-1 block w-full form-input"
        />
      </div>

      {/* Priority */}
      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
        <select
          id="priority"
          {...register('priority')}
          className="mt-1 block w-full form-input"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Simulated Consul ID */}
       <div>
        <label htmlFor="consulId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Simulated Consul ID</label>
        <input
          id="consulId"
          type="text"
          {...register('consulId')}
          className={`mt-1 block w-full form-input ${errors.consulId ? 'border-red-500' : ''}`}
        />
        {errors.consulId && <p className="mt-1 text-sm text-red-500">{errors.consulId.message}</p>}
      </div>
      
      {/* Simulated Creator DID */}
      <div>
        <label htmlFor="createdBy" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Simulated Creator DID</label>
        <input
          id="createdBy"
          type="text"
          {...register('createdBy')}
          className={`mt-1 block w-full form-input ${errors.createdBy ? 'border-red-500' : ''}`}
        />
        {errors.createdBy && <p className="mt-1 text-sm text-red-500">{errors.createdBy.message}</p>}
      </div>

      {/* Assignee */}
      <div>
        <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Assign To (DID - Optional)</label>
        <input
          id="assignedTo"
          type="text"
          {...register('assignedTo')}
          className="mt-1 block w-full form-input"
        />
      </div>

      {/* Deadline */}
      <div>
        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Deadline (Optional)</label>
        <input
          id="deadline"
          type="date"
          {...register('deadline')}
          className="mt-1 block w-full form-input"
        />
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (Comma-separated - Optional)</label>
        <input
          id="tags"
          type="text"
          {...register('tags')}
          className="mt-1 block w-full form-input"
        />
      </div>
      
      {/* Simulated Approval Checkbox */}
      <div className="flex items-center">
         <input
            id="simulatedApproved"
            type="checkbox"
            {...register('simulatedApproved')}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="simulatedApproved" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Simulate as Approved Task</label>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary disabled:opacity-50"
        >
          {isSubmitting ? 'Creating...' : 'Create Simulated Task'}
        </button>
      </div>
    </form>
  )
}

export default TaskForm 