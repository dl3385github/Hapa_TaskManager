import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="mb-4">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Go to Dashboard
      </Link>
    </div>
  )
}

export default NotFoundPage 