import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import ApartmentCard from './ApartmentCard';
import { ApartmentListProps } from './models';

export default function ApartmentList({ apartments, isLoading, error, onEdit, onDelete }: ApartmentListProps) {
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="my-4">
        <Alert.Heading>Error</Alert.Heading>
        <p>{error}</p>
      </Alert>
    );
  }

  if (apartments.length === 0) {
    return (
      <Alert variant="info" className="my-4">
        <Alert.Heading>No Apartments Found</Alert.Heading>
        <p>There are no apartments to display. Try adjusting your filters or create a new one.</p>
      </Alert>
    );
  }

  return (
    <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
      {apartments.map((apartment) => (
        <Col key={apartment.id}>
          <ApartmentCard apartment={apartment} onEdit={onEdit} onDelete={onDelete} />
        </Col>
      ))}
    </Row>
  );
}
