import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';

const SearchFilters = ({ 
  isOpen = true, 
  onFiltersChange, 
  onClearFilters,
  className = "" 
}) => {
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: { min: '', max: '' },
    rating: '',
    features: [],
    availability: []
  });

  const filterOptions = {
    categories: [
      { value: 'smartphones', label: 'Smartphones', count: 156 },
      { value: 'laptops', label: 'Laptops', count: 89 },
      { value: 'tablets', label: 'Tablets', count: 67 },
      { value: 'headphones', label: 'Headphones', count: 134 },
      { value: 'smartwatches', label: 'Smart Watches', count: 45 },
      { value: 'gaming', label: 'Gaming', count: 78 }
    ],
    brands: [
      { value: 'apple', label: 'Apple', count: 45 },
      { value: 'samsung', label: 'Samsung', count: 67 },
      { value: 'google', label: 'Google', count: 23 },
      { value: 'microsoft', label: 'Microsoft', count: 34 },
      { value: 'sony', label: 'Sony', count: 56 },
      { value: 'dell', label: 'Dell', count: 29 }
    ],
    features: [
      { value: 'wireless-charging', label: 'Wireless Charging', count: 89 },
      { value: 'water-resistant', label: 'Water Resistant', count: 123 },
      { value: '5g-ready', label: '5G Ready', count: 67 },
      { value: 'fast-charging', label: 'Fast Charging', count: 145 },
      { value: 'fingerprint', label: 'Fingerprint Scanner', count: 98 },
      { value: 'face-unlock', label: 'Face Unlock', count: 76 }
    ],
    availability: [
      { value: 'in-stock', label: 'In Stock', count: 234 },
      { value: 'pre-order', label: 'Pre-order', count: 12 },
      { value: 'coming-soon', label: 'Coming Soon', count: 8 }
    ]
  };

  const ratingOptions = [
    { value: '4', label: '4+ Stars' },
    { value: '3', label: '3+ Stars' },
    { value: '2', label: '2+ Stars' },
    { value: '1', label: '1+ Stars' }
  ];

  const handleFilterChange = (filterType, value, checked) => {
    const newFilters = { ...filters };
    
    if (filterType === 'priceRange') {
      newFilters.priceRange = { ...newFilters?.priceRange, ...value };
    } else if (filterType === 'rating') {
      newFilters.rating = value;
    } else {
      if (checked) {
        newFilters[filterType] = [...newFilters?.[filterType], value];
      } else {
        newFilters[filterType] = newFilters?.[filterType]?.filter(item => item !== value);
      }
    }
    
    setFilters(newFilters);
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      categories: [],
      brands: [],
      priceRange: { min: '', max: '' },
      rating: '',
      features: [],
      availability: []
    };
    setFilters(clearedFilters);
    if (onClearFilters) {
      onClearFilters();
    }
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.categories?.length > 0) count++;
    if (filters?.brands?.length > 0) count++;
    if (filters?.priceRange?.min || filters?.priceRange?.max) count++;
    if (filters?.rating) count++;
    if (filters?.features?.length > 0) count++;
    if (filters?.availability?.length > 0) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  if (!isOpen) return null;

  return (
    <div className={`bg-surface border border-border rounded-lg ${className}`}>
      <div className="p-6 space-y-6">
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
          
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-text-secondary hover:text-text-primary"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-primary">Price Range</h4>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters?.priceRange?.min}
              onChange={(e) => handleFilterChange('priceRange', { min: e?.target?.value }, true)}
              className="text-sm"
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters?.priceRange?.max}
              onChange={(e) => handleFilterChange('priceRange', { max: e?.target?.value }, true)}
              className="text-sm"
            />
          </div>
        </div>

        {/* Rating */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-primary">Minimum Rating</h4>
          <div className="space-y-2">
            {ratingOptions?.map((option) => (
              <label key={option?.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={option?.value}
                  checked={filters?.rating === option?.value}
                  onChange={(e) => handleFilterChange('rating', e?.target?.value, true)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">{option?.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-primary">Categories</h4>
          <CheckboxGroup>
            {filterOptions?.categories?.map((category) => (
              <div key={category?.value} className="flex items-center justify-between">
                <Checkbox
                  label={category?.label}
                  checked={filters?.categories?.includes(category?.value)}
                  onChange={(e) => handleFilterChange('categories', category?.value, e?.target?.checked)}
                />
                <span className="text-xs text-text-secondary">({category?.count})</span>
              </div>
            ))}
          </CheckboxGroup>
        </div>

        {/* Brands */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-primary">Brands</h4>
          <CheckboxGroup>
            {filterOptions?.brands?.map((brand) => (
              <div key={brand?.value} className="flex items-center justify-between">
                <Checkbox
                  label={brand?.label}
                  checked={filters?.brands?.includes(brand?.value)}
                  onChange={(e) => handleFilterChange('brands', brand?.value, e?.target?.checked)}
                />
                <span className="text-xs text-text-secondary">({brand?.count})</span>
              </div>
            ))}
          </CheckboxGroup>
        </div>

        {/* Features */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-primary">Features</h4>
          <CheckboxGroup>
            {filterOptions?.features?.map((feature) => (
              <div key={feature?.value} className="flex items-center justify-between">
                <Checkbox
                  label={feature?.label}
                  checked={filters?.features?.includes(feature?.value)}
                  onChange={(e) => handleFilterChange('features', feature?.value, e?.target?.checked)}
                />
                <span className="text-xs text-text-secondary">({feature?.count})</span>
              </div>
            ))}
          </CheckboxGroup>
        </div>

        {/* Availability */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-primary">Availability</h4>
          <CheckboxGroup>
            {filterOptions?.availability?.map((availability) => (
              <div key={availability?.value} className="flex items-center justify-between">
                <Checkbox
                  label={availability?.label}
                  checked={filters?.availability?.includes(availability?.value)}
                  onChange={(e) => handleFilterChange('availability', availability?.value, e?.target?.checked)}
                />
                <span className="text-xs text-text-secondary">({availability?.count})</span>
              </div>
            ))}
          </CheckboxGroup>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;