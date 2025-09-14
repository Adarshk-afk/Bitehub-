import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonBar = ({ 
  comparedProducts = [], 
  onClearComparison, 
  className = "" 
}) => {
  const navigate = useNavigate();

  if (comparedProducts?.length === 0) {
    return null;
  }

  const handleCompare = () => {
    if (comparedProducts?.length >= 2) {
      const productIds = comparedProducts?.join(',');
      navigate(`/product-comparison?products=${productIds}`);
    }
  };

  const handleClear = () => {
    onClearComparison();
  };

  return (
    <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-200 ${className}`}>
      <div className="bg-surface border border-border rounded-lg shadow-custom-lg px-6 py-4 min-w-[320px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="GitCompare" size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-text-primary">
                {comparedProducts?.length} products selected
              </h3>
              <p className="text-sm text-text-secondary">
                {comparedProducts?.length < 2 
                  ? `Select ${2 - comparedProducts?.length} more to compare`
                  : 'Ready to compare'
                }
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              iconName="X"
              iconSize={16}
            >
              Clear
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleCompare}
              disabled={comparedProducts?.length < 2}
              iconName="GitCompare"
              iconPosition="left"
              iconSize={16}
            >
              Compare
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonBar;