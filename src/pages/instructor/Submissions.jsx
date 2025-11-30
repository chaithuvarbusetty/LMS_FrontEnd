import React, { useEffect, useState } from 'react'
import api from '../../api/axiosClient'
import { useParams } from 'react-router-dom'

export default function Submissions(){
  const { id } = useParams()
  const [subs, setSubs] = useState([])
  useEffect(()=> {
    if (!id) return
    api.get('/api/assignments/' + id + '/submissions').then(r=>setSubs(r.data)).catch(()=>{})
  },[id])
  return (
    <div>
      <h2 className="text-2xl mb-4">Submissions</h2>
      {subs.map(s=>(
        <div key={s.id} className="bg-white p-3 rounded shadow mb-2">
          <div><strong>{s.student?.fullName || s.student?.email}</strong></div>
          <div>File: {s.fileUrl || s.fileName || '—'}</div>
          <div>Grade: {s.grade || 'Not graded'}</div>
          <div className="mt-2">
            <button onClick={()=> {
              const g = prompt('Grade (0-100):')
              api.post('/api/assignments/submission/' + s.id + '/grade?grade=' + g)
                .then(()=> alert('Graded')).catch(()=> alert('Failed'))
            }} className="px-3 py-1 bg-green-600 text-white rounded">Grade</button>
          </div>
        </div>
      ))}
    </div>
  )
}
