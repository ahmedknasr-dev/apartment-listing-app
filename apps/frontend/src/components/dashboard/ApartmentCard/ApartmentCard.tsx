import { ApartmentResponseDto } from '@apartment-listing/shared';
import ApartmentCard from '@/components/shared/ApartmentCard';

export interface DashboardApartmentCardProps {
  apartment: ApartmentResponseDto;
  onEdit: (apartment: ApartmentResponseDto) => void;
  onDelete: (id: string) => void;
}

export default function DashboardApartmentCard({ apartment, onEdit, onDelete }: DashboardApartmentCardProps) {
  const actions = [
    {
      label: 'Edit',
      icon: 'bi-pencil',
      variant: 'outline-primary' as const,
      onClick: () => onEdit(apartment),
    },
    {
      label: 'Delete',
      icon: 'bi-trash',
      variant: 'outline-danger' as const,
      onClick: () => onDelete(apartment.id),
    },
  ];

  return <ApartmentCard apartment={apartment} actions={actions} />;
}
