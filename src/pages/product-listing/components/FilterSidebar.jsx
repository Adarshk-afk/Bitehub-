import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ 
  filters, 
  onFiltersChange, 
  isOpen = true, 
  onToggle,
  className = "" 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Filter options
  const filterOptions = {
    categories: [
      { value: 'smartphones', label: 'Smartphones' },
      { value: 'laptops', label: 'Laptops' },
      { value: 'tablets', label: 'Tablets' },
      { value: 'headphones', label: 'Headphones' },
      { value: 'smartwatches', label: 'Smartwatches' },
      { value: 'gaming', label: 'Gaming Accessories' },
      { value: 'cameras', label: 'Cameras' },
      { value: 'audio', label: 'Audio Equipment' }
    ],
    brands: [
      { value: 'apple', label: 'Apple' },
      { value: 'samsung', label: 'Samsung' },
      { value: 'google', label: 'Google' },
      { value: 'microsoft', label: 'Microsoft' },
      { value: 'sony', label: 'Sony' },
      { value: 'dell', label: 'Dell' },
      { value: 'hp', label: 'HP' },
      { value: 'lenovo', label: 'Lenovo' }
    ],
    features: [
      { value: 'wireless-charging', label: 'Wireless Charging' },
      { value: 'water-resistant', label: 'Water Resistant' },
      { value: '5g-ready', label: '5G Ready' },
      { value: 'fast-charging', label: 'Fast Charging' },
      { value: 'fingerprint', label: 'Fingerprint Scanner' },
      { value: 'face-unlock', label: 'Face Unlock' },
      { value: 'noise-cancelling', label: 'Noise Cancelling' },
      { value: 'bluetooth', label: 'Bluetooth' }
    ],
    ratingOptions: [
      { value: '4', label: '4+ Stars' },
      { value: '3', label: '3+ Stars' },
      { value: '2', label: '2+ Stars' },
      { value: '1', label: '1+ Stars' }
    ]
  };

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  useEffect(() => {
    // Count active filters
    let count = 0;
    if (localFilters?.categories?.length > 0) count++;
    if (localFilters?.priceRange?.min || localFilters?.priceRange?.max) count++;
    if (localFilters?.rating) count++;
    if (localFilters?.brands?.length > 0) count++;
    if (localFilters?.features?.length > 0) count++;
    
    setActiveFiltersCount(count);
  }, [localFilters]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleArrayFilterChange = (key, itemValue, checked) => {
    const currentArray = localFilters?.[key] || [];
    const newArray = checked 
      ? [...currentArray, itemValue]
      : currentArray?.filter(item => item !== itemValue);
    
    handleFilterChange(key, newArray);
  };

  const handlePriceRangeChange = (field, value) => {
    const newPriceRange = {
      ...localFilters?.priceRange,
      [field]: value
    };
    handleFilterChange('priceRange', newPriceRange);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      categories: [],
      priceRange: { min: '', max: '' },
      rating: '',
      brands: [],
      features: []
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const renderFilterContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-primary" />
          <h3 className="font-medium text-text-primary">Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        
        {onToggle && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggle(false)}
            className="text-text-secondary hover:text-text-primary lg:hidden"
          >
            <Icon name="X" size={18} />
          </Button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-primary">Categories</h4>
        <CheckboxGroup>
          {filterOptions?.categories?.map((category) => (
            <Checkbox
              key={category?.value}
              label={category?.label}
              checked={localFilters?.categories?.includes(category?.value) || false}
              onChange={(e) => handleArrayFilterChange('categories', category?.value, e?.target?.checked)}
            />
          ))}
        </CheckboxGroup>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-primary">Price Range</h4>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Min ($)"
            value={localFilters?.priceRange?.min || ''}
            onChange={(e) => handlePriceRangeChange('min', e?.target?.value)}
          />
          <Input
            type="number"
            placeholder="Max ($)"
            value={localFilters?.priceRange?.max || ''}
            onChange={(e) => handlePriceRangeChange('max', e?.target?.value)}
          />
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-primary">Minimum Rating</h4>
        <Select
          options={[{ value: '', label: 'Any Rating' }, ...filterOptions?.ratingOptions]}
          value={localFilters?.rating || ''}
          onChange={(value) => handleFilterChange('rating', value)}
          placeholder="Select rating"
        />
      </div>

      {/* Brands */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-primary">Brands</h4>
        <CheckboxGroup>
          {filterOptions?.brands?.map((brand) => (
            <Checkbox
              key={brand?.value}
              label={brand?.label}
              checked={localFilters?.brands?.includes(brand?.value) || false}
              onChange={(e) => handleArrayFilterChange('brands', brand?.value, e?.target?.checked)}
            />
          ))}
        </CheckboxGroup>
      </div>

      {/* Features */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-primary">Features</h4>
        <CheckboxGroup>
          {filterOptions?.features?.map((feature) => (
            <Checkbox
              key={feature?.value}
              label={feature?.label}
              checked={localFilters?.features?.includes(feature?.value) || false}
              onChange={(e) => handleArrayFilterChange('features', feature?.value, e?.target?.checked)}
            />
          ))}
        </CheckboxGroup>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <div className="pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={clearAllFilters}
            className="w-full"
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:block filter-panel ${className}`}>
        <div className="sticky top-20 p-6 max-h-[calc(100vh-5rem)] overflow-y-auto">
          {renderFilterContent()}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-300 lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => onToggle && onToggle(false)}></div>
          <div className="fixed top-0 left-0 h-full w-80 bg-surface border-r border-border shadow-custom-lg overflow-y-auto">
            <div className="p-6">
              {renderFilterContent()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;