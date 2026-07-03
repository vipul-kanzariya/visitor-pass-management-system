import React from 'react'
import { useAuth } from '../context/AuthContext'
import {  useNavigate } from 'react-router-dom';

function Dashboard() {
    const {user,logout} = useAuth();
    const navigate = useNavigate();
    
   
  return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">
                Welcome, {user?.name}! 👋
            </h1>
            <p className="text-gray-500">Role: {user?.role}</p>

            <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-blue-100 p-4 rounded-lg">
                    <h2 className="font-bold">Visitors</h2>
                    <p>Manage all visitors</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg">
                    <h2 className="font-bold">Passes</h2>
                    <p>Generate QR passes</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg">
                    <h2 className="font-bold">CheckLogs</h2>
                    <p>View check-in/out logs</p>
                </div>
            </div>
        </div>
    )
}


export default Dashboard