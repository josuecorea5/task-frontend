import {React, useState, useEffect} from 'react'
import TaskItem from './TaskItem';

export default function TaskList() {
  const [tasks, setTasks] = useState([]); 

  const loadTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks');
    const data = await response.json();
    setTasks(data);
  }

  useEffect(()=> {
    loadTasks();
  },[])

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    });
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div>
      <p className='text-3xl text-center my-4 font-bold text-gray-800 '>Welcome!</p>
      <div className='w-9/12 grid lg:grid-cols-3 gap-5 md:grid-cols-2 sm:grid-cols-1 mx-auto'>
        {
          tasks.map((task) => (
            <TaskItem key={task.id} id={task.id} title={task.title} description={task.description} handleDelete={handleDelete} />
          ))
        }
      </div>
    </div>
  )
}
