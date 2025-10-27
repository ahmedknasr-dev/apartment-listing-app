import { useState, useRef } from 'react';
import { Button, Form, Row, Col, Spinner, Image } from 'react-bootstrap';
import { useUploadFacade } from '@/facade/uploadFacade';
import { ImageUploadProps } from '../shared/models';

export default function ImageUpload({ images, onChange, disabled }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImages } = useUploadFacade();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      setIsUploading(true);
      const response = await uploadImages(files);
      const newImages = [...images, ...response.urls];
      onChange(newImages);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  return (
    <Form.Group>
      <Form.Label>Images</Form.Label>

      {images.length > 0 && (
        <Row className="g-2 mb-3">
          {images.map((image, index) => (
            <Col xs={6} sm={4} md={3} key={index}>
              <div className="position-relative">
                <Image
                  src={image}
                  alt={`Preview ${index + 1}`}
                  thumbnail
                  className="w-100"
                  style={{ height: '150px', objectFit: 'cover' }}
                />
                <Button
                  variant="danger"
                  size="sm"
                  className="position-absolute top-0 end-0 m-1"
                  onClick={() => handleRemoveImage(index)}
                  disabled={disabled || isUploading}
                >
                  ×
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      )}

      <div className="d-flex gap-2 align-items-center">
        <Form.Control
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          disabled={disabled || isUploading}
        />
        {isUploading && (
          <Spinner animation="border" size="sm" variant="primary" role="status">
            <span className="visually-hidden">Uploading...</span>
          </Spinner>
        )}
      </div>

      <Form.Text className="text-muted">You can upload multiple images. Supported formats: JPG, PNG, GIF</Form.Text>
    </Form.Group>
  );
}
