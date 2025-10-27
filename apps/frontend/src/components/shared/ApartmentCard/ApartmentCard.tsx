import { Card, Badge, Button, Row, Col } from 'react-bootstrap';
import { ApartmentResponseDto } from '@apartment-listing/shared';
import { getFullImageUrl } from '@/lib/utils/image';

export interface ApartmentCardAction {
  label: string;
  icon: string;
  variant: 'primary' | 'outline-primary' | 'outline-danger' | 'outline-secondary' | 'success' | 'danger';
  onClick: () => void;
}

export interface ApartmentCardProps {
  apartment: ApartmentResponseDto;
  actions?: ApartmentCardAction[];
  onClick?: () => void;
}

export default function ApartmentCard({ apartment, actions, onClick }: ApartmentCardProps) {
  const hasClickHandler = !!onClick;

  return (
    <Card
      className="h-100 shadow-sm hover-shadow transition"
      style={{ cursor: hasClickHandler ? 'pointer' : 'default' }}
    >
      <div
        style={{ height: '200px', overflow: 'hidden', position: 'relative' }}
        onClick={hasClickHandler ? onClick : undefined}
      >
        {apartment.images && apartment.images.length > 0 ? (
          <Card.Img
            variant="top"
            src={getFullImageUrl(apartment.images[0])}
            alt={apartment.unitName}
            style={{ height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div className="d-flex align-items-center justify-content-center bg-light" style={{ height: '100%' }}>
            <span className="text-muted">No Image</span>
          </div>
        )}
        <Badge bg={apartment.available ? 'success' : 'danger'} className="position-absolute top-0 end-0 m-2">
          {apartment.available ? 'Available' : 'Unavailable'}
        </Badge>
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-2 text-truncate">{apartment.unitName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted small">
          <i className="bi bi-geo-alt-fill me-1"></i>
          {apartment.city} • {apartment.project}
        </Card.Subtitle>

        <Card.Text className="text-muted small text-truncate mb-2">{apartment.address}</Card.Text>

        <div className="mb-3">
          <h5 className="text-primary mb-0">${apartment.price.toLocaleString()}</h5>
          <small className="text-muted">Unit #{apartment.unitNumber}</small>
        </div>

        <Row className="g-2 mb-3">
          <Col xs={4} className="text-center">
            <div className="d-flex flex-column align-items-center">
              <i className="bi bi-house-door text-primary mb-1" style={{ fontSize: '18px' }}></i>
              <small className="text-muted">{apartment.bedrooms} Beds</small>
            </div>
          </Col>
          <Col xs={4} className="text-center">
            <div className="d-flex flex-column align-items-center">
              <i className="bi bi-droplet text-primary mb-1" style={{ fontSize: '18px' }}></i>
              <small className="text-muted">{apartment.bathrooms} Baths</small>
            </div>
          </Col>
          <Col xs={4} className="text-center">
            <div className="d-flex flex-column align-items-center">
              <i className="bi bi-rulers text-primary mb-1" style={{ fontSize: '18px' }}></i>
              <small className="text-muted">{apartment.area} sqft</small>
            </div>
          </Col>
        </Row>

        {apartment.description && (
          <Card.Text
            className="text-muted small mb-3"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {apartment.description}
          </Card.Text>
        )}

        {actions && actions.length > 0 && (
          <div className="mt-auto d-flex gap-2">
            {actions.length === 1 ? (
              <Button
                variant={actions[0].variant}
                size="sm"
                className="w-100"
                onClick={(e) => {
                  e.stopPropagation();
                  actions[0].onClick();
                }}
              >
                <i className={`${actions[0].icon} me-1`}></i>
                {actions[0].label}
              </Button>
            ) : (
              actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant}
                  size="sm"
                  className="flex-fill"
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick();
                  }}
                >
                  <i className={`${action.icon} me-1`}></i>
                  {action.label}
                </Button>
              ))
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
