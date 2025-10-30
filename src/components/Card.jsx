import React from 'react'
import { Draggable } from '@hello-pangea/dnd'

function Card({ task, index, onDelete }) {
  const handleDelete = (e) => {
    e.stopPropagation()
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      onDelete(task.id)
    }
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`kanban-card ${snapshot.isDragging ? 'dragging' : ''}`}
        >
          <button
            className="card-delete-btn"
            onClick={handleDelete}
            title="Delete ticket"
          >
            ×
          </button>
          <div className="card-title">{task.title}</div>
          <div className="card-description">{task.description}</div>
          <div className="card-footer">
            <span className={`card-priority priority-${task.priority}`}>
              {task.priority}
            </span>
            <span className="card-id">{task.id}</span>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Card
