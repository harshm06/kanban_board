import React from 'react'
import { Droppable } from '@hello-pangea/dnd'
import Card from './Card'

function Column({ column, tasks, onDelete, onAddTask }) {
  const getColumnClass = () => {
    if (column.title === 'To Do') return 'column-todo'
    if (column.title === 'In Progress') return 'column-in-progress'
    if (column.title === 'Done') return 'column-done'
    return ''
  }

  return (
    <div className={`kanban-column ${getColumnClass()}`}>
      <div className="column-header">
        <h2>
          {column.title}
          <span className="task-count">{tasks.length}</span>
        </h2>
        <button
          className="add-task-btn"
          onClick={() => onAddTask(column.id)}
          title="Add new ticket"
        >
          + Add Ticket
        </button>
      </div>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`column-content ${
              snapshot.isDraggingOver ? 'dragging-over' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <Card key={task.id} task={task} index={index} onDelete={onDelete} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default Column
