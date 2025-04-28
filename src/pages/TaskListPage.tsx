import React from 'react'
import TaskList from '@components/Task/TaskList'

const TaskListPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Tasks (Approved)</h1>
      <p className="mb-4">Showing tasks that have been approved and are ready to be worked on.</p>
      <TaskList filter="approved" />
    </div>
  )
}

export default TaskListPage 