import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedReviews = () => {
  const navigate = useNavigate();

  const featuredReviews = [
    {
      id: 1,
      title: "iPhone 15 Pro vs Samsung Galaxy S24: The Ultimate Flagship Battle",
      excerpt: "We put Apple\'s latest flagship against Samsung\'s powerhouse to see which offers the best value for power users and photographers.",
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        role: "Senior Tech Reviewer",
        verified: true
      },
      product: {
        name: "iPhone 15 Pro",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop"
      },
      rating: 4.8,
      readTime: "8 min read",
      publishedAt: "2024-01-10",
      category: "Smartphones",
      tags: ["Comparison", "Flagship", "Camera"],
      views: 15420,
      likes: 892
    },
    {
      id: 2,
      title: "MacBook Pro M3 Review: Is the Performance Worth the Premium?",
      excerpt: "Apple's M3 chip promises unprecedented performance for creative professionals. We tested video editing, 3D rendering, and more.",
      author: {
        name: "Marcus Rodriguez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        role: "Hardware Specialist",
        verified: true
      },
      product: {
        name: "MacBook Pro 14-inch M3",
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop"
      },
      rating: 4.9,
      readTime: "12 min read",
      publishedAt: "2024-01-08",
      category: "Laptops",
      tags: ["Performance", "Creative", "M3 Chip"],
      views: 23150,
      likes: 1247
    },
    {
      id: 3,
      title: "Best Gaming Headsets Under $200: Our Top 5 Picks for 2024",
      excerpt: "From competitive gaming to immersive single-player experiences, these headsets deliver exceptional audio without breaking the bank.",
      author: {
        name: "Alex Thompson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        role: "Gaming Expert",
        verified: true
      },
      product: {
        name: "Gaming Headsets Collection",
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop"
      },
      rating: 4.6,
      readTime: "10 min read",
      publishedAt: "2024-01-05",
      category: "Audio",
      tags: ["Gaming", "Budget", "Roundup"],
      views: 18750,
      likes: 634
    }
  ];

  const handleReviewClick = (reviewId) => {
    navigate(`/user-reviews?id=${reviewId}`);
  };

  const handleAuthorClick = (authorName) => {
    navigate(`/user-reviews?author=${encodeURIComponent(authorName)}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
            Featured Reviews
          </h2>
          <p className="text-lg text-text-secondary">
            Expert insights and in-depth analysis from our tech specialists
          </p>
        </div>
        
        <Button
          variant="outline"
          onClick={() => navigate('/user-reviews')}
          iconName="ArrowRight"
          iconPosition="right"
          className="hidden sm:flex"
        >
          View All Reviews
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {featuredReviews?.map((review, index) => (
          <article
            key={review?.id}
            className={`group cursor-pointer ${
              index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
            }`}
            onClick={() => handleReviewClick(review?.id)}
          >
            <div className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-custom-lg hover:scale-[1.02] h-full">
              {/* Featured Image */}
              <div className={`relative overflow-hidden ${
                index === 0 ? 'h-64 lg:h-80' : 'h-48'
              }`}>
                <Image
                  src={review?.product?.image}
                  alt={review?.product?.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {review?.category}
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                  <span className="text-sm font-medium text-text-primary">{review?.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className={`p-6 space-y-4 ${index === 0 ? 'lg:p-8 lg:space-y-6' : ''}`}>
                <div className="space-y-3">
                  <h3 className={`font-bold text-text-primary group-hover:text-primary transition-colors duration-200 line-clamp-2 ${
                    index === 0 ? 'text-xl lg:text-2xl' : 'text-lg'
                  }`}>
                    {review?.title}
                  </h3>
                  
                  <p className={`text-text-secondary line-clamp-3 ${
                    index === 0 ? 'text-base' : 'text-sm'
                  }`}>
                    {review?.excerpt}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {review?.tags?.slice(0, index === 0 ? 3 : 2)?.map((tag) => (
                    <span
                      key={tag}
                      className="bg-muted text-text-secondary px-2 py-1 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-3 pt-4 border-t border-border">
                  <button
                    onClick={(e) => {
                      e?.stopPropagation();
                      handleAuthorClick(review?.author?.name);
                    }}
                    className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={review?.author?.avatar}
                        alt={review?.author?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium text-text-primary">
                          {review?.author?.name}
                        </span>
                        {review?.author?.verified && (
                          <Icon name="BadgeCheck" size={14} className="text-primary" />
                        )}
                      </div>
                      <span className="text-xs text-text-secondary">
                        {review?.author?.role}
                      </span>
                    </div>
                  </button>
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-text-secondary pt-2">
                  <div className="flex items-center space-x-4">
                    <span>{formatDate(review?.publishedAt)}</span>
                    <span>•</span>
                    <span>{review?.readTime}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={12} />
                      <span>{review?.views?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Heart" size={12} />
                      <span>{review?.likes?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      {/* Mobile View All Button */}
      <div className="text-center sm:hidden">
        <Button
          variant="outline"
          onClick={() => navigate('/user-reviews')}
          iconName="ArrowRight"
          iconPosition="right"
          fullWidth
        >
          View All Reviews
        </Button>
      </div>
    </section>
  );
};

export default FeaturedReviews;