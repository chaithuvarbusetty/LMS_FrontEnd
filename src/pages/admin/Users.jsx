import React, { useEffect, useState } from 'react'
import api from '../../api/axiosClient'

export default function AdminUsers(){
  const [students, setStudents] = useState([])
  const [instructors, setInstructors] = useState([])

  useEffect(()=> {
    api.get('/api/auth/students').then(r=>setStudents(r.data)).catch(()=>{})
    api.get('/api/auth/instructors').then(r=>setInstructors(r.data)).catch(()=>{})
  },[])

  return (
    <div>
      <h2 className="text-2xl mb-4">Users</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-bold mb-2">Students</h3>
          {students.map(s=> <div key={s.id} className="p-2 bg-white rounded shadow mb-2">{s.fullName || s.email}</div>)}
        </div>
        <div>
          <h3 className="font-bold mb-2">Instructors</h3>
          {instructors.map(i=> <div key={i.id} className="p-2 bg-white rounded shadow mb-2">{i.fullName || i.email}</div>)}
        </div>
      </div>
    </div>
  )
}
