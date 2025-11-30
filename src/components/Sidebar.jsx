import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Item({ to, children }) {
  return <NavLink to={to} className={({isActive}) => (isActive ? 'block p-3 bg-blue-100 rounded' : 'block p-3 hover:bg-gray-100 rounded')}>{children}</NavLink>
}

export default function Sidebar(){
  const { user } = useAuth()
  const roles = user?.roles || []

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <div className="mb-6 text-xl font-bold">LMS</div>

      <nav className="space-y-1">
        <Item to="/">Dashboard</Item>
        <Item to="/courses">Courses</Item>

        {roles.includes('ROLE_INSTRUCTOR') && (
          <>
            <div className="mt-4 font-semibold text-sm">Instructor</div>
            <Item to="/instructor/courses">My Courses</Item>
            <Item to="/instructor/create-course">Create Course</Item>
            <Item to="/instructor/assignments">Assignments</Item>
          </>
        )}

        {roles.includes('ROLE_STUDENT') && (
          <>
            <div className="mt-4 font-semibold text-sm">Student</div>
            <Item to="/student/my-courses">My Enrollments</Item>
            <Item to="/student/assignments">Assignments</Item>
          </>
        )}

        {roles.includes('ROLE_ADMIN') && (
          <>
            <div className="mt-4 font-semibold text-sm">Admin</div>
            <Item to="/admin/users">Manage Users</Item>
            <Item to="/admin/files">All Files</Item>
          </>
        )}
      </nav>
    </aside>
  )
}
