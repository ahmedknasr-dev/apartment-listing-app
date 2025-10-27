import { Form, Col, InputGroup } from 'react-bootstrap';
import { ListApartmentsQueryDto } from '@apartment-listing/shared';
import { FilterField } from './search-bar.types';

interface FilterFieldProps {
  config: FilterField;
  value: string | number | boolean | undefined;
  onChange: (field: keyof ListApartmentsQueryDto, value: string | number | boolean) => void;
}

export default function FilterFieldComponent({ config, value, onChange }: FilterFieldProps) {
  const { field, label, type, placeholder, prefix, colSize, size, options, icon } = config;

  const renderField = () => {
    switch (type) {
      case 'text':
        // Primary search bar styling (with icon, no label)
        if (icon && size === 'lg') {
          return (
            <Form.Group>
              <InputGroup size={size}>
                <InputGroup.Text className="bg-white">
                  <i className={`${icon} text-primary`}></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder={placeholder}
                  value={(value as string) || ''}
                  onChange={(e) => onChange(field, e.target.value)}
                />
              </InputGroup>
            </Form.Group>
          );
        }
        // Advanced filter styling (with label)
        return (
          <Form.Group>
            {label && <Form.Label className="small fw-semibold text-secondary mb-2">{label}</Form.Label>}
            <Form.Control
              type="text"
              placeholder={placeholder}
              value={(value as string) || ''}
              onChange={(e) => onChange(field, e.target.value)}
              size={size}
            />
          </Form.Group>
        );

      case 'number':
        const control = (
          <Form.Control
            type="number"
            placeholder={placeholder}
            value={(value as number) || ''}
            onChange={(e) => onChange(field, Number(e.target.value))}
            min="0"
            size={size}
          />
        );

        return (
          <Form.Group>
            {label && <Form.Label className="small fw-semibold text-secondary mb-2">{label}</Form.Label>}
            {prefix ? (
              <InputGroup size={size}>
                <InputGroup.Text>{prefix}</InputGroup.Text>
                {control}
              </InputGroup>
            ) : (
              control
            )}
          </Form.Group>
        );

      case 'select':
        // Primary search bar styling (with icon, no label)
        if (icon && size === 'lg') {
          return (
            <Form.Group>
              <InputGroup size={size}>
                <InputGroup.Text className="bg-white">
                  <i className={`${icon} text-primary`}></i>
                </InputGroup.Text>
                <Form.Select
                  value={value === undefined ? '' : value === true ? 'true' : value === false ? 'false' : String(value)}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '') {
                      onChange(field, '');
                    } else if (val === 'true' || val === 'false') {
                      onChange(field, val === 'true');
                    } else {
                      onChange(field, val);
                    }
                  }}
                  size={size}
                >
                  {options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </InputGroup>
            </Form.Group>
          );
        }
        // Advanced filter styling (with label)
        return (
          <Form.Group>
            {label && <Form.Label className="small fw-semibold text-secondary mb-2">{label}</Form.Label>}
            <Form.Select
              value={value === undefined ? '' : value === true ? 'true' : value === false ? 'false' : String(value)}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '') {
                  onChange(field, '');
                } else if (val === 'true' || val === 'false') {
                  onChange(field, val === 'true');
                } else {
                  onChange(field, val);
                }
              }}
              size={size}
            >
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        );

      default:
        return null;
    }
  };

  return (
    <Col xs={colSize?.xs || 12} sm={colSize?.sm} md={colSize?.md} lg={colSize?.lg}>
      {renderField()}
    </Col>
  );
}
