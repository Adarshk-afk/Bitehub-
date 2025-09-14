import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchResultsHeader = ({ 
  searchQuery, 
  resultCount, 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  onToggleFilters,
  isFiltersOpen 
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant', icon: 'Target' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'TrendingUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'TrendingDown' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'popular', label: 'Most Popular', icon: 'Heart' }
  ];

  const getCurrentSortLabel = () => {
    const option = sortOptions?.find(opt => opt?.value === sortBy);
    return option ? option?.label : 'Most Relevant';
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="px-4 lg:px-6 py-6">
        {/* Search Query & Results Count */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-semibold text-text-primary mb-2">
            Search Results
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-2 text-text-secondary">
              <Icon name="Search" size={18} />
              <span className="text-sm">
                Showing {resultCount?.toLocaleString()} results for
              </span>
              <span className="font-medium text-text-primary">"{searchQuery}"</span>
            </div>
            
            <div className="text-sm text-text-secondary">
              Updated {new Date()?.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left Controls */}
          <div className="flex items-center space-x-3">
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              onClick={onToggleFilters}
              className="lg:hidden"
              iconName="Filter"
              iconPosition="left"
            >
              Filters
              {isFiltersOpen && (
                <Icon name="ChevronUp" size={16} className="ml-1" />
              )}
              {!isFiltersOpen && (
                <Icon name="ChevronDown" size={16} className="ml-1" />
              )}
            </Button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e?.target?.value)}
                className="appearance-none bg-surface border border-border rounded-lg px-4 py-2 pr-10 text-sm font-medium text-text-primary hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
              >
                {sortOptions?.map((option) => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" 
              />
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('grid')}
                iconName="Grid3X3"
              />
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('list')}
                iconName="List"
              />
            </div>

            {/* Results Per Page */}
            <div className="hidden md:flex items-center space-x-2 text-sm text-text-secondary">
              <span>Show:</span>
              <select className="bg-surface border border-border rounded px-2 py-1 text-text-primary">
                <option value="24">24</option>
                <option value="48">48</option>
                <option value="96">96</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsHeader;