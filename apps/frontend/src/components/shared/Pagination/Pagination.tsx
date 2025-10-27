import { Pagination as BootstrapPagination } from 'react-bootstrap';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <BootstrapPagination>
        <BootstrapPagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1} />
        <BootstrapPagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />

        {getPageNumbers().map((page, index) =>
          typeof page === 'number' ? (
            <BootstrapPagination.Item key={index} active={page === currentPage} onClick={() => onPageChange(page)}>
              {page}
            </BootstrapPagination.Item>
          ) : (
            <BootstrapPagination.Ellipsis key={index} disabled />
          ),
        )}

        <BootstrapPagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        <BootstrapPagination.Last onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} />
      </BootstrapPagination>
    </div>
  );
}
