import { useEffect, useState } from 'react';
import './App.css';
import { FaDeleteLeft } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import axios from 'axios';
import EditTaskModal from './EditTaskModal'; 
import { MdModeEditOutline } from "react-icons/md";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [error, setError] = useState(""); // State for error message

  const backendUrl = import.meta.env.VITE_UBASE_URL || "https://fullstacktodoapp-ih0t.onrender.com/todos";
  
  useEffect(() => {
    axios.get(`${backendUrl}`)
      .then(res => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("couldn't fetch the tasks");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") { // Check if the input is empty
      setError("Please enter a task"); // Set error message
      return;
    }
    setError(""); // Clear error message if input is not empty

    axios.post(`${backendUrl}`, { title: task, completed: false })
      .then(res => {
        setTasks([...tasks, res.data]);
        setTask("");
      })
      .catch(error => {
        console.error("couldn't create the task", error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`${backendUrl}/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task._id !== id));
      })
      .catch(error => {
        console.error("an error occurred while deleting", error);
      });
  };

  const handleComplete = (id) => {
    const task = tasks.find(task => task._id === id);
    axios.patch(`${backendUrl}/${id}`, { completed: !task.completed })
      .then(response => {
        setTasks(tasks.map(task => task._id === id ? response.data : task));
      })
      .catch(error => {
        console.error("There was an error updating the task!", error);
      });
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setModalIsOpen(true);
  };

  const handleSaveEdit = (editedTask) => {
    axios.patch(`${backendUrl}/${editedTask._id}`, editedTask)
      .then(response => {
        setTasks(tasks.map(task => task._id === editedTask._id ? response.data : task));
      })
      .catch(error => {
        console.error("There was an error updating the task!", error);
      });
  };

  if (loading) {
    return (
      <div className="loading-dots">
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  const incompleteTasksCount = tasks.filter(task => !task.completed).length;
  const completeTasksCount = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className='p-10'>
      <h1 className='mb-10 text-5xl font-bold'>ToDoList</h1>
      <form action="" className='mb-10' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
      {error && <p className='text-left ml-2 text-red-500 mt-2 font-bold text-2xl'>{error}</p>} {/* Render error message */}
          <label htmlFor="Task" className='text-left ml-3 font-bold'>Add Todo</label>
          <input
            onChange={(e) => setTask(e.target.value)}
            type="text"
            value={task}
            className='font-bold text-lg h-10 indent-2 border-2 border-collapse rounded-md focus:outline-double outline-blue-400'
          />
        </div>
        <div className='flex justify-start'>
          <button className='bg-blue-600 text-white p-2 mt-3 font-bold rounded-md hover:bg-blue-500'>Add</button>
        </div>
      </form>
      <div className="text-right ml-3 flex gap-16 mb-10 ">
        <p className='font-bold text-2xl'>Incomplete Tasks: {incompleteTasksCount}</p>
        <p className='font-bold text-2xl'>Complete Tasks: {completeTasksCount}</p>
        <p className='font-bold text-2xl'>Total Tasks: {totalTasks}</p>
      </div>
      {tasks.length === 0 ?
        (<p className='font-bold text-lg'>No Tasks to display</p>) :
        (tasks.map((task) => (
          <div key={task._id} className='flex justify-between bg-white p-5 mb-1 rounded-md'>
            <p className={`font-bold text-xl ${task.completed ? 'line-through' : 'line-clamp-none'}`}>{task.title}</p>
            <div className='flex gap-10'>
              <IoMdCheckmark
                onClick={() => handleComplete(task._id)}
                className={`font-bold text-xl hover:cursor-pointer ${task.completed ? 'text-green-500' : 'text-black'}`}
              />
              <FaDeleteLeft
                onClick={() => handleDelete(task._id)}
                className='font-bold text-xl hover:cursor-pointer'
              />
              <MdModeEditOutline onClick={() => handleEdit(task)} className='font-bold text-xl hover:cursor-pointer'/>
            </div>
          </div>
        )))
      }
      <EditTaskModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        task={selectedTask}
        onSave={handleSaveEdit}
      />
      <p className='font-bold'>made with love by nzizaprince for nzizaprince</p>
    </div>
  );
}

export default App;
