import { Modal } from 'react-bootstrap';
import ApartmentForm from '../ApartmentForm';
import { ApartmentModalProps } from '../shared/models';

export default function ApartmentModal({ show, apartment, onHide, onSubmit, isLoading }: ApartmentModalProps) {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static" keyboard={!isLoading}>
      <Modal.Header closeButton>
        <Modal.Title>{apartment ? 'Edit Apartment' : 'Create New Apartment'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ApartmentForm apartment={apartment} onSubmit={onSubmit} onCancel={onHide} isLoading={isLoading} />
      </Modal.Body>
    </Modal>
  );
}
