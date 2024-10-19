import './App.css'
import TaskCreate from './components/TaskCreate'
import TaskList from './components/TaskList'

import { useEffect, useContext } from 'react'
import TasksContext from './context/task'


function App() {
  const { fetchTasks } = useContext(TasksContext);
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <div className="App">
        <nav className='nav'>
          <h1 className='app-title'>TASK MANAGER</h1>
        </nav>
        <TaskCreate />
        <h2>Görevler</h2>
        <TaskList />
      </div>
    </>
  )
}

export default App
