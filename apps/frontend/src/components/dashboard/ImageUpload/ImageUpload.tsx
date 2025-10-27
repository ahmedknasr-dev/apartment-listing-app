import { useState, useRef, useEffect } from 'react';
import { Button, Form, Row, Col, Image } from 'react-bootstrap';
import { ImageUploadProps } from '../shared/models';
import { getFullImageUrl } from '@/lib/utils/image';

interface ImagePreview {
  file: File | null;
  previewUrl: string;
}

export default function ImageUpload({ images, onChange, disabled }: ImageUploadProps) {
  const [previews, setPreviews] = useState<ImagePreview[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize previews from existing images (for edit mode)
  useEffect(() => {
    if (images && images.length > 0 && previews.length === 0) {
      const existingPreviews: ImagePreview[] = images.map((url) => ({
        file: null,
        previewUrl: getFullImageUrl(url),
      }));
      setPreviews(existingPreviews);
    }
  }, [images, previews.length]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Create preview URLs for the selected files
    const newPreviews: ImagePreview[] = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    const updatedPreviews = [...previews, ...newPreviews];
    setPreviews(updatedPreviews);

    // Collect all files (both old and new)
    const allFiles = [...selectedFiles, ...files];
    setSelectedFiles(allFiles);
    onChange(allFiles);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    const preview = previews[index];

    // Revoke the object URL to prevent memory leaks (only for new files)
    if (preview.file) {
      URL.revokeObjectURL(preview.previewUrl);

      // Remove from selected files
      const fileIndex = selectedFiles.indexOf(preview.file);
      if (fileIndex > -1) {
        const updatedFiles = selectedFiles.filter((_, i) => i !== fileIndex);
        setSelectedFiles(updatedFiles);
        onChange(updatedFiles);
      }
    }

    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
  };

  // Cleanup preview URLs on unmount
  useEffect(
    () => () => {
      previews.forEach((preview) => {
        if (preview.file) {
          URL.revokeObjectURL(preview.previewUrl);
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Form.Group>
      <Form.Label>Images</Form.Label>

      {previews.length > 0 && (
        <Row className="g-2 mb-3">
          {previews.map((preview, index) => (
            <Col xs={6} sm={4} md={3} key={index}>
              <div className="position-relative">
                <Image
                  src={preview.previewUrl}
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
                  disabled={disabled}
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
          disabled={disabled}
        />
      </div>

      <Form.Text className="text-muted">
        You can select multiple images. They will be uploaded when you create the apartment.
      </Form.Text>
    </Form.Group>
  );
}
