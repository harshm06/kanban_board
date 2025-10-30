import React from 'react'
import { Draggable } from '@hello-pangea/dnd'

function Card({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`kanban-card ${snapshot.isDragging ? 'dragging' : ''}`}
        >
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
