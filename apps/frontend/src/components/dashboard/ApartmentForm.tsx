import { useState } from 'react';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { CreateApartmentDto } from '@apartment-listing/shared';
import { ApartmentFormProps } from './models';
import ImageUpload from './ImageUpload';

export default function ApartmentForm({ apartment, onSubmit, onCancel, isLoading }: ApartmentFormProps) {
  const getInitialFormData = (): CreateApartmentDto => {
    if (apartment) {
      return {
        unitName: apartment.unitName,
        unitNumber: apartment.unitNumber,
        project: apartment.project,
        description: apartment.description || '',
        address: apartment.address,
        city: apartment.city,
        price: apartment.price,
        bedrooms: apartment.bedrooms,
        bathrooms: apartment.bathrooms,
        area: apartment.area,
        images: apartment.images,
        available: apartment.available,
      };
    }
    return {
      unitName: '',
      unitNumber: '',
      project: '',
      description: '',
      address: '',
      city: '',
      price: 0,
      bedrooms: 1,
      bathrooms: 1,
      area: 0,
      images: [],
      available: true,
    };
  };

  const [formData, setFormData] = useState<CreateApartmentDto>(getInitialFormData());
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof CreateApartmentDto, value: string | number | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.unitName.trim()) newErrors.unitName = 'Unit name is required';
    if (!formData.unitNumber.trim()) newErrors.unitNumber = 'Unit number is required';
    if (!formData.project.trim()) newErrors.project = 'Project is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (formData.bedrooms < 0) newErrors.bedrooms = 'Bedrooms cannot be negative';
    if (formData.bathrooms < 0) newErrors.bathrooms = 'Bathrooms cannot be negative';
    if (formData.area <= 0) newErrors.area = 'Area must be greater than 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {Object.keys(errors).length > 0 && (
        <Alert variant="danger" className="mb-3">
          Please correct the errors below.
        </Alert>
      )}

      <Row className="g-3">
        {/* Unit Name */}
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>
              Unit Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={formData.unitName}
              onChange={(e) => handleChange('unitName', e.target.value)}
              isInvalid={!!errors.unitName}
              disabled={isLoading}
            />
            <Form.Control.Feedback type="invalid">{errors.unitName}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* Unit Number */}
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>
              Unit Number <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={formData.unitNumber}
              onChange={(e) => handleChange('unitNumber', e.target.value)}
              isInvalid={!!errors.unitNumber}
              disabled={isLoading}
            />
            <Form.Control.Feedback type="invalid">{errors.unitNumber}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* Project */}
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>
              Project <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={formData.project}
              onChange={(e) => handleChange('project', e.target.value)}
              isInvalid={!!errors.project}
              disabled={isLoading}
            />
            <Form.Control.Feedback type="invalid">{errors.project}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* City */}
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>
              City <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              isInvalid={!!errors.city}
              disabled={isLoading}
            />
            <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* Address */}
        <Col xs={12}>
          <Form.Group>
            <Form.Label>
              Address <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              isInvalid={!!errors.address}
              disabled={isLoading}
            />
            <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* Price */}
        <Col xs={12} md={4}>
          <Form.Group>
            <Form.Label>
              Price <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              value={formData.price}
              onChange={(e) => handleChange('price', Number(e.target.value))}
              isInvalid={!!errors.price}
              disabled={isLoading}
              min="0"
              step="0.01"
            />
            <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* Bedrooms */}
        <Col xs={6} md={4}>
          <Form.Group>
            <Form.Label>
              Bedrooms <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              value={formData.bedrooms}
              onChange={(e) => handleChange('bedrooms', Number(e.target.value))}
              isInvalid={!!errors.bedrooms}
              disabled={isLoading}
              min="0"
            />
            <Form.Control.Feedback type="invalid">{errors.bedrooms}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* Bathrooms */}
        <Col xs={6} md={4}>
          <Form.Group>
            <Form.Label>
              Bathrooms <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              value={formData.bathrooms}
              onChange={(e) => handleChange('bathrooms', Number(e.target.value))}
              isInvalid={!!errors.bathrooms}
              disabled={isLoading}
              min="0"
            />
            <Form.Control.Feedback type="invalid">{errors.bathrooms}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* Area */}
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>
              Area (sqft) <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              value={formData.area}
              onChange={(e) => handleChange('area', Number(e.target.value))}
              isInvalid={!!errors.area}
              disabled={isLoading}
              min="0"
            />
            <Form.Control.Feedback type="invalid">{errors.area}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* Available */}
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Availability</Form.Label>
            <Form.Select
              value={formData.available ? 'true' : 'false'}
              onChange={(e) => handleChange('available', e.target.value === 'true')}
              disabled={isLoading}
            >
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Description */}
        <Col xs={12}>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              disabled={isLoading}
            />
          </Form.Group>
        </Col>

        {/* Image Upload */}
        <Col xs={12}>
          <ImageUpload
            images={formData.images || []}
            onChange={(images: string[]) => handleChange('images', images)}
            disabled={isLoading}
          />
        </Col>
      </Row>

      {/* Form Actions */}
      <div className="d-flex gap-2 justify-content-end mt-4">
        <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : apartment ? 'Update' : 'Create'}
        </Button>
      </div>
    </Form>
  );
}
