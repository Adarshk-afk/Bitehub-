import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import SpecificationsTable from './SpecificationsTable';
import ExpertReviews from './ExpertReviews';
import UserReviews from './UserReviews';
import SimilarProducts from './SimilarProducts';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('specifications');

  const tabs = [
    {
      id: 'specifications',
      label: 'Specifications',
      icon: 'FileText',
      count: null
    },
    {
      id: 'expert-reviews',
      label: 'Expert Reviews',
      icon: 'Award',
      count: product?.expertReviews?.length || 0
    },
    {
      id: 'user-reviews',
      label: 'User Reviews',
      icon: 'MessageSquare',
      count: product?.reviewCount || 0
    },
    {
      id: 'similar-products',
      label: 'Similar Products',
      icon: 'Grid3X3',
      count: null
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'specifications':
        return <SpecificationsTable specifications={product?.specifications} />;
      case 'expert-reviews':
        return <ExpertReviews reviews={product?.expertReviews} />;
      case 'user-reviews':
        return <UserReviews productId={product?.id} reviews={product?.userReviews} />;
      case 'similar-products':
        return <SimilarProducts currentProduct={product} />;
      default:
        return <SpecificationsTable specifications={product?.specifications} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
              {tab?.count !== null && (
                <span className="bg-muted text-text-secondary text-xs px-2 py-1 rounded-full">
                  {tab?.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductTabs;