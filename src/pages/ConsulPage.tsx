import React from 'react'
import { useParams } from 'react-router-dom'
import TaskList from '@components/Task/TaskList'

const ConsulPage = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Consul Details: {id}</h1>
      <p className="mb-4">Displaying tasks for Consul ID: {id}</p>
      {/* Display consul members and other info here later */}
      <TaskList consulId={id} />
    </div>
  )
}

export default ConsulPage 