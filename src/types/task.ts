export type TaskStatus = 'pending' | 'approved' | 'in-progress' | 'completed' | 'rejected'
export type TaskPriority = 'low' | 'medium' | 'high'
export type VoteStatus = 'approve' | 'reject' | null

export interface Vote {
  userId: string
  isApproved: boolean
  timestamp: number
  comment?: string
}

export interface Comment {
  id: string
  userId: string
  text: string
  timestamp: number
}

export interface TaskMetadata {
  priority: TaskPriority
  dueDate?: string
  tags?: string[]
  μCreditAllocation?: number
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  createdBy: string
  assignedTo?: string
  deadline?: number
  tags: string[]
  attachments?: string[]
  votes: Vote[]
  comments: Comment[]
  createdAt: number
  updatedAt: number
  consulId: string
}

export interface TaskSummary {
  id: string
  title: string
  status: TaskStatus
  createdAt: string
  priority: TaskPriority
  consulId: string
  creatorDID: string
  assigneeDIDs: string[]
} 