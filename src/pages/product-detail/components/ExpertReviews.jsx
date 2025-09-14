import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ExpertReviews = ({ reviews }) => {
  if (!reviews || reviews?.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="Award" size={48} className="text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">No Expert Reviews Yet</h3>
        <p className="text-text-secondary">Expert reviews for this product will appear here once available.</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {reviews?.map((review) => (
        <div key={review?.id} className="bg-surface border border-border rounded-lg p-6">
          {/* Review Header */}
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={review?.author?.avatar}
                alt={review?.author?.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-medium text-text-primary">{review?.author?.name}</h4>
                <Icon name="BadgeCheck" size={16} className="text-primary" />
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <span>{review?.author?.publication}</span>
                <span>•</span>
                <span>{formatDate(review?.publishedAt)}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5]?.map((star) => (
                <Icon
                  key={star}
                  name="Star"
                  size={16}
                  className={`${
                    star <= review?.rating
                      ? 'text-warning fill-current' :'text-border'
                  }`}
                />
              ))}
              <span className="text-sm font-medium text-text-primary ml-1">
                {review?.rating}/5
              </span>
            </div>
          </div>

          {/* Review Title */}
          <h3 className="text-lg font-medium text-text-primary mb-3">
            {review?.title}
          </h3>

          {/* Review Content */}
          <div className="prose prose-sm max-w-none mb-4">
            <p className="text-text-secondary leading-relaxed">
              {review?.content}
            </p>
          </div>

          {/* Pros and Cons */}
          {(review?.pros || review?.cons) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {review?.pros && review?.pros?.length > 0 && (
                <div className="space-y-2">
                  <h5 className="font-medium text-success flex items-center space-x-1">
                    <Icon name="ThumbsUp" size={16} />
                    <span>Pros</span>
                  </h5>
                  <ul className="space-y-1">
                    {review?.pros?.map((pro, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <Icon name="Plus" size={14} className="text-success mt-0.5 flex-shrink-0" />
                        <span className="text-text-secondary">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {review?.cons && review?.cons?.length > 0 && (
                <div className="space-y-2">
                  <h5 className="font-medium text-error flex items-center space-x-1">
                    <Icon name="ThumbsDown" size={16} />
                    <span>Cons</span>
                  </h5>
                  <ul className="space-y-1">
                    {review?.cons?.map((con, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <Icon name="Minus" size={14} className="text-error mt-0.5 flex-shrink-0" />
                        <span className="text-text-secondary">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Review Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <button className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-200">
                <Icon name="ThumbsUp" size={14} />
                <span>Helpful ({review?.helpfulCount || 0})</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-200">
                <Icon name="Share" size={14} />
                <span>Share</span>
              </button>
            </div>

            {review?.fullReviewUrl && (
              <Button
                variant="outline"
                size="sm"
                iconName="ExternalLink"
                iconPosition="right"
                onClick={() => window.open(review?.fullReviewUrl, '_blank')}
              >
                Read Full Review
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpertReviews;