import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function TaskItem({id,title,description,handleDelete}) {
  const navigate = useNavigate();
  return (
    <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
     <div className='flex justify-center'>
        <button className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white  rounded-md focus:ring-4 focus:outline-none focus:ring-blue-300 bg-indigo-600 hover:bg-indigo-700 dark:focus:ring-blue-800" onClick={() => navigate(`/tasks/${id}/edit`)}>
            Edit Task
        </button>
        <button className="inline-flex items-center py-2 ml-4 px-3 text-sm font-medium text-center text-white rounded-md focus:ring-4 focus:outline-none focus:ring-blue-300 bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleDelete(id)}>
          Delete Task
        </button>
     </div>
    </div>
  )
}
