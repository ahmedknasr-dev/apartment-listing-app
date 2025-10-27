'use client';

import { useEffect, useState } from 'react';
import { Container, Button, Row, Col, Badge } from 'react-bootstrap';
import { ApartmentResponseDto, CreateApartmentDto, UpdateApartmentDto } from '@apartment-listing/shared';
import { useApartmentFacade } from '@/facade/apartmentFacade';
import { ApartmentList, ApartmentModal, DeleteConfirmModal, SearchBar, Pagination } from '@/components/dashboard';

export default function Dashboard() {
  const {
    apartments,
    filters,
    isLoading,
    error,
    pagination,
    fetchApartments,
    createApartment,
    updateApartment,
    deleteApartment,
    updateFilters,
    resetFilters,
  } = useApartmentFacade();

  const [showModal, setShowModal] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState<ApartmentResponseDto | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [apartmentToDelete, setApartmentToDelete] = useState<ApartmentResponseDto | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchApartments({ page: 1, limit: 12 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateNew = () => {
    setSelectedApartment(null);
    setShowModal(true);
  };

  const handleEdit = (apartment: ApartmentResponseDto) => {
    setSelectedApartment(apartment);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    const apartment = apartments.find((apt) => apt.id === id);
    if (apartment) {
      setApartmentToDelete(apartment);
      setShowDeleteModal(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!apartmentToDelete) return;

    try {
      setIsDeleting(true);
      await deleteApartment(apartmentToDelete.id);
      setShowDeleteModal(false);
      setApartmentToDelete(null);
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setApartmentToDelete(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedApartment(null);
  };

  const handleSubmit = async (data: CreateApartmentDto | UpdateApartmentDto) => {
    try {
      if (selectedApartment) {
        await updateApartment(selectedApartment.id, data as UpdateApartmentDto);
      } else {
        await createApartment(data as CreateApartmentDto);
      }
      handleModalClose();
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const handleSearch = (newFilters: typeof filters) => {
    updateFilters({ ...newFilters, page: 1 });
    fetchApartments({ ...newFilters, page: 1, limit: pagination?.itemsPerPage || 12 });
  };

  const handleReset = () => {
    resetFilters();
    fetchApartments({ page: 1, limit: 12 });
  };

  const handlePageChange = (page: number) => {
    updateFilters({ ...filters, page });
    fetchApartments({ ...filters, page, limit: pagination?.itemsPerPage || 12 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
            <div>
              <h1 className="mb-2">Apartment Dashboard</h1>
              <p className="text-muted mb-0">
                Manage your apartment listings
                {pagination && (
                  <Badge bg="primary" className="ms-2">
                    {pagination.totalItems} Total
                  </Badge>
                )}
              </p>
            </div>
            <Button variant="primary" size="lg" onClick={handleCreateNew} className="text-nowrap">
              + Add New Apartment
            </Button>
          </div>
        </Col>
      </Row>

      {/* Search & Filters */}
      <SearchBar filters={filters} onSearch={handleSearch} onReset={handleReset} />

      {/* Apartment List */}
      <ApartmentList
        apartments={apartments}
        isLoading={isLoading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Modal */}
      <ApartmentModal
        show={showModal}
        apartment={selectedApartment}
        onHide={handleModalClose}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        show={showDeleteModal}
        apartmentName={apartmentToDelete?.unitName || ''}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isDeleting={isDeleting}
      />
    </Container>
  );
}
