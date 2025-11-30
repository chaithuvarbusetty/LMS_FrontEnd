import React, { useEffect, useState } from 'react'
import api from '../../api/axiosClient'

export default function AdminFiles(){
  const [files, setFiles] = useState([])
  useEffect(()=> {
    api.get('/api/files').then(r=>setFiles(r.data)).catch(()=>{})
  },[])
  return (
    <div>
      <h2 className="text-2xl mb-4">All Files</h2>
      <div className="space-y-2">
        {files.map(f=> <div key={f} className="bg-white p-2 rounded shadow">{f}</div>)}
      </div>
    </div>
  )
}
