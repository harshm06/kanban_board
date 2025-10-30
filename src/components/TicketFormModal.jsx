import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import '../styles/TicketFormModal.css'

const TicketFormModal = ({ isOpen, onClose, onSubmit, columnId }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
  })
  const [errors, setErrors] = useState({})

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
      })
      setErrors({})
    }
  }, [isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit({
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
      })
      onClose()
    }
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Ticket" size="medium">
      <form onSubmit={handleSubmit} className="ticket-form">
        <div className="form-group">
          <label htmlFor="title">
            Title <span className="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter ticket title"
            className={errors.title ? 'error' : ''}
            autoFocus
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">
            Description <span className="required">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter ticket description"
            rows="4"
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            Create Ticket
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default TicketFormModal
