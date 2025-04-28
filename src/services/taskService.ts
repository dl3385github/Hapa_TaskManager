import localforage from 'localforage'
import { v4 as uuidv4 } from 'uuid'
import { Task, TaskSummary, TaskStatus, TaskPriority, Comment, Vote } from '@/types/task'

const TASK_DB_KEY = 'hapa_tasks'

localforage.config({
  name: 'HapaTaskManager',
  storeName: 'tasks',
  description: 'Storage for Hapa Task Manager tasks'
})

/**
 * Fetches all tasks and returns them as summaries.
 */
export const getTasks = async (): Promise<TaskSummary[]> => {
  const tasks = await localforage.getItem<Record<string, Task>>(TASK_DB_KEY) || {}
  return Object.values(tasks)
    .map(task => ({
      id: task.id,
      title: task.title,
      status: task.status,
      createdAt: task.createdAt ? new Date(task.createdAt).toISOString() : new Date().toISOString(), // Ensure createdAt is a string
      priority: task.priority,
      consulId: task.consulId,
      creatorDID: task.createdBy, // Map createdBy to creatorDID for summary
      assigneeDIDs: task.assignedTo ? [task.assignedTo] : [] // Map assignedTo to assigneeDIDs
    }))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Sort by newest first
}

/**
 * Fetches a single task by its ID.
 */
export const getTaskById = async (id: string): Promise<Task | null> => {
  const tasks = await localforage.getItem<Record<string, Task>>(TASK_DB_KEY) || {}
  const task = tasks[id]
  return task ? task : null;
}

/**
 * Creates a new task - updated for simulation.
 * @param taskData Core task data.
 * @param simulatedStatus The status ('approved' or 'rejected') to assign based on simulation.
 */
export const createTask = async (
  taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'votes' | 'comments'>, 
  simulatedStatus: TaskStatus = 'approved' // Default to approved if not specified
): Promise<Task> => {
  const tasks = await localforage.getItem<Record<string, Task>>(TASK_DB_KEY) || {}
  const newTask: Task = {
    ...taskData,
    id: uuidv4(),
    status: simulatedStatus, // Use the simulated status
    createdAt: Date.now(),
    updatedAt: Date.now(),
    // Votes and comments are empty for a newly arrived task
    votes: [], 
    comments: [] 
  }
  tasks[newTask.id] = newTask
  await localforage.setItem(TASK_DB_KEY, tasks)
  console.log('Saved new task to localforage:', newTask)
  return newTask
}

/**
 * Updates an existing task.
 */
export const updateTask = async (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Promise<Task | null> => {
  const tasks = await localforage.getItem<Record<string, Task>>(TASK_DB_KEY) || {}
  if (!tasks[id]) {
    return null
  }
  const updatedTask = {
    ...tasks[id],
    ...updates,
    updatedAt: Date.now()
  }
  tasks[id] = updatedTask
  await localforage.setItem(TASK_DB_KEY, tasks)
  return updatedTask
}

/**
 * Adds a comment to a task.
 */
export const addCommentToTask = async (taskId: string, commentData: Omit<Comment, 'id' | 'timestamp'>): Promise<Task | null> => {
  const tasks = await localforage.getItem<Record<string, Task>>(TASK_DB_KEY) || {}
  if (!tasks[taskId]) {
    return null
  }
  const newComment: Comment = {
    ...commentData,
    id: uuidv4(),
    timestamp: Date.now()
  }
  tasks[taskId].comments = [...(tasks[taskId].comments || []), newComment]
  tasks[taskId].updatedAt = Date.now()
  await localforage.setItem(TASK_DB_KEY, tasks)
  return tasks[taskId]
}

/**
 * Adds a vote to a task and updates status if needed.
 */
export const voteOnTask = async (taskId: string, voteData: Omit<Vote, 'timestamp'>): Promise<Task | null> => {
  const tasks = await localforage.getItem<Record<string, Task>>(TASK_DB_KEY) || {}
  if (!tasks[taskId] || tasks[taskId].status !== 'pending') {
    return null // Can only vote on pending tasks
  }
  
  const newVote: Vote = {
    ...voteData,
    timestamp: Date.now()
  }
  
  // Replace existing vote from the same user
  const existingVotes = tasks[taskId].votes || []
  const otherVotes = existingVotes.filter(v => v.userId !== voteData.userId)
  const updatedVotes = [...otherVotes, newVote]
  tasks[taskId].votes = updatedVotes
  
  // Check if voting threshold is met (assuming 3 members, need 2/3 for approval/rejection)
  const approveVotes = updatedVotes.filter(v => v.isApproved).length
  const rejectVotes = updatedVotes.filter(v => !v.isApproved).length
  const totalMembers = 3 // Hardcoded for now, should come from Consul data
  const requiredVotes = 2 // 2/3 of 3
  
  let newStatus: TaskStatus = tasks[taskId].status
  if (approveVotes >= requiredVotes) {
    newStatus = 'approved'
  } else if (rejectVotes >= requiredVotes) {
    newStatus = 'rejected'
  }
  
  tasks[taskId].status = newStatus
  tasks[taskId].updatedAt = Date.now()
  
  await localforage.setItem(TASK_DB_KEY, tasks)
  return tasks[taskId]
}

/**
 * Updates the status of a task.
 */
export const updateTaskStatus = async (id: string, newStatus: TaskStatus): Promise<Task | null> => {
  const tasks = await localforage.getItem<Record<string, Task>>(TASK_DB_KEY) || {}
  if (!tasks[id]) {
    return null
  }
  // Potentially add logic here to prevent invalid status transitions if needed
  tasks[id].status = newStatus
  tasks[id].updatedAt = Date.now()
  
  await localforage.setItem(TASK_DB_KEY, tasks)
  return tasks[id]
}

/**
 * Soft deletes a task.
 */
export const deleteTask = async (id: string): Promise<boolean> => {
  const tasks = await localforage.getItem<Record<string, Task>>(TASK_DB_KEY) || {}
  if (!tasks[id]) {
    return false
  }
  delete tasks[id]; // Hard delete for now
  await localforage.setItem(TASK_DB_KEY, tasks)
  return true
}

// Utility to seed initial data if needed
export const seedInitialTasks = async () => {
  const tasks = await localforage.getItem<Record<string, Task>>(TASK_DB_KEY)
  if (!tasks || Object.keys(tasks).length === 0) {
    console.log("Seeding initial tasks...")
    const initialTasks: Task[] = [
      {
        id: 'seed-1',
        title: 'Setup Project Environment',
        description: 'Configure Vite, TypeScript, Tailwind, and ESLint.',
        status: 'completed',
        priority: 'high',
        createdBy: 'did:example:seed',
        assignedTo: 'did:example:don',
        tags: ['setup', 'devops'],
        votes: [
          { userId: 'did:example:c1', isApproved: true, timestamp: Date.now() - 200000 },
          { userId: 'did:example:c2', isApproved: true, timestamp: Date.now() - 100000 },
        ],
        comments: [
          { id: 'c1', userId: 'did:example:don', text: 'Almost done!', timestamp: Date.now() - 50000 },
        ],
        createdAt: Date.now() - 300000,
        updatedAt: Date.now() - 50000,
        consulId: 'consul-seed'
      },
      {
        id: 'seed-2',
        title: 'Implement Task List UI',
        description: 'Build the main task list component using React.',
        status: 'approved',
        priority: 'medium',
        createdBy: 'did:example:seed',
        assignedTo: 'did:example:cascade',
        tags: ['frontend', 'ui'],
        votes: [
          { userId: 'did:example:c1', isApproved: true, timestamp: Date.now() - 150000 },
          { userId: 'did:example:c2', isApproved: true, timestamp: Date.now() - 80000 },
        ],
        comments: [],
        createdAt: Date.now() - 200000,
        updatedAt: Date.now() - 80000,
        consulId: 'consul-seed'
      },
      {
        id: 'seed-3',
        title: 'Define Core Task Schema',
        description: 'Finalize the structure for task data.',
        status: 'pending',
        priority: 'high',
        createdBy: 'did:example:don',
        tags: ['schema', 'backend'],
        votes: [],
        comments: [],
        createdAt: Date.now() - 100000,
        updatedAt: Date.now() - 100000,
        consulId: 'consul-seed'
      },
    ]
    
    const tasksMap: Record<string, Task> = {}
    initialTasks.forEach(task => {
      tasksMap[task.id] = task
    })
    await localforage.setItem(TASK_DB_KEY, tasksMap)
  }
}

// Seed data on initial load
seedInitialTasks() 