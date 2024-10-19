import { createContext } from "react";
import axios from 'axios';
import { useState } from 'react'

const TasksContext = createContext();

function Provider({ children }) {
    const [tasks, setTasks] = useState([]);

    const createTask = async (title, taskDescription) => {
        const response = await axios.post('http://localhost:3000/tasks', {
            title,
            taskDescription,
        });

        console.log(response);

        const createdTasks = [
            ...tasks,
            response.data
        ];
        setTasks(createdTasks);
    };

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:3000/tasks');
        setTasks(response.data);
    };

    const deleteTaskById = async (id) => {
        await axios.delete(`http://localhost:3000/tasks/${id}`);

        const afterDeleteTasks = tasks.filter((task) => {
            return task.id !== id;
        });

        setTasks(afterDeleteTasks);
    };

    const updateTaskById = async (id, updatedTitle, updatedTaskDescription) => {
        await axios.put(`http://localhost:3000/tasks/${id}`, { title: updatedTitle, taskDescription: updatedTaskDescription });
        const afterUpdateTasks = tasks.map((task) => {
            if (task.id === id) {
                return {
                    id,
                    title: updatedTitle,
                    taskDescription: updatedTaskDescription
                }
            }
            return task;
        });

        setTasks(afterUpdateTasks);
    };

    const sharedValuesAndMethods = {
        tasks,
        createTask,
        fetchTasks,
        deleteTaskById,
        updateTaskById
    }

    return (
        <TasksContext.Provider value={sharedValuesAndMethods}>
            {children}
        </TasksContext.Provider>
    )
}

export { Provider }
export default TasksContext;