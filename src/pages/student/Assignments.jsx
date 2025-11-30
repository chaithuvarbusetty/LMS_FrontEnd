import React, { useEffect, useState } from 'react'
import api from '../../api/axiosClient'
import { Link } from 'react-router-dom'

export default function StudentAssignments(){
  const [assignments, setAssignments] = useState([])
  useEffect(()=>{
    api.get('/api/assignments/mine') // optional endpoint
      .then(r=>setAssignments(r.data))
      .catch(()=>setAssignments([]))
  },[])
  return (
    <div>
      <h2 className="text-2xl mb-4">Assignments</h2>
      {assignments.length === 0 && <div>No assignments</div>}
      {assignments.map(a=>(
        <div key={a.id} className="bg-white p-3 rounded shadow mb-2 flex justify-between items-center">
          <div>
            <div className="font-bold">{a.title}</div>
            <div className="text-sm">{a.description}</div>
          </div>
          <Link to={`/student/assignments/${a.id}/submit`} className="px-3 py-1 border rounded">Submit</Link>
        </div>
      ))}
    </div>
  )
}
