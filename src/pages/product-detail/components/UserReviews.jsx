import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UserReviews = ({ productId, reviews }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    content: '',
    name: '',
    email: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [sortBy, setSortBy] = useState('newest');

  const handleSubmitReview = (e) => {
    e?.preventDefault();
    // Mock review submission
    console.log('Submitting review:', newReview);
    setShowReviewForm(false);
    setNewReview({
      rating: 0,
      title: '',
      content: '',
      name: '',
      email: ''
    });
  };

  const handleRatingClick = (rating) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sortedReviews = reviews ? [...reviews]?.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'highest':
        return b?.rating - a?.rating;
      case 'lowest':
        return a?.rating - b?.rating;
      default:
        return 0;
    }
  }) : [];

  return (
    <div className="space-y-6">
      {/* Review Summary and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-medium text-text-primary">
            User Reviews ({reviews?.length || 0})
          </h3>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="text-sm border border-border rounded px-3 py-1 bg-surface text-text-primary"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>

        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setShowReviewForm(!showReviewForm)}
        >
          Write a Review
        </Button>
      </div>
      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <h4 className="text-lg font-medium text-text-primary mb-4">Write Your Review</h4>
          
          <form onSubmit={handleSubmitReview} className="space-y-4">
            {/* Rating */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Rating *</label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5]?.map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1"
                  >
                    <Icon
                      name="Star"
                      size={24}
                      className={`transition-colors duration-150 ${
                        star <= (hoveredRating || newReview?.rating)
                          ? 'text-warning fill-current' :'text-border hover:text-warning/50'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-text-secondary">
                  {newReview?.rating > 0 ? `${newReview?.rating}/5` : 'Select rating'}
                </span>
              </div>
            </div>

            {/* Review Title */}
            <Input
              label="Review Title *"
              type="text"
              placeholder="Summarize your experience"
              value={newReview?.title}
              onChange={(e) => setNewReview(prev => ({ ...prev, title: e?.target?.value }))}
              required
            />

            {/* Review Content */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Your Review *</label>
              <textarea
                placeholder="Share your detailed experience with this product..."
                value={newReview?.content}
                onChange={(e) => setNewReview(prev => ({ ...prev, content: e?.target?.value }))}
                required
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
              />
            </div>

            {/* User Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Your Name *"
                type="text"
                placeholder="Enter your name"
                value={newReview?.name}
                onChange={(e) => setNewReview(prev => ({ ...prev, name: e?.target?.value }))}
                required
              />
              <Input
                label="Email Address *"
                type="email"
                placeholder="Enter your email"
                value={newReview?.email}
                onChange={(e) => setNewReview(prev => ({ ...prev, email: e?.target?.value }))}
                required
              />
            </div>

            {/* Form Actions */}
            <div className="flex items-center space-x-3 pt-4">
              <Button
                type="submit"
                disabled={!newReview?.rating || !newReview?.title || !newReview?.content || !newReview?.name || !newReview?.email}
              >
                Submit Review
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowReviewForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
      {/* Reviews List */}
      {sortedReviews?.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="MessageSquare" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No User Reviews Yet</h3>
          <p className="text-text-secondary mb-4">Be the first to share your experience with this product.</p>
          <Button
            variant="outline"
            iconName="Plus"
            iconPosition="left"
            onClick={() => setShowReviewForm(true)}
          >
            Write the First Review
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedReviews?.map((review) => (
            <div key={review?.id} className="bg-surface border border-border rounded-lg p-6">
              {/* Review Header */}
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
                  {review?.author?.name?.charAt(0)?.toUpperCase()}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-text-primary">{review?.author?.name}</h4>
                    {review?.verified && (
                      <span className="bg-success text-success-foreground text-xs px-2 py-1 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5]?.map((star) => (
                        <Icon
                          key={star}
                          name="Star"
                          size={14}
                          className={`${
                            star <= review?.rating
                              ? 'text-warning fill-current' :'text-border'
                          }`}
                        />
                      ))}
                      <span className="ml-1">{review?.rating}/5</span>
                    </div>
                    <span>•</span>
                    <span>{formatDate(review?.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="mb-4">
                <h5 className="font-medium text-text-primary mb-2">{review?.title}</h5>
                <p className="text-text-secondary leading-relaxed">{review?.content}</p>
              </div>

              {/* Review Footer */}
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <button className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-200">
                  <Icon name="ThumbsUp" size={14} />
                  <span>Helpful ({review?.helpfulCount || 0})</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-200">
                  <Icon name="Flag" size={14} />
                  <span>Report</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserReviews;