import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProductImageGallery = ({ images, productName }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    setIsZoomed(false);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex(prev => 
      prev === 0 ? images?.length - 1 : prev - 1
    );
    setIsZoomed(false);
  };

  const handleNextImage = () => {
    setSelectedImageIndex(prev => 
      prev === images?.length - 1 ? 0 : prev + 1
    );
    setIsZoomed(false);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-muted rounded-lg overflow-hidden aspect-square">
        <Image
          src={images?.[selectedImageIndex]}
          alt={`${productName} - Image ${selectedImageIndex + 1}`}
          className={`w-full h-full object-cover transition-transform duration-300 cursor-zoom-in ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          onClick={toggleZoom}
        />
        
        {/* Navigation Arrows */}
        {images?.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background text-text-primary rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background text-text-primary rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </>
        )}

        {/* Zoom Indicator */}
        <div className="absolute top-2 right-2 bg-background/80 text-text-secondary rounded-full p-2 backdrop-blur-sm">
          <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={16} />
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 bg-background/80 text-text-secondary text-sm px-2 py-1 rounded backdrop-blur-sm">
          {selectedImageIndex + 1} / {images?.length}
        </div>
      </div>
      {/* Thumbnail Navigation */}
      {images?.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images?.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === selectedImageIndex
                  ? 'border-primary' :'border-border hover:border-primary/50'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;