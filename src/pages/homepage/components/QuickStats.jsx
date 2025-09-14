import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = () => {
  const stats = [
    {
      id: 1,
      label: 'Products Reviewed',
      value: '5,247',
      icon: 'Package',
      change: '+12%',
      changeType: 'positive',
      description: 'Comprehensive reviews across all categories'
    },
    {
      id: 2,
      label: 'Expert Reviews',
      value: '1,892',
      icon: 'Users',
      change: '+8%',
      changeType: 'positive',
      description: 'In-depth analysis by tech specialists'
    },
    {
      id: 3,
      label: 'User Ratings',
      value: '47.3K',
      icon: 'Star',
      change: '+23%',
      changeType: 'positive',
      description: 'Community-driven product ratings'
    },
    {
      id: 4,
      label: 'Categories',
      value: '24',
      icon: 'Grid3X3',
      change: '+2',
      changeType: 'neutral',
      description: 'Tech categories and subcategories'
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'positive':
        return 'TrendingUp';
      case 'negative':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  return (
    <section className="bg-muted/50 rounded-2xl p-6 lg:p-8">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-text-primary">
          Trusted by Tech Enthusiasts
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Join thousands of users who rely on BiteHub for honest, comprehensive tech reviews and comparisons
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats?.map((stat) => (
          <div
            key={stat?.id}
            className="bg-card border border-border rounded-xl p-6 text-center space-y-4 hover:shadow-custom-md transition-shadow duration-200"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
              <Icon name={stat?.icon} size={24} className="text-primary" />
            </div>
            
            <div className="space-y-2">
              <div className="text-3xl font-bold text-text-primary font-data">
                {stat?.value}
              </div>
              <div className="text-sm font-medium text-text-primary">
                {stat?.label}
              </div>
            </div>

            <div className="flex items-center justify-center space-x-1">
              <Icon 
                name={getChangeIcon(stat?.changeType)} 
                size={14} 
                className={getChangeColor(stat?.changeType)} 
              />
              <span className={`text-sm font-medium ${getChangeColor(stat?.changeType)}`}>
                {stat?.change}
              </span>
              <span className="text-xs text-text-secondary">this month</span>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed">
              {stat?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Trust Indicators */}
      <div className="mt-8 pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-center">
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm">Verified Reviews</span>
          </div>
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="Award" size={16} className="text-warning" />
            <span className="text-sm">Expert Analysis</span>
          </div>
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-sm">Updated Daily</span>
          </div>
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="Users" size={16} className="text-accent" />
            <span className="text-sm">Community Driven</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickStats;