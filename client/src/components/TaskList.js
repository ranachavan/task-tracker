import React from 'react';
import { FaTrash, FaCheck, FaUndo } from 'react-icons/fa';

function TaskList({ tasks, onToggleComplete, onDeleteTask }) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task._id} className={task.completed ? 'completed' : ''}>
              <div className="task-content">
                <h3>{task.title}</h3>
                {task.description && <p>{task.description}</p>}
              </div>
              <div className="task-actions">
                <button 
                  onClick={() => onToggleComplete(task._id, !task.completed)}
                  className="toggle-btn"
                >
                  {task.completed ? <FaUndo /> : <FaCheck />}
                </button>
                <button 
                  onClick={() => onDeleteTask(task._id)}
                  className="delete-btn"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;