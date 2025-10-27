import { Modal, Button } from 'react-bootstrap';
import { DeleteConfirmModalProps } from './models';

export default function DeleteConfirmModal({
  show,
  apartmentName,
  onConfirm,
  onCancel,
  isDeleting = false,
}: DeleteConfirmModalProps) {
  return (
    <Modal show={show} onHide={onCancel} centered backdrop="static" keyboard={!isDeleting}>
      <Modal.Header closeButton={!isDeleting}>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-0">
          Are you sure you want to delete <strong>&quot;{apartmentName}&quot;</strong>?
        </p>
        <p className="text-muted small mt-2 mb-0">This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel} disabled={isDeleting}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
