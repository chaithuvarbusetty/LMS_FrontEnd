import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(null)
  const { login } = useAuth()
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setErr(null)
    try {
      await login({ email, password })
      nav('/')
    } catch (e) {
      setErr(e.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      {err && <div className="p-2 bg-red-100 text-red-700 mb-3">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded"/>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded"/>
        <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  )
}
