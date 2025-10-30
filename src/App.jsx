import React from 'react'
import KanbanBoard from './components/KanbanBoard'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Kanban Board</h1>
        <p>Drag and drop tasks between columns</p>
      </header>
      <KanbanBoard />
    </div>
  )
}

export default App
