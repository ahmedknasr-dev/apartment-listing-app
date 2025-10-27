import { FilterField, FilterGroup } from './search-bar.types';

// Primary filters shown by default
export const primaryFilters: FilterField[] = [
  {
    field: 'search',
    label: 'Search',
    type: 'text',
    placeholder: 'Search apartments by name or project...',
    icon: 'bi-search',
    colSize: { xs: 12, md: 6, lg: 3 },
    size: 'lg',
  },
  {
    field: 'city',
    label: 'City',
    type: 'text',
    placeholder: 'Enter city',
    icon: 'bi-geo-alt',
    colSize: { xs: 12, sm: 6, md: 3, lg: 3 },
    size: 'lg',
  },
  {
    field: 'available',
    label: 'Availability',
    type: 'select',
    icon: 'bi-check-circle',
    colSize: { xs: 12, sm: 6, md: 3, lg: 3 },
    size: 'lg',
    options: [
      { value: '', label: 'All Statuses' },
      { value: 'true', label: 'Available' },
      { value: 'false', label: 'Unavailable' },
    ],
  },
];

// Advanced filters grouped by category
export const advancedFilterGroups: FilterGroup[] = [
  {
    title: 'Price Range',
    icon: 'bi-currency-dollar',
    fields: [
      {
        field: 'minPrice',
        label: 'Minimum Price',
        type: 'number',
        placeholder: '0',
        prefix: '$',
        colSize: { xs: 12, sm: 6, lg: 4 },
      },
      {
        field: 'maxPrice',
        label: 'Maximum Price',
        type: 'number',
        placeholder: 'No limit',
        prefix: '$',
        colSize: { xs: 12, sm: 6, lg: 4 },
      },
    ],
  },
  {
    title: 'Bedrooms',
    icon: 'bi-door-closed',
    fields: [
      {
        field: 'minBedrooms',
        label: 'Minimum',
        type: 'number',
        placeholder: '0',
        colSize: { xs: 6, sm: 4, md: 3, lg: 2 },
      },
      {
        field: 'maxBedrooms',
        label: 'Maximum',
        type: 'number',
        placeholder: 'Any',
        colSize: { xs: 6, sm: 4, md: 3, lg: 2 },
      },
    ],
  },
  {
    title: 'Bathrooms',
    icon: 'bi-droplet',
    fields: [
      {
        field: 'minBathrooms',
        label: 'Minimum',
        type: 'number',
        placeholder: '0',
        colSize: { xs: 6, sm: 4, md: 3, lg: 2 },
      },
      {
        field: 'maxBathrooms',
        label: 'Maximum',
        type: 'number',
        placeholder: 'Any',
        colSize: { xs: 6, sm: 4, md: 3, lg: 2 },
      },
    ],
  },
  {
    title: 'Area (Square Feet)',
    icon: 'bi-arrows-angle-expand',
    fields: [
      {
        field: 'minArea',
        label: 'Minimum',
        type: 'number',
        placeholder: '0',
        colSize: { xs: 12, sm: 6, lg: 4 },
      },
      {
        field: 'maxArea',
        label: 'Maximum',
        type: 'number',
        placeholder: 'No limit',
        colSize: { xs: 12, sm: 6, lg: 4 },
      },
    ],
  },
  {
    title: 'Project Name',
    icon: 'bi-building',
    fields: [
      {
        field: 'project',
        label: 'Project Name',
        type: 'text',
        placeholder: 'Enter project name',
        colSize: { xs: 12, md: 6, lg: 4 },
      },
    ],
  },
];
