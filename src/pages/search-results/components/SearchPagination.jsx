import React from 'react';

import Button from '../../../components/ui/Button';

const SearchPagination = ({ 
  currentPage, 
  totalPages, 
  totalResults, 
  resultsPerPage, 
  onPageChange 
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range?.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots?.push(1, '...');
    } else {
      rangeWithDots?.push(1);
    }

    rangeWithDots?.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots?.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots?.push(totalPages);
    }

    return rangeWithDots;
  };

  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="bg-surface border-t border-border">
      <div className="px-4 lg:px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Results Info */}
          <div className="text-sm text-text-secondary">
            Showing {startResult?.toLocaleString()} to {endResult?.toLocaleString()} of{' '}
            {totalResults?.toLocaleString()} results
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center space-x-2">
            {/* Previous Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>

            {/* Page Numbers */}
            <div className="hidden sm:flex items-center space-x-1">
              {getVisiblePages()?.map((page, index) => (
                <React.Fragment key={index}>
                  {page === '...' ? (
                    <span className="px-3 py-2 text-text-secondary">...</span>
                  ) : (
                    <Button
                      variant={currentPage === page ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => onPageChange(page)}
                      className="min-w-[40px]"
                    >
                      {page}
                    </Button>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Mobile Page Info */}
            <div className="sm:hidden flex items-center space-x-2">
              <span className="text-sm text-text-secondary">
                Page {currentPage} of {totalPages}
              </span>
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Next
            </Button>
          </div>
        </div>

        {/* Quick Jump (Desktop Only) */}
        <div className="hidden lg:flex items-center justify-center mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-text-secondary">Jump to page:</span>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e?.target?.value);
                if (page >= 1 && page <= totalPages) {
                  onPageChange(page);
                }
              }}
              className="w-16 px-2 py-1 text-center border border-border rounded text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <span className="text-text-secondary">of {totalPages}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPagination;