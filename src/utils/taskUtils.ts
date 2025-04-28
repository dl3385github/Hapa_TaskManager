import { TaskStatus } from '@/types/task'

/**
 * Returns the appropriate Tailwind CSS class for a task status badge
 */
export const getStatusBadgeColor = (status: TaskStatus): string => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
    case 'approved':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
    case 'in-progress':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100'
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
    case 'rejected':
      return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
  }
}

/**
 * Gets the appropriate priority label with an emoji
 */
export const getPriorityLabel = (priority: string): string => {
  switch (priority) {
    case 'high':
      return '🔴 High'
    case 'medium':
      return '🟠 Medium'
    case 'low':
      return '🟢 Low'
    default:
      return '⚪ Unset'
  }
}

/**
 * Get approval status based on vote counts
 */
export const getApprovalStatus = (approveVotes: number, rejectVotes: number, totalMembers: number): string => {
  // Consul requires 2/3 majority (which in case of exactly 3 members is 2)
  const requiredApprovalVotes = Math.ceil(totalMembers * (2/3))
  
  if (approveVotes >= requiredApprovalVotes) {
    return 'approved'
  }
  
  if (rejectVotes >= requiredApprovalVotes) {
    return 'rejected'
  }
  
  return 'pending'
} 