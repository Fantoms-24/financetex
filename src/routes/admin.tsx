import * as React from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  component: AdminRedirect,
})

function AdminRedirect() {
  const navigate = useNavigate()
  React.useEffect(() => {
    navigate({ to: '/fantms', replace: true })
  }, [navigate])

  return null
}
