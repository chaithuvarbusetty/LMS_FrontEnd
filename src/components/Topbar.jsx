import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Topbar(){
  const { user } = useAuth()
  return (
    <header className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <div className="font-bold text-lg">LMS Portal</div>
      <div>{user ? user.email : 'Not logged in'}</div>
        <div>{user ? "Log Out" : "Log In"}</div>
    </header>
  )
}
