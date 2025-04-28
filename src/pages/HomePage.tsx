import React from 'react'
import TaskList from '@components/Task/TaskList'

const HomePage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard - All Tasks</h1>
      <p className="mb-4">Showing all tasks regardless of status.</p>
      <TaskList filter="all" />
    </div>
  )
}

export default HomePage 