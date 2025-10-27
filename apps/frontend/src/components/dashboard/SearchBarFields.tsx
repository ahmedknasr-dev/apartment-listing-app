import { Form, Col, InputGroup } from 'react-bootstrap';
import { TextInputFieldProps, NumberInputFieldProps } from './models';

export function TextInputField({ label, field, placeholder, value, onChange, colSize }: TextInputFieldProps) {
  return (
    <Col xs={colSize?.xs || 12} md={colSize?.md || 6} lg={colSize?.lg || 4}>
      <Form.Group>
        <Form.Label className="small fw-semibold">{label}</Form.Label>
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
        />
      </Form.Group>
    </Col>
  );
}

export function NumberInputField({
  label,
  field,
  placeholder,
  value,
  onChange,
  colSize,
  prefix,
}: NumberInputFieldProps) {
  const control = (
    <Form.Control
      type="number"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(field, Number(e.target.value))}
      min="0"
    />
  );

  return (
    <Col xs={colSize?.xs || 12} md={colSize?.md || 6} lg={colSize?.lg || 3}>
      <Form.Group>
        <Form.Label className="small fw-semibold">{label}</Form.Label>
        {prefix ? (
          <InputGroup>
            <InputGroup.Text>{prefix}</InputGroup.Text>
            {control}
          </InputGroup>
        ) : (
          control
        )}
      </Form.Group>
    </Col>
  );
}
