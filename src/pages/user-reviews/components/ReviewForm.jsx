import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ReviewForm = ({ onSubmitReview, onCancel, selectedProduct = null }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    comment: '',
    pros: [''],
    cons: [''],
    images: [],
    recommendToFriend: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const recommendOptions = [
    { value: '', label: 'Select recommendation' },
    { value: 'yes', label: 'Yes, I would recommend' },
    { value: 'no', label: 'No, I would not recommend' },
    { value: 'maybe', label: 'Maybe, with reservations' }
  ];

  const handleRatingClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
    if (errors?.rating) {
      setErrors(prev => ({ ...prev, rating: '' }));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleProsConsChange = (type, index, value) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev?.[type]?.map((item, i) => i === index ? value : item)
    }));
  };

  const addProsConsField = (type) => {
    setFormData(prev => ({
      ...prev,
      [type]: [...prev?.[type], '']
    }));
  };

  const removeProsConsField = (type, index) => {
    if (formData?.[type]?.length > 1) {
      setFormData(prev => ({
        ...prev,
        [type]: prev?.[type]?.filter((_, i) => i !== index)
      }));
    }
  };

  const handleImageUpload = (files) => {
    const newImages = Array.from(files)?.slice(0, 5 - formData?.images?.length);
    const imageUrls = newImages?.map(file => URL.createObjectURL(file));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev?.images, ...imageUrls]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev?.images?.filter((_, i) => i !== index)
    }));
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleImageUpload(e?.dataTransfer?.files);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData?.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    
    if (!formData?.title?.trim()) {
      newErrors.title = 'Review title is required';
    }
    
    if (!formData?.comment?.trim()) {
      newErrors.comment = 'Review comment is required';
    } else if (formData?.comment?.trim()?.length < 50) {
      newErrors.comment = 'Review must be at least 50 characters long';
    }
    
    if (!formData?.recommendToFriend) {
      newErrors.recommendToFriend = 'Please select a recommendation';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const reviewData = {
        ...formData,
        pros: formData?.pros?.filter(pro => pro?.trim()),
        cons: formData?.cons?.filter(con => con?.trim()),
        productId: selectedProduct?.id,
        date: new Date()?.toISOString()
      };
      
      await onSubmitReview(reviewData);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1;
      return (
        <button
          key={index}
          type="button"
          onClick={() => handleRatingClick(starNumber)}
          className={`p-1 transition-colors duration-150 ${
            starNumber <= formData?.rating
              ? 'text-warning' :'text-border hover:text-warning/50'
          }`}
        >
          <Icon
            name="Star"
            size={24}
            className={starNumber <= formData?.rating ? 'fill-current' : ''}
          />
        </button>
      );
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-text-primary">Write a Review</h3>
        {onCancel && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="text-text-secondary hover:text-text-primary"
          >
            <Icon name="X" size={20} />
          </Button>
        )}
      </div>
      {/* Selected Product */}
      {selectedProduct && (
        <div className="flex items-center space-x-3 mb-6 p-4 bg-muted rounded-lg">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-background flex-shrink-0">
            <Image
              src={selectedProduct?.image}
              alt={selectedProduct?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-text-primary truncate">
              {selectedProduct?.name}
            </h4>
            <p className="text-sm text-text-secondary">
              {selectedProduct?.category}
            </p>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Overall Rating *
          </label>
          <div className="flex items-center space-x-1">
            {renderStars()}
            {formData?.rating > 0 && (
              <span className="ml-2 text-sm text-text-secondary">
                {formData?.rating} out of 5 stars
              </span>
            )}
          </div>
          {errors?.rating && (
            <p className="mt-1 text-sm text-error">{errors?.rating}</p>
          )}
        </div>

        {/* Title */}
        <Input
          label="Review Title"
          type="text"
          placeholder="Summarize your experience in a few words"
          value={formData?.title}
          onChange={(e) => handleInputChange('title', e?.target?.value)}
          error={errors?.title}
          required
          maxLength={100}
        />

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Detailed Review *
          </label>
          <textarea
            placeholder="Share your detailed experience with this product. What did you like or dislike? How does it perform? Would you recommend it to others?"
            value={formData?.comment}
            onChange={(e) => handleInputChange('comment', e?.target?.value)}
            rows={6}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical min-h-[120px] text-text-primary bg-input"
            maxLength={2000}
          />
          <div className="flex justify-between items-center mt-1">
            {errors?.comment ? (
              <p className="text-sm text-error">{errors?.comment}</p>
            ) : (
              <p className="text-sm text-text-secondary">
                Minimum 50 characters required
              </p>
            )}
            <p className="text-sm text-text-secondary">
              {formData?.comment?.length}/2000
            </p>
          </div>
        </div>

        {/* Pros */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            What did you like? (Pros)
          </label>
          <div className="space-y-2">
            {formData?.pros?.map((pro, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter a positive aspect"
                    value={pro}
                    onChange={(e) => handleProsConsChange('pros', index, e?.target?.value)}
                  />
                </div>
                {formData?.pros?.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeProsConsField('pros', index)}
                    className="text-text-secondary hover:text-error"
                  >
                    <Icon name="X" size={16} />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addProsConsField('pros')}
              className="text-success border-success hover:bg-success/10"
            >
              <Icon name="Plus" size={16} className="mr-1" />
              Add Pro
            </Button>
          </div>
        </div>

        {/* Cons */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            What could be improved? (Cons)
          </label>
          <div className="space-y-2">
            {formData?.cons?.map((con, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter an area for improvement"
                    value={con}
                    onChange={(e) => handleProsConsChange('cons', index, e?.target?.value)}
                  />
                </div>
                {formData?.cons?.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeProsConsField('cons', index)}
                    className="text-text-secondary hover:text-error"
                  >
                    <Icon name="X" size={16} />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addProsConsField('cons')}
              className="text-error border-error hover:bg-error/10"
            >
              <Icon name="Plus" size={16} className="mr-1" />
              Add Con
            </Button>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Add Photos (Optional)
          </label>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
              dragActive
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Icon name="Upload" size={32} className="mx-auto text-text-secondary mb-2" />
            <p className="text-sm text-text-secondary mb-2">
              Drag and drop images here, or click to select
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImageUpload(e?.target?.files)}
              className="hidden"
              id="image-upload"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              Choose Files
            </Button>
            <p className="text-xs text-text-secondary mt-2">
              Maximum 5 images, up to 10MB each
            </p>
          </div>

          {/* Image Preview */}
          {formData?.images?.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mt-4">
              {formData?.images?.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={image}
                    alt={`Upload preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 w-6 h-6 bg-background/80 hover:bg-background text-text-secondary hover:text-error"
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recommendation */}
        <Select
          label="Would you recommend this product to a friend?"
          options={recommendOptions}
          value={formData?.recommendToFriend}
          onChange={(value) => handleInputChange('recommendToFriend', value)}
          error={errors?.recommendToFriend}
          required
        />

        {/* Submit Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;