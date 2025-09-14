import React from 'react';
import ProductCard from './ProductCard';

const SearchResultsGrid = ({ 
  products, 
  viewMode = 'grid', 
  isLoading = false,
  onAddToComparison,
  onAddToWishlist 
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 })?.map((_, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-4 animate-pulse">
                <div className="aspect-square bg-muted rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {Array.from({ length: 8 })?.map((_, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-4 animate-pulse">
                <div className="flex space-x-4">
                  <div className="w-24 h-24 bg-muted rounded-lg flex-shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (products?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📱</span>
        </div>
        <h3 className="text-lg font-medium text-text-primary mb-2">
          No products found
        </h3>
        <p className="text-text-secondary">
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard
              key={product?.id}
              product={product}
              viewMode={viewMode}
              onAddToComparison={onAddToComparison}
              onAddToWishlist={onAddToWishlist}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products?.map((product) => (
            <ProductCard
              key={product?.id}
              product={product}
              viewMode={viewMode}
              onAddToComparison={onAddToComparison}
              onAddToWishlist={onAddToWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsGrid;