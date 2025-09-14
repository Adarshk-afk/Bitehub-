import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, viewMode = 'grid', onAddToComparison, onAddToWishlist }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isInComparison, setIsInComparison] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product-detail?id=${product?.id}`);
  };

  const handleAddToComparison = (e) => {
    e?.stopPropagation();
    setIsInComparison(!isInComparison);
    if (onAddToComparison) {
      onAddToComparison(product);
    }
  };

  const handleAddToWishlist = (e) => {
    e?.stopPropagation();
    setIsInWishlist(!isInWishlist);
    if (onAddToWishlist) {
      onAddToWishlist(product);
    }
  };

  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(product?.rating);
    const hasHalfStar = product?.rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={14} className="text-warning fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="StarHalf" size={14} className="text-warning fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(product?.rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-border" />
      );
    }

    return stars;
  };

  const formatPrice = (price) => {
    if (typeof price === 'object' && price?.min && price?.max) {
      return `$${price?.min?.toLocaleString()} - $${price?.max?.toLocaleString()}`;
    }
    return `$${price?.toLocaleString()}`;
  };

  if (viewMode === 'list') {
    return (
      <div 
        className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
        onClick={handleProductClick}
      >
        <div className="flex space-x-4">
          {/* Product Image */}
          <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
            <Image
              src={product?.image}
              alt={product?.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              onLoad={() => setIsImageLoading(false)}
            />
            {isImageLoading && (
              <div className="w-full h-full bg-muted animate-pulse"></div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors duration-200 truncate">
                  {product?.name}
                </h3>
                <p className="text-sm text-text-secondary mt-1">{product?.brand}</p>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleAddToWishlist}
                  className={`${isInWishlist ? 'text-error' : 'text-text-secondary'} hover:text-error`}
                >
                  <Icon name={isInWishlist ? "Heart" : "Heart"} size={16} className={isInWishlist ? "fill-current" : ""} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleAddToComparison}
                  className={`${isInComparison ? 'text-primary' : 'text-text-secondary'} hover:text-primary`}
                >
                  <Icon name="GitCompare" size={16} />
                </Button>
              </div>
            </div>

            <p className="text-sm text-text-secondary line-clamp-2 mb-3">
              {product?.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {renderRating()}
                  <span className="text-sm text-text-secondary ml-1">
                    ({product?.reviewCount})
                  </span>
                </div>
                
                {product?.badge && (
                  <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                    {product?.badge}
                  </span>
                )}
              </div>

              <div className="text-right">
                <div className="text-lg font-semibold text-text-primary font-data">
                  {formatPrice(product?.price)}
                </div>
                {product?.originalPrice && (
                  <div className="text-sm text-text-secondary line-through">
                    ${product?.originalPrice?.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div 
      className="tech-card p-4 cursor-pointer group"
      onClick={handleProductClick}
    >
      {/* Product Image */}
      <div className="relative mb-4">
        <div className="aspect-square rounded-lg overflow-hidden bg-muted">
          <Image
            src={product?.image}
            alt={product?.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onLoad={() => setIsImageLoading(false)}
          />
          {isImageLoading && (
            <div className="w-full h-full bg-muted animate-pulse"></div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAddToWishlist}
            className={`bg-surface/90 backdrop-blur-sm ${isInWishlist ? 'text-error' : 'text-text-secondary'} hover:text-error`}
          >
            <Icon name="Heart" size={16} className={isInWishlist ? "fill-current" : ""} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAddToComparison}
            className={`bg-surface/90 backdrop-blur-sm ${isInComparison ? 'text-primary' : 'text-text-secondary'} hover:text-primary`}
          >
            <Icon name="GitCompare" size={16} />
          </Button>
        </div>

        {/* Badge */}
        {product?.badge && (
          <div className="absolute top-2 left-2">
            <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
              {product?.badge}
            </span>
          </div>
        )}
      </div>
      {/* Product Info */}
      <div className="space-y-3">
        <div>
          <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {product?.name}
          </h3>
          <p className="text-sm text-text-secondary mt-1">{product?.brand}</p>
        </div>

        <div className="flex items-center space-x-1">
          {renderRating()}
          <span className="text-sm text-text-secondary ml-1">
            ({product?.reviewCount})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold text-text-primary font-data">
              {formatPrice(product?.price)}
            </div>
            {product?.originalPrice && (
              <div className="text-sm text-text-secondary line-through">
                ${product?.originalPrice?.toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;