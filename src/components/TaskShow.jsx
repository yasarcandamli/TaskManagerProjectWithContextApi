import { useState } from "react";
import TaskCreate from "./TaskCreate";

import { useContext } from 'react'
import TasksContext from '../context/task'

function TaskShow({ task }) {
    const { updateTaskById, deleteTaskById } = useContext(TasksContext);

    const [showUpdate, setShowUpdate] = useState(false);

    const handleDeleteClick = () => {
        // onDelete(task.id)
        deleteTaskById(task.id);
    };

    const handleUpdateClick = () => {
        setShowUpdate(!showUpdate);
    };

    const handleSubmit = (id, updatedTitle, updatedTaskDescription) => {
        setShowUpdate(false);
        // onUpdate(id, updatedTitle, updatedTaskDescription);

        updateTaskById(id, updatedTitle, updatedTaskDescription)
    };

    return (
        <>
            <div className="task-show">
                {showUpdate ? <TaskCreate task={task} taskFormUpdate={true} onUpdate={handleSubmit} /> :
                    <div>
                        <h3 className="task-show-title">Task</h3>
                        <p>{task.title}</p>
                        <h3 className="task-show-title">Task Description</h3>
                        <p>{task.taskDescription}</p>
                        <div className="task-show-btns">
                            <button className="task-show-btn task-delete-btn" onClick={handleDeleteClick}>Delete</button>
                            <button className="task-show-btn task-update-btn" onClick={handleUpdateClick}>Update</button>
                        </div>
                    </div>}

            </div>
        </>
    );
}

export default TaskShow;