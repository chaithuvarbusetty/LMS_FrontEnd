import React, { useState } from 'react'
import api from '../../api/axiosClient'
import { useNavigate } from 'react-router-dom'

export default function CreateCourse(){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    await api.post('/api/courses', { title, description })
    nav('/instructor/courses')
  }

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">Create Course</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
        <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="w-full p-2 border rounded" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
      </form>
    </div>
  )
}
