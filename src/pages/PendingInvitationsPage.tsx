import React from 'react'
import TaskList from '@components/Task/TaskList'

const PendingInvitationsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pending Task Invitations</h1>
      <p className="mb-4">These are tasks shared with you that require your acceptance.</p>
      {/* Add logic here to filter and display tasks with status 'pending' assigned to the current user */}
      <TaskList filter="pending-invitation" /> {/* Example filter prop */}
    </div>
  )
}

export default PendingInvitationsPage 