import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState('student')
  const [err, setErr] = useState(null)
  const { register } = useAuth()
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setErr(null)
    try {
      await register({ email, password, fullName }, role)
      nav('/')
    } catch (e) {
      setErr(e.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Register</h2>
      {err && <div className="p-2 bg-red-100 text-red-700 mb-3">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Full name" className="w-full p-2 border rounded"/>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded"/>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded"/>
        <select value={role} onChange={e=>setRole(e.target.value)} className="w-full p-2 border rounded">
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>
        <button className="w-full bg-green-600 text-white p-2 rounded">Register</button>
      </form>
    </div>
  )
}
