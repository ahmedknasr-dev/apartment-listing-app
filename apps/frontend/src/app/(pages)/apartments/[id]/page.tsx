'use client';

import { use, useEffect } from 'react';
import { Container, Row, Col, Badge, Spinner, Alert, Button, Carousel } from 'react-bootstrap';
import { useApartmentFacade } from '@/facade/apartmentFacade';
import { getFullImageUrl } from '@/lib/utils/image';
import { useRouter } from 'next/navigation';

export default function ApartmentDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { selectedApartment, isLoading, error, fetchApartmentById } = useApartmentFacade();

  useEffect(() => {
    fetchApartmentById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading apartment details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => router.push('/')}>
          Back to Home
        </Button>
      </Container>
    );
  }

  if (!selectedApartment) {
    return (
      <Container className="py-5">
        <Alert variant="warning">Apartment not found.</Alert>
        <Button variant="primary" onClick={() => router.push('/')}>
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4 py-md-5">
      {/* Back Button */}
      <Row className="mb-4">
        <Col>
          <Button variant="outline-secondary" onClick={() => router.back()} className="shadow-sm">
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </Button>
        </Col>
      </Row>

      {/* Main Content */}
      <Row className="g-4">
        {/* Left Column - Image Gallery and Details */}
        <Col lg={8}>
          {/* Image Gallery */}
          <div className="mb-4">
            {selectedApartment.images && selectedApartment.images.length > 0 ? (
              <Carousel
                indicators={selectedApartment.images.length > 1}
                controls={selectedApartment.images.length > 1}
                interval={5000}
                className="rounded-3 overflow-hidden shadow"
              >
                {selectedApartment.images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={getFullImageUrl(image)}
                      alt={`${selectedApartment.unitName} - Image ${index + 1}`}
                      style={{
                        height: '450px',
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <div
                className="d-flex align-items-center justify-content-center bg-light rounded-3"
                style={{ height: '450px' }}
              >
                <div className="text-center">
                  <i className="bi bi-image fs-1 text-muted mb-3 d-block"></i>
                  <span className="text-muted">No Images Available</span>
                </div>
              </div>
            )}
          </div>

          {/* Title and Location */}
          <div className="mb-4 pb-4 border-bottom">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div className="flex-grow-1">
                <h1 className="display-6 fw-bold mb-2">{selectedApartment.unitName}</h1>
                <p className="text-muted fs-5 mb-0">
                  <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                  {selectedApartment.address}, {selectedApartment.city}
                </p>
              </div>
              <Badge bg={selectedApartment.available ? 'success' : 'danger'} className="px-3 py-2 fs-6">
                {selectedApartment.available ? 'Available' : 'Not Available'}
              </Badge>
            </div>
          </div>

          {/* Property Features */}
          <div className="mb-4 pb-4 border-bottom">
            <h4 className="mb-4 fw-bold">Property Features</h4>
            <Row className="g-3">
              <Col xs={6} md={3}>
                <div className="text-center p-3 border rounded-3 h-100">
                  <i className="bi bi-house-door text-primary fs-2 mb-2 d-block"></i>
                  <h4 className="mb-1 fw-bold">{selectedApartment.bedrooms}</h4>
                  <small className="text-muted">Bedrooms</small>
                </div>
              </Col>
              <Col xs={6} md={3}>
                <div className="text-center p-3 border rounded-3 h-100">
                  <i className="bi bi-droplet text-primary fs-2 mb-2 d-block"></i>
                  <h4 className="mb-1 fw-bold">{selectedApartment.bathrooms}</h4>
                  <small className="text-muted">Bathrooms</small>
                </div>
              </Col>
              <Col xs={6} md={3}>
                <div className="text-center p-3 border rounded-3 h-100">
                  <i className="bi bi-rulers text-primary fs-2 mb-2 d-block"></i>
                  <h4 className="mb-1 fw-bold">{selectedApartment.area}</h4>
                  <small className="text-muted">Sq Ft</small>
                </div>
              </Col>
              <Col xs={6} md={3}>
                <div className="text-center p-3 border rounded-3 h-100">
                  <i className="bi bi-building text-primary fs-2 mb-2 d-block"></i>
                  <h4 className="mb-1 fw-bold">#{selectedApartment.unitNumber}</h4>
                  <small className="text-muted">Unit No.</small>
                </div>
              </Col>
            </Row>
          </div>

          {/* Description */}
          {selectedApartment.description && (
            <div className="mb-4 pb-4 border-bottom">
              <h4 className="mb-3 fw-bold">About This Property</h4>
              <p className="text-muted lh-lg">{selectedApartment.description}</p>
            </div>
          )}

          {/* Project Information */}
          <div>
            <h4 className="mb-3 fw-bold">Project Details</h4>
            <div className="bg-light rounded-3 p-4">
              <div className="d-flex align-items-center">
                <div
                  className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: '50px', height: '50px' }}
                >
                  <i className="bi bi-buildings text-primary fs-4"></i>
                </div>
                <div>
                  <small className="text-muted d-block mb-1">Project Name</small>
                  <h5 className="mb-0 fw-bold">{selectedApartment.project}</h5>
                </div>
              </div>
            </div>
          </div>
        </Col>

        {/* Right Column - Price and Contact Card (Sticky) */}
        <Col lg={4}>
          <div className="sticky-top" style={{ top: '20px' }}>
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <div className="mb-4">
                  <small className="text-muted d-block mb-2">Price</small>
                  <h2 className="text-primary fw-bold mb-0">${selectedApartment.price.toLocaleString()}</h2>
                </div>

                <div className="mb-4 pb-4 border-bottom">
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Location</span>
                    <span className="fw-semibold">{selectedApartment.city}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Status</span>
                    <Badge bg={selectedApartment.available ? 'success' : 'danger'}>
                      {selectedApartment.available ? 'Available' : 'Not Available'}
                    </Badge>
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <Button variant="primary" size="lg">
                    <i className="bi bi-telephone-fill me-2"></i>
                    Call Now
                  </Button>
                  <Button variant="outline-primary" size="lg">
                    <i className="bi bi-envelope-fill me-2"></i>
                    Send Message
                  </Button>
                  <Button variant="outline-secondary" size="lg">
                    <i className="bi bi-calendar-check me-2"></i>
                    Schedule Visit
                  </Button>
                </div>

                <div className="mt-4 pt-4 border-top">
                  <small className="text-muted d-block mb-2">Share this property</small>
                  <div className="d-flex gap-2">
                    <Button variant="outline-secondary" size="sm" className="flex-fill">
                      <i className="bi bi-facebook"></i>
                    </Button>
                    <Button variant="outline-secondary" size="sm" className="flex-fill">
                      <i className="bi bi-twitter"></i>
                    </Button>
                    <Button variant="outline-secondary" size="sm" className="flex-fill">
                      <i className="bi bi-whatsapp"></i>
                    </Button>
                    <Button variant="outline-secondary" size="sm" className="flex-fill">
                      <i className="bi bi-share"></i>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
