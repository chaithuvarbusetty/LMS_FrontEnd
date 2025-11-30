import React, { useEffect, useState } from 'react'
import api from '../../api/axiosClient'
import { Link } from 'react-router-dom'

export default function InstructorAssignments(){
  const [assignments, setAssignments] = useState([])
  useEffect(()=>{
    api.get('/api/assignments') // optional endpoint; fallback we'll show empty
      .then(r=>setAssignments(r.data))
      .catch(()=>setAssignments([]))
  },[])
  return (
    <div>
      <h2 className="text-2xl mb-4">Assignments</h2>
      <div className="space-y-2">
        {assignments.length === 0 && <div>No assignments yet</div>}
        {assignments.map(a=>(
          <div key={a.id} className="bg-white p-3 rounded shadow flex justify-between">
            <div>
              <div className="font-bold">{a.title}</div>
              <div className="text-sm text-gray-600">{a.description}</div>
            </div>
            <div>
              <Link to={`/instructor/assignments/${a.id}/submissions`} className="px-3 py-1 border rounded">Submissions</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
