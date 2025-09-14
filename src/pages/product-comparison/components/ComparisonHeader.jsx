import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonHeader = ({ 
  productCount, 
  onClearAll, 
  onAddProduct, 
  onShareComparison 
}) => {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        {/* Title and Count */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="GitCompare" size={20} color="white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-text-primary">
              Product Comparison
            </h1>
            <p className="text-text-secondary">
              Comparing {productCount} {productCount === 1 ? 'product' : 'products'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          {productCount < 4 && (
            <Button
              variant="outline"
              onClick={onAddProduct}
              className="w-full sm:w-auto"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Add Product
            </Button>
          )}
          
          <Button
            variant="outline"
            onClick={onShareComparison}
            className="w-full sm:w-auto"
          >
            <Icon name="Share2" size={16} className="mr-2" />
            Share
          </Button>
          
          {productCount > 0 && (
            <Button
              variant="outline"
              onClick={onClearAll}
              className="w-full sm:w-auto text-error hover:text-error hover:bg-error/10"
            >
              <Icon name="Trash2" size={16} className="mr-2" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Comparison Tips */}
      {productCount > 0 && (
        <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={18} className="text-accent flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-1">
                Comparison Tips
              </h4>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Click on category headers to expand detailed specifications</li>
                <li>• Use "Buy Now" buttons to visit retailer websites</li>
                <li>• Add up to 4 products for comprehensive comparison</li>
                {productCount >= 2 && (
                  <li>• Look for highlighted differences to make informed decisions</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonHeader;