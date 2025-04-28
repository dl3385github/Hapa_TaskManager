import React from 'react'
import TaskList from '@components/Task/TaskList'

const CompletedTasksPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Completed Tasks</h1>
      <p className="mb-4">These are tasks that have been marked as completed.</p>
      <TaskList filter="completed" />
    </div>
  )
}

export default CompletedTasksPage 