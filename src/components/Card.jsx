import React, { useState } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import ConfirmationModal from './ConfirmationModal'

function Card({ task, index, onDelete }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleDeleteClick = (e) => {
    e.stopPropagation()
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = () => {
    onDelete(task.id)
  }

  return (
    <>
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
              onClick={handleDeleteClick}
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
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Ticket"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </>
  )
}

export default Card
