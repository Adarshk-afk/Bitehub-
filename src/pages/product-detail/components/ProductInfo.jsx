import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ product, onAddToComparison, onShare }) => {
  const [isInComparison, setIsInComparison] = useState(false);

  const handleAddToComparison = () => {
    setIsInComparison(!isInComparison);
    onAddToComparison(product);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: `Check out this ${product?.category}: ${product?.name}`,
        url: window.location?.href
      });
    } else {
      onShare(product);
    }
  };

  const formatPrice = (price) => {
    if (typeof price === 'object' && price?.min && price?.max) {
      return `$${price?.min?.toLocaleString()} - $${price?.max?.toLocaleString()}`;
    }
    return `$${price?.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Brand and Category */}
      <div className="flex items-center space-x-2 text-sm text-text-secondary">
        <span>{product?.brand}</span>
        <Icon name="ChevronRight" size={14} />
        <span>{product?.category}</span>
      </div>
      {/* Product Name */}
      <div>
        <h1 className="text-3xl font-semibold text-text-primary mb-2">
          {product?.name}
        </h1>
        <p className="text-text-secondary leading-relaxed">
          {product?.description}
        </p>
      </div>
      {/* Rating and Reviews */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5]?.map((star) => (
            <Icon
              key={star}
              name="Star"
              size={18}
              className={`${
                star <= Math.floor(product?.rating)
                  ? 'text-warning fill-current' :'text-border'
              }`}
            />
          ))}
          <span className="text-sm font-medium text-text-primary ml-2">
            {product?.rating}
          </span>
        </div>
        <span className="text-sm text-text-secondary">
          ({product?.reviewCount} reviews)
        </span>
      </div>
      {/* Price */}
      <div className="space-y-2">
        <div className="text-3xl font-bold text-text-primary font-data">
          {formatPrice(product?.price)}
        </div>
        {product?.originalPrice && (
          <div className="flex items-center space-x-2">
            <span className="text-lg text-text-secondary line-through font-data">
              ${product?.originalPrice?.toLocaleString()}
            </span>
            <span className="bg-success text-success-foreground text-sm px-2 py-1 rounded">
              Save ${(product?.originalPrice - (typeof product?.price === 'object' ? product?.price?.min : product?.price))?.toLocaleString()}
            </span>
          </div>
        )}
      </div>
      {/* Key Features */}
      {product?.keyFeatures && product?.keyFeatures?.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-text-primary">Key Features</h3>
          <ul className="space-y-2">
            {product?.keyFeatures?.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-secondary">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Availability */}
      <div className="flex items-center space-x-2">
        <Icon 
          name={product?.inStock ? "CheckCircle" : "XCircle"} 
          size={18} 
          className={product?.inStock ? "text-success" : "text-error"} 
        />
        <span className={`text-sm font-medium ${
          product?.inStock ? "text-success" : "text-error"
        }`}>
          {product?.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="default"
            fullWidth
            iconName="ExternalLink"
            iconPosition="right"
            onClick={() => window.open(product?.affiliateLink, '_blank')}
          >
            Buy Now
          </Button>
          <Button
            variant="outline"
            fullWidth
            iconName={isInComparison ? "Check" : "GitCompare"}
            iconPosition="left"
            onClick={handleAddToComparison}
          >
            {isInComparison ? "Added to Compare" : "Add to Compare"}
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="ghost"
            fullWidth
            iconName="Share"
            iconPosition="left"
            onClick={handleShare}
          >
            Share
          </Button>
          <Button
            variant="ghost"
            fullWidth
            iconName="Heart"
            iconPosition="left"
          >
            Save
          </Button>
        </div>
      </div>
      {/* Trust Signals */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={14} />
            <span>Secure Purchase</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Truck" size={14} />
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="RotateCcw" size={14} />
            <span>30-Day Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;