import React, { useState } from 'react'
import api from '../api/axiosClient'

export default function UploadFile(){
  const [file, setFile] = useState(null)
  const [msg, setMsg] = useState('')

  const upload = async (e) => {
    e.preventDefault()
    if (!file) return alert('Choose file')
    const fd = new FormData()
    fd.append('file', file)
    const res = await api.post('/api/files/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' }})
    setMsg('Uploaded: ' + res.data)
  }

  return (
    <div className="max-w-lg bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">Upload File</h2>
      <form onSubmit={upload} className="space-y-3">
        <input type="file" onChange={e=>setFile(e.target.files[0])} />
        <button className="px-3 py-1 bg-green-600 text-white rounded">Upload</button>
      </form>
      {msg && <div className="mt-3 text-green-700">{msg}</div>}
    </div>
  )
}
