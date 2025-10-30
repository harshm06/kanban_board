import React, { useState } from 'react'
import { DragDropContext } from '@hello-pangea/dnd'
import Column from './Column'
import TicketFormModal from './TicketFormModal'

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', title: 'Design Homepage', description: 'Create wireframes and mockups for the new homepage', priority: 'high' },
    'task-2': { id: 'task-2', title: 'Setup Database', description: 'Configure PostgreSQL and create initial schemas', priority: 'high' },
    'task-3': { id: 'task-3', title: 'User Authentication', description: 'Implement JWT-based authentication system', priority: 'medium' },
    'task-4': { id: 'task-4', title: 'API Documentation', description: 'Write comprehensive API documentation using Swagger', priority: 'low' },
    'task-5': { id: 'task-5', title: 'Testing Suite', description: 'Setup Jest and write unit tests for core components', priority: 'medium' },
    'task-6': { id: 'task-6', title: 'Deploy to Production', description: 'Configure CI/CD pipeline and deploy to AWS', priority: 'low' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['task-4'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-5', 'task-6'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
}

function KanbanBoard() {
  const [state, setState] = useState(initialData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedColumnId, setSelectedColumnId] = useState(null)

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    // If there's no destination or dropped in the same position, do nothing
    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const startColumn = state.columns[source.droppableId]
    const finishColumn = state.columns[destination.droppableId]

    // Moving within the same column
    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      }

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      }

      setState(newState)
      return
    }

    // Moving from one column to another
    const startTaskIds = Array.from(startColumn.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStartColumn = {
      ...startColumn,
      taskIds: startTaskIds,
    }

    const finishTaskIds = Array.from(finishColumn.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinishColumn = {
      ...finishColumn,
      taskIds: finishTaskIds,
    }

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    }

    setState(newState)
  }

  const deleteTask = (taskId) => {
    // Remove task from tasks object
    const newTasks = { ...state.tasks }
    delete newTasks[taskId]

    // Remove task from all columns
    const newColumns = {}
    Object.keys(state.columns).forEach((columnId) => {
      const column = state.columns[columnId]
      newColumns[columnId] = {
        ...column,
        taskIds: column.taskIds.filter((id) => id !== taskId),
      }
    })

    setState({
      ...state,
      tasks: newTasks,
      columns: newColumns,
    })
  }

  const openAddTaskModal = (columnId) => {
    setSelectedColumnId(columnId)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedColumnId(null)
  }

  const handleAddTask = (taskData) => {
    // Generate new task ID
    const taskIds = Object.keys(state.tasks)
    const taskNumbers = taskIds.map((id) => parseInt(id.split('-')[1]))
    const maxTaskNumber = taskNumbers.length > 0 ? Math.max(...taskNumbers) : 0
    const newTaskId = `task-${maxTaskNumber + 1}`

    // Create new task
    const newTask = {
      id: newTaskId,
      ...taskData,
    }

    // Add task to tasks object
    const newTasks = {
      ...state.tasks,
      [newTaskId]: newTask,
    }

    // Add task to column
    const column = state.columns[selectedColumnId]
    const newColumn = {
      ...column,
      taskIds: [...column.taskIds, newTaskId],
    }

    setState({
      ...state,
      tasks: newTasks,
      columns: {
        ...state.columns,
        [selectedColumnId]: newColumn,
      },
    })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId]
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId])

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              onDelete={deleteTask}
              onAddTask={openAddTaskModal}
            />
          )
        })}
      </div>
      <TicketFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAddTask}
        columnId={selectedColumnId}
      />
    </DragDropContext>
  )
}

export default KanbanBoard
