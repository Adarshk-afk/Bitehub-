import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MobileComparisonView = ({ products, onRemoveProduct, onAddProduct }) => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'performance', label: 'Performance', icon: 'Zap' },
    { id: 'design', label: 'Design', icon: 'Palette' },
    { id: 'connectivity', label: 'Connectivity', icon: 'Wifi' },
    { id: 'features', label: 'Features', icon: 'Star' }
  ];

  const specificationCategories = {
    performance: ['processor', 'ram', 'storage', 'battery', 'display'],
    design: ['dimensions', 'weight', 'material', 'colors', 'waterResistance'],
    connectivity: ['wifi', 'bluetooth', 'cellular', 'ports', 'wireless'],
    features: ['camera', 'biometric', 'audio', 'sensors', 'extras']
  };

  const nextProduct = () => {
    setCurrentProductIndex((prev) => 
      prev < products?.length - 1 ? prev + 1 : 0
    );
  };

  const prevProduct = () => {
    setCurrentProductIndex((prev) => 
      prev > 0 ? prev - 1 : products?.length - 1
    );
  };

  const renderStarRating = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="Star"
            size={16}
            className={`${
              star <= rating 
                ? 'text-warning fill-current' :'text-border'
            }`}
          />
        ))}
        <span className="text-sm text-text-secondary ml-2">({rating})</span>
      </div>
    );
  };

  const getSpecValue = (product, spec) => {
    return product?.specifications?.[spec] || 'N/A';
  };

  if (products?.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-lg p-8 text-center">
        <Icon name="GitCompare" size={48} className="text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">No Products to Compare</h3>
        <p className="text-text-secondary mb-6">Add products to start comparing their features.</p>
        <Button onClick={onAddProduct} variant="outline">
          <Icon name="Plus" size={16} className="mr-2" />
          Add Products
        </Button>
      </div>
    );
  }

  const currentProduct = products?.[currentProductIndex];

  return (
    <div className="space-y-6">
      {/* Product Navigation */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="GitCompare" size={18} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">
              {currentProductIndex + 1} of {products?.length}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevProduct}
              disabled={products?.length <= 1}
              className="w-8 h-8"
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextProduct}
              disabled={products?.length <= 1}
              className="w-8 h-8"
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>

        {/* Product Dots */}
        <div className="flex justify-center space-x-2">
          {products?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentProductIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-150 ${
                index === currentProductIndex ? 'bg-primary' : 'bg-border'
              }`}
            />
          ))}
        </div>
      </div>
      {/* Current Product Card */}
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        {/* Product Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-background flex-shrink-0">
              <Image
                src={currentProduct?.image}
                alt={currentProduct?.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-medium text-text-primary mb-1">
                {currentProduct?.name}
              </h2>
              <div className="text-xl font-semibold text-primary font-data mb-2">
                {currentProduct?.price}
              </div>
              {renderStarRating(currentProduct?.rating)}
              <div className="text-sm text-text-secondary mt-1">
                {currentProduct?.brand}
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveProduct(currentProduct?.id)}
              className="text-error hover:text-error hover:bg-error/10 flex-shrink-0"
            >
              <Icon name="Trash2" size={16} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-150 ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-text-secondary mb-1">Processor</div>
                  <div className="text-text-primary font-medium">
                    {getSpecValue(currentProduct, 'processor')}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-text-secondary mb-1">RAM</div>
                  <div className="text-text-primary font-medium">
                    {getSpecValue(currentProduct, 'ram')}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-text-secondary mb-1">Storage</div>
                  <div className="text-text-primary font-medium">
                    {getSpecValue(currentProduct, 'storage')}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-text-secondary mb-1">Display</div>
                  <div className="text-text-primary font-medium">
                    {getSpecValue(currentProduct, 'display')}
                  </div>
                </div>
              </div>
              
              <Button
                onClick={() => window.open(currentProduct?.affiliateLink, '_blank')}
                className="w-full mt-6"
              >
                <Icon name="ExternalLink" size={16} className="mr-2" />
                Buy Now
              </Button>
            </div>
          )}

          {activeTab !== 'overview' && (
            <div className="space-y-4">
              {specificationCategories?.[activeTab]?.map((spec) => (
                <div key={spec} className="flex justify-between items-start py-2 border-b border-border last:border-b-0">
                  <div className="text-sm text-text-secondary capitalize">
                    {spec?.replace(/([A-Z])/g, ' $1')?.trim()}
                  </div>
                  <div className="text-text-primary font-medium text-right max-w-[60%]">
                    {getSpecValue(currentProduct, spec)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Add More Products */}
      {products?.length < 4 && (
        <div className="bg-surface border border-border rounded-lg p-6 text-center">
          <Button
            variant="outline"
            onClick={onAddProduct}
            className="w-full"
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Add Another Product ({products?.length}/4)
          </Button>
        </div>
      )}
    </div>
  );
};

export default MobileComparisonView;