import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ComparisonTable = ({ products, onRemoveProduct, onAddProduct }) => {
  const [expandedCategories, setExpandedCategories] = useState({
    performance: true,
    design: false,
    connectivity: false,
    features: false
  });

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev?.[category]
    }));
  };

  const specificationCategories = {
    performance: {
      title: 'Performance',
      specs: ['processor', 'ram', 'storage', 'battery', 'display']
    },
    design: {
      title: 'Design & Build',
      specs: ['dimensions', 'weight', 'material', 'colors', 'waterResistance']
    },
    connectivity: {
      title: 'Connectivity',
      specs: ['wifi', 'bluetooth', 'cellular', 'ports', 'wireless']
    },
    features: {
      title: 'Features',
      specs: ['camera', 'biometric', 'audio', 'sensors', 'extras']
    }
  };

  const getSpecValue = (product, spec) => {
    return product?.specifications?.[spec] || 'N/A';
  };

  const renderStarRating = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="Star"
            size={14}
            className={`${
              star <= rating 
                ? 'text-warning fill-current' :'text-border'
            }`}
          />
        ))}
        <span className="text-sm text-text-secondary ml-1">({rating})</span>
      </div>
    );
  };

  if (products?.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-lg p-12 text-center">
        <Icon name="GitCompare" size={48} className="text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">No Products to Compare</h3>
        <p className="text-text-secondary mb-6">Add products to start comparing their features and specifications.</p>
        <Button onClick={onAddProduct} variant="outline">
          <Icon name="Plus" size={16} className="mr-2" />
          Add Products
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="border-b border-border bg-muted">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
          <div className="font-medium text-text-primary">Specifications</div>
          {products?.map((product) => (
            <div key={product?.id} className="space-y-4">
              {/* Product Image */}
              <div className="w-full h-32 rounded-lg overflow-hidden bg-background">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="font-medium text-text-primary text-sm leading-tight">
                  {product?.name}
                </h3>
                <div className="text-lg font-semibold text-primary font-data">
                  {product?.price}
                </div>
                {renderStarRating(product?.rating)}
                <div className="text-xs text-text-secondary">
                  {product?.brand}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-2">
                <Button
                  size="sm"
                  onClick={() => window.open(product?.affiliateLink, '_blank')}
                  className="w-full"
                >
                  <Icon name="ExternalLink" size={14} className="mr-2" />
                  Buy Now
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveProduct(product?.id)}
                  className="w-full text-error hover:text-error hover:bg-error/10"
                >
                  <Icon name="Trash2" size={14} className="mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Specifications Table */}
      <div className="divide-y divide-border">
        {Object.entries(specificationCategories)?.map(([categoryKey, category]) => (
          <div key={categoryKey}>
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(categoryKey)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors duration-150"
            >
              <h4 className="font-medium text-text-primary">{category?.title}</h4>
              <Icon
                name={expandedCategories?.[categoryKey] ? "ChevronUp" : "ChevronDown"}
                size={18}
                className="text-text-secondary"
              />
            </button>

            {/* Category Specifications */}
            {expandedCategories?.[categoryKey] && (
              <div className="divide-y divide-border">
                {category?.specs?.map((spec) => (
                  <div key={spec} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 hover:bg-muted/50 transition-colors duration-150">
                    <div className="font-medium text-text-secondary capitalize">
                      {spec?.replace(/([A-Z])/g, ' $1')?.trim()}
                    </div>
                    {products?.map((product) => (
                      <div key={`${product?.id}-${spec}`} className="text-text-primary">
                        {getSpecValue(product, spec)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Add More Products */}
      {products?.length < 4 && (
        <div className="border-t border-border p-6 bg-muted/30">
          <Button
            variant="outline"
            onClick={onAddProduct}
            className="w-full md:w-auto"
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Add Another Product ({products?.length}/4)
          </Button>
        </div>
      )}
    </div>
  );
};

export default ComparisonTable;