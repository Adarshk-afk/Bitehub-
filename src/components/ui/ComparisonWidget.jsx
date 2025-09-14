import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';
import Button from './Button';

const ComparisonWidget = ({ 
  isOpen = false, 
  onToggle, 
  className = "",
  position = 'fixed' // 'fixed', 'sidebar', 'inline'
}) => {
  const [comparisonItems, setComparisonItems] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  // Mock comparison data
  const mockComparisonItems = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      image: '/assets/images/iphone-15-pro.jpg',
      price: '$999',
      rating: 4.8,
      category: 'Smartphones'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      image: '/assets/images/galaxy-s24.jpg',
      price: '$1,199',
      rating: 4.7,
      category: 'Smartphones'
    }
  ];

  useEffect(() => {
    // Load comparison items from localStorage or context
    const savedItems = localStorage.getItem('comparisonItems');
    if (savedItems) {
      try {
        setComparisonItems(JSON.parse(savedItems));
      } catch (error) {
        setComparisonItems(mockComparisonItems);
      }
    } else {
      setComparisonItems(mockComparisonItems);
    }
  }, []);

  useEffect(() => {
    // Save comparison items to localStorage
    localStorage.setItem('comparisonItems', JSON.stringify(comparisonItems));
  }, [comparisonItems]);

  const removeItem = (itemId) => {
    setComparisonItems(prev => prev?.filter(item => item?.id !== itemId));
  };

  const clearAll = () => {
    setComparisonItems([]);
    setIsExpanded(false);
  };

  const goToComparison = () => {
    if (comparisonItems?.length > 0) {
      navigate('/product-comparison');
      if (onToggle) onToggle(false);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (comparisonItems?.length === 0) {
    return null;
  }

  const renderContent = () => (
    <div className="bg-surface border border-border rounded-lg shadow-custom-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="GitCompare" size={18} className="text-primary" />
          <h3 className="font-medium text-text-primary">
            Compare ({comparisonItems?.length})
          </h3>
        </div>
        
        <div className="flex items-center space-x-2">
          {position === 'fixed' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleExpanded}
              className="text-text-secondary hover:text-text-primary"
            >
              <Icon name={isExpanded ? "ChevronDown" : "ChevronUp"} size={16} />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={clearAll}
            className="text-text-secondary hover:text-error"
          >
            <Icon name="Trash2" size={16} />
          </Button>
        </div>
      </div>

      {/* Items List */}
      <div className={`${position === 'fixed' && !isExpanded ? 'hidden' : ''}`}>
        <div className="max-h-80 overflow-y-auto">
          {comparisonItems?.map((item) => (
            <div key={item?.id} className="flex items-center space-x-3 p-3 hover:bg-muted transition-colors duration-150">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-text-primary truncate">
                  {item?.name}
                </h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-text-secondary">{item?.category}</span>
                  <span className="text-xs text-text-secondary">•</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-warning fill-current" />
                    <span className="text-xs text-text-secondary">{item?.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 flex-shrink-0">
                <span className="text-sm font-medium text-text-primary font-data">
                  {item?.price}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item?.id)}
                  className="text-text-secondary hover:text-error w-6 h-6"
                >
                  <Icon name="X" size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Button
            onClick={goToComparison}
            className="w-full"
            disabled={comparisonItems?.length < 2}
          >
            <Icon name="GitCompare" size={16} className="mr-2" />
            Compare Products
          </Button>
          
          {comparisonItems?.length < 2 && (
            <p className="text-xs text-text-secondary text-center mt-2">
              Add at least 2 products to compare
            </p>
          )}
        </div>
      </div>
    </div>
  );

  if (position === 'inline' || position === 'sidebar') {
    return (
      <div className={className}>
        {renderContent()}
      </div>
    );
  }

  // Fixed position (floating widget)
  return (
    <div className={`fixed bottom-6 right-6 w-80 z-300 ${className}`}>
      {renderContent()}
    </div>
  );
};

export default ComparisonWidget;