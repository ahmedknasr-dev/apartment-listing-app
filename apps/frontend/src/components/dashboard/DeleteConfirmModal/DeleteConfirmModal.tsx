import { Modal, Button, Spinner } from 'react-bootstrap';
import { DeleteConfirmModalProps } from '../shared/models';

export default function DeleteConfirmModal({
  show,
  apartmentName,
  onConfirm,
  onCancel,
  isDeleting = false,
}: DeleteConfirmModalProps) {
  return (
    <Modal show={show} onHide={onCancel} centered backdrop="static" keyboard={!isDeleting}>
      <Modal.Body className="text-center p-4 p-md-5">
        {/* Warning Icon */}
        <div className="mb-3">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-circle bg-danger bg-opacity-10 p-3"
            style={{ width: '80px', height: '80px' }}
          >
            <i className="bi bi-exclamation-triangle-fill text-danger" style={{ fontSize: '2.5rem' }}></i>
          </div>
        </div>

        {/* Title */}
        <h4 className="fw-bold mb-3">Delete Apartment?</h4>

        {/* Message */}
        <p className="text-muted mb-2">
          Are you sure you want to delete <strong className="text-dark">{apartmentName}</strong>?
        </p>
        <p className="text-danger small fw-semibold mb-4">
          <i className="bi bi-info-circle me-1"></i>
          This action cannot be undone
        </p>

        {/* Action Buttons */}
        <div className="d-grid gap-2">
          <Button variant="danger" size="lg" onClick={onConfirm} disabled={isDeleting} className="fw-semibold">
            {isDeleting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Deleting...
              </>
            ) : (
              <>
                <i className="bi bi-trash3 me-2"></i>
                Yes, Delete
              </>
            )}
          </Button>
          <Button
            variant="outline-secondary"
            size="lg"
            onClick={onCancel}
            disabled={isDeleting}
            className="fw-semibold"
          >
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
