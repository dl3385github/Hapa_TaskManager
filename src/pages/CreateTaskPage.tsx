import React from 'react'
import TaskForm from '@components/Task/TaskForm'

const CreateTaskPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create New Task</h1>
      <TaskForm />
    </div>
  )
}

export default CreateTaskPage 