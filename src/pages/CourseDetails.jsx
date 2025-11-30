import React, { useEffect, useState } from 'react'
import api from '../api/axiosClient'
import { useParams } from 'react-router-dom'

export default function CourseDetails(){
  const { id } = useParams()
  const [course, setCourse] = useState(null)

  useEffect(()=> {
    api.get('/api/courses/' + id).then(r=>setCourse(r.data)).catch(()=>{})
  },[id])

  if (!course) return <div>Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
      <p className="text-gray-700 mb-4">{course.description}</p>
      <div>
        <button onClick={()=> api.post('/api/enroll/' + id).then(()=>alert('Enrolled')).catch(e=>alert(e.response?.data || 'Error'))}
          className="px-3 py-2 bg-green-600 text-white rounded">Enroll</button>
      </div>
    </div>
  )
}
