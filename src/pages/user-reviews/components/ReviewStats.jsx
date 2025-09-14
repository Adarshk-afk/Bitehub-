import React from 'react';
import Icon from '../../../components/AppIcon';

const ReviewStats = ({ stats }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={`${
          index < rating 
            ? 'text-warning fill-current' :'text-border'
        }`}
      />
    ));
  };

  const getPercentage = (count, total) => {
    return total > 0 ? Math.round((count / total) * 100) : 0;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Review Summary</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Overall Rating */}
        <div className="text-center">
          <div className="text-4xl font-bold text-text-primary mb-2">
            {stats?.averageRating?.toFixed(1)}
          </div>
          <div className="flex items-center justify-center space-x-1 mb-2">
            {renderStars(Math.round(stats?.averageRating))}
          </div>
          <p className="text-sm text-text-secondary">
            Based on {stats?.totalReviews?.toLocaleString()} reviews
          </p>
          
          {/* Additional Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <div className="text-2xl font-semibold text-success mb-1">
                {stats?.recommendationPercentage}%
              </div>
              <p className="text-xs text-text-secondary">Would Recommend</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-primary mb-1">
                {stats?.verifiedPurchases}%
              </div>
              <p className="text-xs text-text-secondary">Verified Purchases</p>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-3">
          {[5, 4, 3, 2, 1]?.map((rating) => {
            const count = stats?.ratingDistribution?.[rating] || 0;
            const percentage = getPercentage(count, stats?.totalReviews);
            
            return (
              <div key={rating} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-16">
                  <span className="text-sm font-medium text-text-primary">{rating}</span>
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                </div>
                
                <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-warning transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                
                <div className="flex items-center space-x-2 w-20">
                  <span className="text-sm text-text-secondary">{percentage}%</span>
                  <span className="text-xs text-text-secondary">({count})</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Review Highlights */}
      {stats?.highlights && (
        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="text-sm font-medium text-text-primary mb-4">Review Highlights</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Most Mentioned Pros */}
            {stats?.highlights?.topPros && stats?.highlights?.topPros?.length > 0 && (
              <div>
                <h5 className="text-xs font-medium text-success mb-2 flex items-center space-x-1">
                  <Icon name="ThumbsUp" size={12} />
                  <span>Most Mentioned Pros</span>
                </h5>
                <div className="space-y-1">
                  {stats?.highlights?.topPros?.slice(0, 3)?.map((pro, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span className="text-text-primary">{pro?.text}</span>
                      <span className="text-text-secondary">({pro?.count})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Most Mentioned Cons */}
            {stats?.highlights?.topCons && stats?.highlights?.topCons?.length > 0 && (
              <div>
                <h5 className="text-xs font-medium text-error mb-2 flex items-center space-x-1">
                  <Icon name="ThumbsDown" size={12} />
                  <span>Most Mentioned Cons</span>
                </h5>
                <div className="space-y-1">
                  {stats?.highlights?.topCons?.slice(0, 3)?.map((con, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span className="text-text-primary">{con?.text}</span>
                      <span className="text-text-secondary">({con?.count})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Recent Activity */}
      {stats?.recentActivity && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-text-primary">Recent Activity</h4>
            <div className="flex items-center space-x-4 text-xs text-text-secondary">
              <span>Last 30 days: +{stats?.recentActivity?.last30Days} reviews</span>
              <span>Last 7 days: +{stats?.recentActivity?.last7Days} reviews</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewStats;