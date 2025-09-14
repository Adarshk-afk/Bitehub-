import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ReviewFilters = ({ onFiltersChange, totalReviews = 0 }) => {
  const [filters, setFilters] = useState({
    sortBy: 'newest',
    rating: '',
    verified: false,
    withPhotos: false,
    withProsAndCons: false
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest-rating', label: 'Highest Rating' },
    { value: 'lowest-rating', label: 'Lowest Rating' },
    { value: 'most-helpful', label: 'Most Helpful' }
  ];

  const ratingOptions = [
    { value: '', label: 'All Ratings' },
    { value: '5', label: '5 Stars Only' },
    { value: '4', label: '4 Stars & Up' },
    { value: '3', label: '3 Stars & Up' },
    { value: '2', label: '2 Stars & Up' },
    { value: '1', label: '1 Star & Up' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const defaultFilters = {
      sortBy: 'newest',
      rating: '',
      verified: false,
      withPhotos: false,
      withProsAndCons: false
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.rating) count++;
    if (filters?.verified) count++;
    if (filters?.withPhotos) count++;
    if (filters?.withProsAndCons) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-primary" />
          <h3 className="font-medium text-text-primary">Filter Reviews</h3>
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">
            {totalReviews?.toLocaleString()} reviews
          </span>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden text-text-secondary hover:text-text-primary"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Filters */}
      <div className={`space-y-4 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Sort By */}
          <div>
            <Select
              label="Sort By"
              options={sortOptions}
              value={filters?.sortBy}
              onChange={(value) => handleFilterChange('sortBy', value)}
              className="w-full"
            />
          </div>

          {/* Rating Filter */}
          <div>
            <Select
              label="Rating"
              options={ratingOptions}
              value={filters?.rating}
              onChange={(value) => handleFilterChange('rating', value)}
              className="w-full"
            />
          </div>

          {/* Quick Filters */}
          <div className="md:col-span-2 lg:col-span-2">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Quick Filters
            </label>
            <div className="space-y-2">
              <Checkbox
                label="Verified Purchases Only"
                checked={filters?.verified}
                onChange={(e) => handleFilterChange('verified', e?.target?.checked)}
              />
              
              <Checkbox
                label="Reviews with Photos"
                checked={filters?.withPhotos}
                onChange={(e) => handleFilterChange('withPhotos', e?.target?.checked)}
              />
              
              <Checkbox
                label="Reviews with Pros & Cons"
                checked={filters?.withProsAndCons}
                onChange={(e) => handleFilterChange('withProsAndCons', e?.target?.checked)}
              />
            </div>
          </div>
        </div>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex justify-end pt-2 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="text-text-secondary hover:text-text-primary"
            >
              <Icon name="RotateCcw" size={14} className="mr-1" />
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      {/* Filter Summary */}
      {activeFiltersCount > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {filters?.rating && (
              <span className="inline-flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                <Icon name="Star" size={12} />
                <span>{ratingOptions?.find(opt => opt?.value === filters?.rating)?.label}</span>
              </span>
            )}
            
            {filters?.verified && (
              <span className="inline-flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full text-xs">
                <Icon name="ShieldCheck" size={12} />
                <span>Verified</span>
              </span>
            )}
            
            {filters?.withPhotos && (
              <span className="inline-flex items-center space-x-1 bg-accent/10 text-accent px-2 py-1 rounded-full text-xs">
                <Icon name="Camera" size={12} />
                <span>With Photos</span>
              </span>
            )}
            
            {filters?.withProsAndCons && (
              <span className="inline-flex items-center space-x-1 bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs">
                <Icon name="List" size={12} />
                <span>Pros & Cons</span>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewFilters;