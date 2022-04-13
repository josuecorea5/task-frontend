import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <nav className='bg-gray-800 px-3 py-3 '>
        <div className='flex'>
          <img className='h-8 w-auto mr-5' src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="worflow" />
          <div className="flex space-x-4">
            <Link to="/" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Home</Link>
            <Link to="/tasks/new" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">New Task</Link>
          </div>
        </div>
      </nav>
    </>
  )
}
