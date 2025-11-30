import React, { useState } from 'react'
import api from '../../api/axiosClient'
import { useParams } from 'react-router-dom'

export default function SubmitAssignment(){
  const { id } = useParams()
  const [file, setFile] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    if (!file) return alert('Choose file')
    const fd = new FormData()
    fd.append('file', file)
    const up = await api.post('/api/files/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' }})
    const fileUrl = up.data
    await api.post('/api/assignments/' + id + '/submit', { fileUrl })
    alert('Submitted')
  }

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">Submit Assignment</h2>
      <form onSubmit={submit} className="space-y-3">
        <input type="file" onChange={e=>setFile(e.target.files[0])} />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
      </form>
    </div>
  )
}
