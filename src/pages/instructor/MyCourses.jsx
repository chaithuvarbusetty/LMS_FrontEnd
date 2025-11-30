import React, { useEffect, useState } from 'react'
import api from '../../api/axiosClient'
import { Link } from 'react-router-dom'

export default function MyCourses(){
  const [courses, setCourses] = useState([])
  useEffect(()=> {
    api.get('/api/courses').then(r=> {
      // filter by instructor on backend ideally; here we show all and instructor can edit their own
      setCourses(r.data || [])
    }).catch(()=>{})
  },[])
  return (
    <div>
      <h2 className="text-2xl mb-4">My Courses</h2>
      <div className="space-y-3">
        {courses.map(c=>(
          <div key={c.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
            <div>
              <div className="font-bold">{c.title}</div>
              <div className="text-sm text-gray-600">{c.description}</div>
            </div>
            <div className="flex gap-2">
              <Link to={`/courses/${c.id}`} className="px-3 py-1 border rounded">View</Link>
              <Link to={`/instructor/assignments`} className="px-3 py-1 border rounded">Assignments</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
