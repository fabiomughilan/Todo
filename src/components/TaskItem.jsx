
import React from 'react';

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <h3 className={task.completed ? 'line-through' : ''}>
          {task.title}
        </h3>
        {task.description && (
          <p className={task.completed ? 'line-through' : ''}>
            {task.description}
          </p>
        )}
        <p className="task-date">
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="task-actions">
        <button
          onClick={() => onToggle(task.id)}
          className={`toggle-btn ${task.completed ? 'completed' : 'pending'}`}
          title={task.completed ? 'Mark as pending' : 'Mark as complete'}
        >
          ✓
        </button>

        <button
          onClick={() => onEdit(task)}
          className="edit-btn"
          title="Edit task"
        >
          ✏️
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="delete-btn"
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
