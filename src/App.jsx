import React from 'react'
import AppRouter from './router/AppRouter'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'

export default function App(){
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 min-h-screen">
        <Topbar />
        <main className="p-6">
          <AppRouter />
        </main>
      </div>
    </div>
  )
}
