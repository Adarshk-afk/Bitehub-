import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReviewCard = ({ review, onHelpfulVote, onReportReview }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteType, setVoteType] = useState(null);

  const handleHelpfulVote = (type) => {
    if (!hasVoted) {
      setHasVoted(true);
      setVoteType(type);
      onHelpfulVote(review?.id, type);
    }
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

  const shouldTruncate = review?.comment?.length > 300;
  const displayComment = isExpanded || !shouldTruncate 
    ? review?.comment 
    : `${review?.comment?.substring(0, 300)}...`;

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-custom-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={review?.userAvatar}
              alt={review?.userName}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div>
            <h4 className="font-medium text-text-primary">{review?.userName}</h4>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1">
                {renderStars(review?.rating)}
              </div>
              <span className="text-sm text-text-secondary">•</span>
              <span className="text-sm text-text-secondary">
                {formatDate(review?.date)}
              </span>
              {review?.isVerifiedPurchase && (
                <>
                  <span className="text-sm text-text-secondary">•</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="ShieldCheck" size={14} className="text-success" />
                    <span className="text-xs text-success font-medium">Verified Purchase</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onReportReview(review?.id)}
          className="text-text-secondary hover:text-text-primary"
        >
          <Icon name="Flag" size={16} />
        </Button>
      </div>
      {/* Product Info */}
      {review?.productInfo && (
        <div className="flex items-center space-x-3 mb-4 p-3 bg-muted rounded-lg">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-background flex-shrink-0">
            <Image
              src={review?.productInfo?.image}
              alt={review?.productInfo?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-sm font-medium text-text-primary truncate">
              {review?.productInfo?.name}
            </h5>
            <p className="text-xs text-text-secondary">
              {review?.productInfo?.category}
            </p>
          </div>
        </div>
      )}
      {/* Review Title */}
      {review?.title && (
        <h3 className="text-lg font-medium text-text-primary mb-3">
          {review?.title}
        </h3>
      )}
      {/* Review Content */}
      <div className="mb-4">
        <p className="text-text-primary leading-relaxed whitespace-pre-wrap">
          {displayComment}
        </p>
        
        {shouldTruncate && (
          <Button
            variant="link"
            onClick={handleToggleExpand}
            className="mt-2 p-0 h-auto text-primary hover:text-primary/80"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </Button>
        )}
      </div>
      {/* Review Images */}
      {review?.images && review?.images?.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {review?.images?.map((image, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted">
                <Image
                  src={image}
                  alt={`Review image ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Pros and Cons */}
      {(review?.pros?.length > 0 || review?.cons?.length > 0) && (
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {review?.pros?.length > 0 && (
            <div>
              <h5 className="text-sm font-medium text-success mb-2 flex items-center space-x-1">
                <Icon name="ThumbsUp" size={14} />
                <span>Pros</span>
              </h5>
              <ul className="space-y-1">
                {review?.pros?.map((pro, index) => (
                  <li key={index} className="text-sm text-text-primary flex items-start space-x-2">
                    <Icon name="Plus" size={12} className="text-success mt-0.5 flex-shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {review?.cons?.length > 0 && (
            <div>
              <h5 className="text-sm font-medium text-error mb-2 flex items-center space-x-1">
                <Icon name="ThumbsDown" size={14} />
                <span>Cons</span>
              </h5>
              <ul className="space-y-1">
                {review?.cons?.map((con, index) => (
                  <li key={index} className="text-sm text-text-primary flex items-start space-x-2">
                    <Icon name="Minus" size={12} className="text-error mt-0.5 flex-shrink-0" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleHelpfulVote('helpful')}
              disabled={hasVoted}
              className={`${
                voteType === 'helpful' ?'text-success bg-success/10' :'text-text-secondary hover:text-success'
              }`}
            >
              <Icon name="ThumbsUp" size={14} className="mr-1" />
              Helpful ({review?.helpfulCount})
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleHelpfulVote('not-helpful')}
              disabled={hasVoted}
              className={`${
                voteType === 'not-helpful' ?'text-error bg-error/10' :'text-text-secondary hover:text-error'
              }`}
            >
              <Icon name="ThumbsDown" size={14} className="mr-1" />
              Not Helpful
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-text-secondary hover:text-text-primary"
          >
            <Icon name="MessageCircle" size={14} className="mr-1" />
            Reply
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-text-secondary hover:text-text-primary"
          >
            <Icon name="Share2" size={14} className="mr-1" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;