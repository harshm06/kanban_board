import React from 'react'
import Modal from './Modal'
import '../styles/ConfirmationModal.css'

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', variant = 'danger' }) => {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="small">
      <div className="confirmation-content">
        <p className="confirmation-message">{message}</p>
        <div className="confirmation-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            {cancelText}
          </button>
          <button type="button" className={`btn-confirm btn-${variant}`} onClick={handleConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmationModal
