import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@components/Layout/Layout'
import HomePage from '@/pages/HomePage'
import TaskListPage from '@/pages/TaskListPage'
import TaskDetailPage from '@/pages/TaskDetailPage'
import CreateTaskPage from '@/pages/CreateTaskPage'
import ConsulPage from '@/pages/ConsulPage'
import PendingInvitationsPage from '@/pages/PendingInvitationsPage'
import CompletedTasksPage from '@/pages/CompletedTasksPage'
import NotFoundPage from '@/pages/NotFoundPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<TaskListPage />} />
        <Route path="/tasks/:id" element={<TaskDetailPage />} />
        <Route path="/tasks/create" element={<CreateTaskPage />} />
        <Route path="/consuls/:id" element={<ConsulPage />} />
        <Route path="/pending" element={<PendingInvitationsPage />} />
        <Route path="/completed" element={<CompletedTasksPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}

export default App 