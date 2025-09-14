import React from 'react';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import Icon from '../../../components/AppIcon';


const ProductGrid = ({ 
  products = [], 
  isLoading = false, 
  comparedProducts = [], 
  onCompareToggle,
  className = "" 
}) => {
  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
        {Array.from({ length: 12 })?.map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="Package" size={32} className="text-text-secondary" />
        </div>
        <h3 className="text-lg font-medium text-text-primary mb-2">No products found</h3>
        <p className="text-text-secondary max-w-md">
          Try adjusting your filters or search terms to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {products?.map((product) => (
        <ProductCard
          key={product?.id}
          product={product}
          isComparing={comparedProducts?.includes(product?.id)}
          onCompareToggle={() => onCompareToggle?.(product?.id)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;