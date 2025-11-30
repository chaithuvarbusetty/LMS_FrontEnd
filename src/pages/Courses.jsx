import React, { useEffect, useState } from 'react'
import api from '../api/axiosClient'
import { Link } from 'react-router-dom'

export default function Courses(){
  const [courses, setCourses] = useState([])
  useEffect(()=> {
    api.get('/api/courses').then(r=>setCourses(r.data)).catch(()=>{})
  },[])
  return (
    <div>
      <h1 className="text-2xl mb-4">All Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map(c=>(
          <div key={c.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">{c.title}</h3>
            <p className="text-sm text-gray-600">{c.description}</p>
            <div className="mt-3">
              <Link to={`/courses/${c.id}`} className="text-blue-600">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
