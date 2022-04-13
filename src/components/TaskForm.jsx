import {React, useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from './Spinner'; 


export default function TaskForm() {
  const [task, setTask] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const handleChange = (e) => {
    setTask({...task,[e.target.name]: e.target.value});
  }

  const loadTask = async(id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await response.json();
    setTask({title: data.title, description: data.description});
    setEditing(true);
  }

  useEffect(() => {
    if(params.id) {
      loadTask(params.id)
    }
  },[params.id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    setLoading(true)
    if(editing) {
      await fetch(`http://localhost:5000/tasks/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(task)
      });
    }else {
        await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: { 'Content-Type': 'application/json'}
      });
    }
    setLoading(false)
    navigate('/');
  }

  return (
    <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <img className='mx-auto h-12 w-auto' src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="workflow" />
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>{editing ? 'Update task' :'Create task'}</h2>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='rounded-md shadow-md -space-y-px'>
            <div>
              <label htmlFor="name-task" className='sr-only'>Title Task</label>
              <input placeholder='Task title' type="text" id='name-task' required className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' name='title' onChange={handleChange} value={task.title} />
              <textarea placeholder='Description title' type="text" id='description-task' required className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-4 resize-none' name='description' value={task.description} onChange={handleChange}></textarea>
            </div>
          </div>
          <div className='flex justify-center'>
            <button type='submit' className='w-32 py-3 bg-indigo-600 text-white text-center rounded-md transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-600 duration-300' disabled={!task.title || !task.description}>
              {loading ? <Spinner /> : 'Save'}
            </button>
            <button type='button' className='w-32 ml-4 py-3 bg-indigo-600 text-white text-center rounded-md transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-600 duration-300' onClick={() => navigate('/')}>
              Go Back
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
