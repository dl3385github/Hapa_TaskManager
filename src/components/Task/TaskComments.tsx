import React, { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Comment } from '@/types/task'
import { addCommentToTask } from '@/services/taskService'
import { formatDistanceToNow } from 'date-fns'
import { FiSend, FiUser } from 'react-icons/fi'

interface TaskCommentsProps {
  taskId: string
  initialComments?: Comment[] // Comments can be loaded initially
}

// Validation schema for comment form
const commentSchema = z.object({
  text: z.string().min(1, "Comment cannot be empty").max(500, "Comment too long")
})
type CommentFormInputs = z.infer<typeof commentSchema>

const TaskComments = ({ taskId, initialComments = [] }: TaskCommentsProps) => {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // In a real app, you might load comments dynamically
  // useEffect(() => { ... fetch comments ... }, [taskId])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CommentFormInputs>({
    resolver: zodResolver(commentSchema)
  })

  const onSubmit: SubmitHandler<CommentFormInputs> = async (data) => {
    try {
      setLoading(true)
      setError(null)
      // Replace with actual user ID/DID logic
      const userId = 'did:user:placeholder' 
      const updatedTask = await addCommentToTask(taskId, { ...data, userId })
      if (updatedTask) {
        setComments(updatedTask.comments) // Update comments list from the returned task
        reset() // Clear the form
      } else {
        setError("Failed to add comment: Task not found.")
      }
    } catch (err) {
      console.error("Failed to add comment:", err)
      setError(err instanceof Error ? err.message : "Failed to add comment.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg mt-6">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Comments</h3>
        
        {/* Existing Comments */}
        <div className="space-y-4 mb-6">
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <FiUser className="h-8 w-8 text-gray-400" /> {/* Placeholder Icon */}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{comment.userId}</div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{comment.text}</p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No comments yet.</p>
          )}
        </div>

        {/* New Comment Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <FiUser className="h-8 w-8 text-gray-400" /> {/* Placeholder Icon for current user */}
            </div>
            <div className="flex-1 min-w-0">
              <textarea
                {...register('text')}
                rows={3}
                placeholder="Add a comment..."
                className={`form-textarea block w-full form-input ${errors.text ? 'border-red-500' : ''}`}
              />
              {errors.text && <p className="mt-1 text-sm text-red-500">{errors.text.message}</p>}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-end">
            {error && <p className="text-sm text-red-500 mr-4">Error: {error}</p>}
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="btn btn-primary btn-sm inline-flex items-center disabled:opacity-50"
            >
              <FiSend className="-ml-1 mr-2 h-4 w-4" />
              {isSubmitting || loading ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default TaskComments 