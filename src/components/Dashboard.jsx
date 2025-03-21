// Dashboard.js
import React from 'react'
import { useNavigate } from 'react-router-dom'
import MainForm from './MainForm'
import PDFViewer from './PDFViewer' 

const Dashboard = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('session')
    navigate('/')
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create New Invoice</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

   
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
     
        <div className="bg-white rounded-xl p-4 shadow h-fit">
          <PDFViewer />
        </div>

    
        <div className="bg-white rounded-xl p-4 shadow">
          <MainForm />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
