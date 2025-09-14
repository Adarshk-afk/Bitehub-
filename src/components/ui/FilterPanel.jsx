import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import { Checkbox, CheckboxGroup } from './Checkbox';

const FilterPanel = ({ 
  isOpen = true, 
  onToggle, 
  onFiltersChange,
  className = "",
  position = 'sidebar' // 'sidebar', 'modal', 'inline'
}) => {
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: { min: '', max: '' },
    rating: '',
    brands: [],
    features: [],
    sortBy: 'relevance'
  });

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Mock filter options
  const filterOptions = {
    categories: [
      { value: 'smartphones', label: 'Smartphones' },
      { value: 'laptops', label: 'Laptops' },
      { value: 'tablets', label: 'Tablets' },
      { value: 'headphones', label: 'Headphones' },
      { value: 'smartwatches', label: 'Smartwatches' },
      { value: 'gaming', label: 'Gaming' }
    ],
    brands: [
      { value: 'apple', label: 'Apple' },
      { value: 'samsung', label: 'Samsung' },
      { value: 'google', label: 'Google' },
      { value: 'microsoft', label: 'Microsoft' },
      { value: 'sony', label: 'Sony' },
      { value: 'dell', label: 'Dell' }
    ],
    features: [
      { value: 'wireless-charging', label: 'Wireless Charging' },
      { value: 'water-resistant', label: 'Water Resistant' },
      { value: '5g-ready', label: '5G Ready' },
      { value: 'fast-charging', label: 'Fast Charging' },
      { value: 'fingerprint', label: 'Fingerprint Scanner' },
      { value: 'face-unlock', label: 'Face Unlock' }
    ],
    sortOptions: [
      { value: 'relevance', label: 'Most Relevant' },
      { value: 'price-low', label: 'Price: Low to High' },
      { value: 'price-high', label: 'Price: High to Low' },
      { value: 'rating', label: 'Highest Rated' },
      { value: 'newest', label: 'Newest First' },
      { value: 'popular', label: 'Most Popular' }
    ],
    ratingOptions: [
      { value: '4', label: '4+ Stars' },
      { value: '3', label: '3+ Stars' },
      { value: '2', label: '2+ Stars' },
      { value: '1', label: '1+ Stars' }
    ]
  };

  useEffect(() => {
    // Count active filters
    let count = 0;
    if (filters?.categories?.length > 0) count++;
    if (filters?.priceRange?.min || filters?.priceRange?.max) count++;
    if (filters?.rating) count++;
    if (filters?.brands?.length > 0) count++;
    if (filters?.features?.length > 0) count++;
    if (filters?.sortBy !== 'relevance') count++;
    
    setActiveFiltersCount(count);
  }, [filters]);

  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  }, [filters, onFiltersChange]);

  const handleCategoryChange = (categoryValue, checked) => {
    setFilters(prev => ({
      ...prev,
      categories: checked 
        ? [...prev?.categories, categoryValue]
        : prev?.categories?.filter(c => c !== categoryValue)
    }));
  };

  const handleBrandChange = (brandValue, checked) => {
    setFilters(prev => ({
      ...prev,
      brands: checked 
        ? [...prev?.brands, brandValue]
        : prev?.brands?.filter(b => b !== brandValue)
    }));
  };

  const handleFeatureChange = (featureValue, checked) => {
    setFilters(prev => ({
      ...prev,
      features: checked 
        ? [...prev?.features, featureValue]
        : prev?.features?.filter(f => f !== featureValue)
    }));
  };

  const handlePriceRangeChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev?.priceRange,
        [field]: value
      }
    }));
  };

  const handleRatingChange = (value) => {
    setFilters(prev => ({
      ...prev,
      rating: value
    }));
  };

  const handleSortChange = (value) => {
    setFilters(prev => ({
      ...prev,
      sortBy: value
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      priceRange: { min: '', max: '' },
      rating: '',
      brands: [],
      features: [],
      sortBy: 'relevance'
    });
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
        
        {position === 'modal' && onToggle && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggle(false)}
            className="text-text-secondary hover:text-text-primary"
          >
            <Icon name="X" size={18} />
          </Button>
        )}
      </div>

      {/* Sort By */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-primary">Sort By</h4>
        <Select
          options={filterOptions?.sortOptions}
          value={filters?.sortBy}
          onChange={handleSortChange}
          placeholder="Select sorting"
        />
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-primary">Categories</h4>
        <CheckboxGroup>
          {filterOptions?.categories?.map((category) => (
            <Checkbox
              key={category?.value}
              label={category?.label}
              checked={filters?.categories?.includes(category?.value)}
              onChange={(e) => handleCategoryChange(category?.value, e?.target?.checked)}
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
            placeholder="Min"
            value={filters?.priceRange?.min}
            onChange={(e) => handlePriceRangeChange('min', e?.target?.value)}
            className="text-sm"
          />
          <Input
            type="number"
            placeholder="Max"
            value={filters?.priceRange?.max}
            onChange={(e) => handlePriceRangeChange('max', e?.target?.value)}
            className="text-sm"
          />
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-primary">Minimum Rating</h4>
        <Select
          options={[{ value: '', label: 'Any Rating' }, ...filterOptions?.ratingOptions]}
          value={filters?.rating}
          onChange={handleRatingChange}
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
              checked={filters?.brands?.includes(brand?.value)}
              onChange={(e) => handleBrandChange(brand?.value, e?.target?.checked)}
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
              checked={filters?.features?.includes(feature?.value)}
              onChange={(e) => handleFeatureChange(feature?.value, e?.target?.checked)}
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
          >
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );

  if (position === 'modal') {
    return isOpen ? (
      <div className="fixed inset-0 z-300">
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => onToggle && onToggle(false)}></div>
        <div className="fixed top-0 left-0 h-full w-80 bg-surface border-r border-border shadow-custom-lg overflow-y-auto">
          <div className="p-6">
            {renderFilterContent()}
          </div>
        </div>
      </div>
    ) : null;
  }

  if (position === 'inline') {
    return (
      <div className={`bg-surface border border-border rounded-lg p-6 ${className}`}>
        {renderFilterContent()}
      </div>
    );
  }

  // Sidebar position (default)
  return (
    <div className={`filter-panel ${className}`}>
      <div className="sticky top-20 p-6 max-h-[calc(100vh-5rem)] overflow-y-auto">
        {renderFilterContent()}
      </div>
    </div>
  );
};

export default FilterPanel;