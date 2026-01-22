import React from 'react'
import './ExitConfirmationModal.css'
import Button from './Button'

function ExitConfirmationModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null

  return (
    <div className="exit-modal-overlay" onClick={onCancel}>
      <div className="exit-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="exit-modal-title">
          Exiting will not save your progress. Are you sure?
        </h2>
        <div className="exit-modal-actions">
          <Button onClick={onCancel} className="exit-cancel-btn">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="exit-confirm-btn">
            EXIT
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ExitConfirmationModal
