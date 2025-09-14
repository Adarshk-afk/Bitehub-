import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchSuggestions = ({ searchQuery, onSuggestionClick }) => {
  const suggestions = [
    {
      type: 'related',
      title: 'Related Searches',
      items: [
        `${searchQuery} review`,
        `${searchQuery} comparison`,
        `${searchQuery} price`,
        `${searchQuery} specs`,
        `best ${searchQuery}`,
        `${searchQuery} alternatives`
      ]
    },
    {
      type: 'popular',
      title: 'Popular This Week',
      items: [
        'iPhone 15 Pro Max',
        'Samsung Galaxy S24 Ultra',
        'MacBook Air M3',
        'PlayStation 5',
        'Nintendo Switch OLED',
        'AirPods Pro 2'
      ]
    },
    {
      type: 'categories',
      title: 'Browse Categories',
      items: [
        'Smartphones',
        'Laptops',
        'Gaming Consoles',
        'Headphones',
        'Smart Watches',
        'Tablets'
      ]
    }
  ];

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'related':
        return 'Search';
      case 'popular':
        return 'TrendingUp';
      case 'categories':
        return 'Grid3X3';
      default:
        return 'ArrowRight';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Search" size={24} className="text-text-secondary" />
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          No results found for "{searchQuery}"
        </h3>
        <p className="text-text-secondary">
          Try adjusting your search terms or browse our suggestions below
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {suggestions?.map((section) => (
          <div key={section?.type} className="space-y-4">
            <div className="flex items-center space-x-2">
              <Icon name={getSuggestionIcon(section?.type)} size={18} className="text-primary" />
              <h4 className="font-medium text-text-primary">{section?.title}</h4>
            </div>
            
            <div className="space-y-2">
              {section?.items?.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => onSuggestionClick(item)}
                  className="w-full justify-start text-left p-2 h-auto"
                >
                  <Icon name="ArrowRight" size={14} className="mr-2 text-text-secondary" />
                  <span className="text-sm text-text-secondary hover:text-text-primary">
                    {item}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-sm text-text-secondary mb-4">
          Still can't find what you're looking for?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" iconName="MessageCircle" iconPosition="left">
            Contact Support
          </Button>
          <Button variant="outline" iconName="Home" iconPosition="left">
            Browse All Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions;