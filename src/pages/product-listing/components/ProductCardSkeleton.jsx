import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className="tech-card animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square bg-muted rounded-t-lg"></div>
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Brand */}
        <div className="h-3 bg-muted rounded w-16"></div>
        
        {/* Product Name */}
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
        </div>
        
        {/* Summary */}
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded w-full"></div>
          <div className="h-3 bg-muted rounded w-2/3"></div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {Array.from({ length: 5 })?.map((_, i) => (
              <div key={i} className="w-3 h-3 bg-muted rounded"></div>
            ))}
          </div>
          <div className="h-3 bg-muted rounded w-12"></div>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-muted rounded w-20"></div>
          <div className="h-4 bg-muted rounded w-16"></div>
        </div>
        
        {/* Buttons */}
        <div className="flex space-x-2 pt-2">
          <div className="h-8 bg-muted rounded flex-1"></div>
          <div className="h-8 bg-muted rounded flex-1"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;