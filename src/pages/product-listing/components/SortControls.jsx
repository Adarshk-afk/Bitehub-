import React from 'react';

import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SortControls = ({ 
  sortBy, 
  onSortChange, 
  viewMode = 'grid', 
  onViewModeChange,
  resultsCount = 0,
  onFilterToggle,
  className = "" 
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' }
  ];

  const viewModeOptions = [
    { value: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { value: 'list', icon: 'List', label: 'List View' }
  ];

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${className}`}>
      {/* Left Section - Results Count */}
      <div className="flex items-center space-x-4">
        <div className="text-sm text-text-secondary">
          {resultsCount?.toLocaleString()} products found
        </div>
      </div>
      {/* Right Section - Controls */}
      <div className="flex items-center space-x-3">
        {/* Mobile Filter Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={onFilterToggle}
          className="lg:hidden"
          iconName="Filter"
          iconPosition="left"
          iconSize={16}
        >
          Filters
        </Button>

        {/* Sort Dropdown */}
        <div className="min-w-[200px]">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            placeholder="Sort by"
          />
        </div>

        {/* View Mode Toggle */}
        <div className="hidden sm:flex items-center border border-border rounded-lg p-1">
          {viewModeOptions?.map((option) => (
            <Button
              key={option?.value}
              variant={viewMode === option?.value ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange(option?.value)}
              className="px-3"
              iconName={option?.icon}
              iconSize={16}
            >
              <span className="sr-only">{option?.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortControls;