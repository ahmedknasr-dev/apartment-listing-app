import { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { ListApartmentsQueryDto } from '@apartment-listing/shared';
import { TextInputField, NumberInputField } from './SearchBarFields';
import { SearchBarProps } from './models';

export default function SearchBar({ filters, onSearch, onReset }: SearchBarProps) {
  const [localFilters, setLocalFilters] = useState<Partial<ListApartmentsQueryDto>>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (field: keyof ListApartmentsQueryDto, value: string | number | boolean) => {
    const updatedFilters = { ...localFilters, [field]: value === '' ? undefined : value };
    setLocalFilters(updatedFilters);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localFilters);
  };

  const handleReset = () => {
    setLocalFilters({});
    onReset();
  };

  return (
    <Form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm mb-4">
      <Row className="g-3">
        <TextInputField
          label="Search"
          field="search"
          placeholder="Search by name, project..."
          value={localFilters.search || ''}
          onChange={handleChange}
        />
        <TextInputField
          label="City"
          field="city"
          placeholder="Enter city"
          value={localFilters.city || ''}
          onChange={handleChange}
        />
        <TextInputField
          label="Project"
          field="project"
          placeholder="Enter project name"
          value={localFilters.project || ''}
          onChange={handleChange}
        />

        <NumberInputField
          label="Min Price"
          field="minPrice"
          placeholder="0"
          value={localFilters.minPrice || ''}
          onChange={handleChange}
          prefix="$"
        />
        <NumberInputField
          label="Max Price"
          field="maxPrice"
          placeholder="Any"
          value={localFilters.maxPrice || ''}
          onChange={handleChange}
          prefix="$"
        />

        <NumberInputField
          label="Min Beds"
          field="minBedrooms"
          placeholder="0"
          value={localFilters.minBedrooms || ''}
          onChange={handleChange}
          colSize={{ xs: 6, md: 4, lg: 2 }}
        />
        <NumberInputField
          label="Max Beds"
          field="maxBedrooms"
          placeholder="Any"
          value={localFilters.maxBedrooms || ''}
          onChange={handleChange}
          colSize={{ xs: 6, md: 4, lg: 2 }}
        />

        <NumberInputField
          label="Min Baths"
          field="minBathrooms"
          placeholder="0"
          value={localFilters.minBathrooms || ''}
          onChange={handleChange}
          colSize={{ xs: 6, md: 4, lg: 2 }}
        />
        <NumberInputField
          label="Max Baths"
          field="maxBathrooms"
          placeholder="Any"
          value={localFilters.maxBathrooms || ''}
          onChange={handleChange}
          colSize={{ xs: 6, md: 4, lg: 2 }}
        />

        <NumberInputField
          label="Min Area (sqft)"
          field="minArea"
          placeholder="0"
          value={localFilters.minArea || ''}
          onChange={handleChange}
        />
        <NumberInputField
          label="Max Area (sqft)"
          field="maxArea"
          placeholder="Any"
          value={localFilters.maxArea || ''}
          onChange={handleChange}
        />

        <Col xs={12} md={6} lg={3}>
          <Form.Group>
            <Form.Label className="small fw-semibold">Availability</Form.Label>
            <Form.Select
              value={localFilters.available === undefined ? '' : localFilters.available ? 'true' : 'false'}
              onChange={(e) => handleChange('available', e.target.value === '' ? '' : e.target.value === 'true')}
            >
              <option value="">All</option>
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={12} lg={3} className="d-flex align-items-end">
          <div className="d-flex gap-2 w-100">
            <Button type="submit" variant="primary" className="flex-fill">
              Search
            </Button>
            <Button type="button" variant="outline-secondary" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
}
