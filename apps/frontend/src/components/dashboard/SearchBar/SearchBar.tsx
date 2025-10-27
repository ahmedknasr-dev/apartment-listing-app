import { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Collapse } from 'react-bootstrap';
import { ListApartmentsQueryDto } from '@apartment-listing/shared';
import { SearchBarProps } from '../shared/models';
import { primaryFilters, advancedFilterGroups } from './search-bar.config';
import FilterFieldComponent from './FilterField';

export default function SearchBar({ filters, onSearch, onReset }: SearchBarProps) {
  const [localFilters, setLocalFilters] = useState<Partial<ListApartmentsQueryDto>>(filters);
  const [showAdvanced, setShowAdvanced] = useState(false);

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
    setShowAdvanced(false);
  };

  return (
    <Form onSubmit={handleSubmit} className="bg-white border rounded-3 shadow-sm p-3 p-md-4">
      {/* Primary Search Row */}
      <Row className="g-3 mb-3 align-items-end">
        {primaryFilters.map((filterConfig) => (
          <FilterFieldComponent
            key={filterConfig.field}
            config={filterConfig}
            value={localFilters[filterConfig.field]}
            onChange={handleChange}
          />
        ))}

        <Col xs={6} sm={4} md={6} lg={2}>
          <Button type="submit" variant="primary" size="lg" className="w-100">
            <i className="bi bi-search me-2"></i>Search
          </Button>
        </Col>
        <Col xs={6} sm={4} md={6} lg={1}>
          <Button type="button" variant="outline-secondary" size="lg" className="w-100" onClick={handleReset}>
            <i className="bi bi-arrow-clockwise"></i>
          </Button>
        </Col>
      </Row>

      {/* Advanced Filters Toggle */}
      <div className="py-2 border-top mt-2">
        <Button
          variant="link"
          className="p-0 text-decoration-none d-flex align-items-center fw-semibold"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <i className={`bi bi-${showAdvanced ? 'chevron-up' : 'chevron-down'} me-2`}></i>
          <span>{showAdvanced ? 'Hide' : 'Show'} Advanced Filters</span>
        </Button>
      </div>

      {/* Advanced Filters */}
      <Collapse in={showAdvanced}>
        <div className="pt-4">
          {/* Advanced Filter Groups */}
          {advancedFilterGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="bg-light rounded-3 p-3 p-md-4 mb-3">
              {group.title && (
                <div className="d-flex align-items-center mb-3">
                  {group.icon && (
                    <div
                      className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 me-3"
                      style={{ width: '40px', height: '40px' }}
                    >
                      <i className={`${group.icon} text-primary fs-5`}></i>
                    </div>
                  )}
                  <h6 className="mb-0 fw-bold text-dark">{group.title}</h6>
                </div>
              )}
              <Row className="g-3">
                {group.fields.map((filterConfig) => (
                  <FilterFieldComponent
                    key={filterConfig.field}
                    config={filterConfig}
                    value={localFilters[filterConfig.field]}
                    onChange={handleChange}
                  />
                ))}
              </Row>
            </div>
          ))}
        </div>
      </Collapse>
    </Form>
  );
}
