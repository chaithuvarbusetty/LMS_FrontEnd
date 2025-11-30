import React, { useEffect, useState } from 'react'
import api from '../../api/axiosClient'

export default function MyEnrollments(){
  const [enrolls, setEnrolls] = useState([])
  useEffect(()=>{
    api.get('/api/enroll/me').then(r=>setEnrolls(r.data)).catch(()=>{})
  },[])
  return (
    <div>
      <h2 className="text-2xl mb-4">My Enrollments</h2>
      <div className="space-y-2">
        {enrolls.map(e=>(
          <div key={e.id} className="bg-white p-3 rounded shadow">
            <div className="font-bold">{e.course?.title}</div>
            <div className="text-sm">{e.course?.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
