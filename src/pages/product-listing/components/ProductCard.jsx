import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onCompareToggle, isComparing = false }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product-detail?id=${product?.id}`);
  };

  const handleCompareChange = (e) => {
    e?.stopPropagation();
    onCompareToggle(product?.id, e?.target?.checked);
  };

  const handleBuyClick = (e) => {
    e?.stopPropagation();
    // Simulate affiliate link redirect
    window.open(product?.affiliateLink, '_blank', 'noopener,noreferrer');
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={14} className="text-warning fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="Star" size={14} className="text-warning fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-border" />
      );
    }

    return stars;
  };

  return (
    <div className="tech-card group cursor-pointer" onClick={handleProductClick}>
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
        <Image
          src={product?.image}
          alt={product?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onLoad={() => setIsImageLoading(false)}
        />
        
        {isImageLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <Icon name="Package" size={32} className="text-text-secondary" />
          </div>
        )}

        {/* Compare Checkbox */}
        <div className="absolute top-3 left-3">
          <label className="flex items-center space-x-2 bg-surface/90 backdrop-blur-sm rounded-md px-2 py-1 cursor-pointer">
            <input
              type="checkbox"
              checked={isComparing}
              onChange={handleCompareChange}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
            />
            <span className="text-xs text-text-primary">Compare</span>
          </label>
        </div>

        {/* Badge */}
        {product?.badge && (
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-md ${
              product?.badge === 'New' ? 'bg-success text-success-foreground' :
              product?.badge === 'Sale' ? 'bg-error text-error-foreground' :
              'bg-accent text-accent-foreground'
            }`}>
              {product?.badge}
            </span>
          </div>
        )}
      </div>
      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Brand */}
        <div className="text-xs text-text-secondary font-medium uppercase tracking-wide">
          {product?.brand}
        </div>

        {/* Product Name */}
        <h3 className="font-medium text-text-primary line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {product?.name}
        </h3>

        {/* Summary */}
        <p className="text-sm text-text-secondary line-clamp-2">
          {product?.summary}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {renderRatingStars(product?.rating)}
          </div>
          <span className="text-sm text-text-secondary">
            ({product?.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            {product?.originalPrice && product?.originalPrice !== product?.price && (
              <div className="text-sm text-text-secondary line-through">
                ${product?.originalPrice}
              </div>
            )}
            <div className="text-lg font-semibold text-text-primary font-data">
              ${product?.price}
            </div>
          </div>
          
          {product?.discount && (
            <div className="text-sm font-medium text-success">
              Save {product?.discount}%
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleProductClick}
            className="flex-1"
          >
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleBuyClick}
            iconName="ExternalLink"
            iconPosition="right"
            iconSize={14}
            className="flex-1"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;