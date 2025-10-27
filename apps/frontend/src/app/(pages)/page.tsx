'use client';

import { useEffect } from 'react';
import { Container, Row, Col, Badge, Spinner, Alert } from 'react-bootstrap';
import { useApartmentFacade } from '@/facade/apartmentFacade';
import { SearchBar, Pagination, ApartmentCard } from '@/components/shared';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { apartments, filters, isLoading, error, pagination, fetchApartments, updateFilters, resetFilters } =
    useApartmentFacade();

  useEffect(() => {
    fetchApartments({ page: 1, limit: 8 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (newFilters: typeof filters) => {
    updateFilters({ ...newFilters, page: 1 });
    fetchApartments({ ...newFilters, page: 1, limit: pagination?.itemsPerPage || 8 });
  };

  const handleReset = () => {
    resetFilters();
    fetchApartments({ page: 1, limit: 8 });
  };

  const handlePageChange = (page: number) => {
    updateFilters({ ...filters, page });
    fetchApartments({ ...filters, page, limit: pagination?.itemsPerPage || 8 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container className="py-4 py-md-5">
      {/* Header */}
      <Row className="mb-4 mb-md-5">
        <Col>
          <div className="text-center">
            <h1 className="mb-3">Find Your Perfect Apartment</h1>
            <p className="text-muted mb-0">
              Browse through our collection of available apartments
              {pagination && (
                <Badge bg="primary" className="ms-2">
                  {pagination.totalItems} Properties
                </Badge>
              )}
            </p>
          </div>
        </Col>
      </Row>

      {/* Search & Filters */}
      <Row className="mb-4 mb-md-5">
        <Col>
          <SearchBar filters={filters} onSearch={handleSearch} onReset={handleReset} />
        </Col>
      </Row>

      {/* Apartment List */}
      <Row className="mb-4 mb-md-5">
        <Col>
          {isLoading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading apartments...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : apartments.length === 0 ? (
            <Alert variant="info">
              <h5 className="alert-heading">No apartments found</h5>
              <p className="mb-0">Try adjusting your search filters to find more results.</p>
            </Alert>
          ) : (
            <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
              {apartments.map((apartment) => (
                <Col key={apartment.id}>
                  <ApartmentCard
                    apartment={apartment}
                    onClick={() => router.push(`/apartments/${apartment.id}`)}
                    actions={[
                      {
                        label: 'View Details',
                        icon: 'bi-eye',
                        variant: 'primary',
                        onClick: () => router.push(`/apartments/${apartment.id}`),
                      },
                    ]}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <Row className="mt-4 mt-md-5">
          <Col>
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
}
