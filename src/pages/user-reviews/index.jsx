import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ReviewCard from './components/ReviewCard';
import ReviewForm from './components/ReviewForm';
import ReviewStats from './components/ReviewStats';
import ReviewFilters from './components/ReviewFilters';
import ProductSelector from './components/ProductSelector';

const UserReviews = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    sortBy: 'newest',
    rating: '',
    verified: false,
    withPhotos: false,
    withProsAndCons: false
  });

  const reviewsPerPage = 10;

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      userName: 'Sarah Johnson',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      rating: 5,
      title: 'Absolutely love this phone!',
      comment: `I've been using the iPhone 15 Pro for about 3 months now and I'm thoroughly impressed. The camera quality is outstanding, especially in low light conditions. The titanium build feels premium and durable.\n\nThe battery life easily gets me through a full day of heavy usage, and the A17 Pro chip handles everything I throw at it without any lag. Face ID works flawlessly even with sunglasses on.\n\nThe only minor complaint is that it can get a bit warm during intensive gaming sessions, but that's pretty normal for flagship phones.`,
      pros: ['Excellent camera quality', 'Premium build quality', 'Great battery life', 'Fast performance'],
      cons: ['Gets warm during gaming', 'Expensive'],
      images: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400','https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'
      ],
      date: '2024-09-10T10:30:00Z',
      helpfulCount: 24,
      isVerifiedPurchase: true,
      productInfo: {
        id: 1,
        name: 'iPhone 15 Pro',category: 'Smartphones',image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'
      }
    },
    {
      id: 2,
      userName: 'Michael Chen',userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',rating: 4,title: 'Great laptop for productivity',
      comment: `The MacBook Air M2 has been my daily driver for work and I'm really happy with it. The M2 chip is incredibly fast for my workflow which includes video editing, coding, and running multiple applications simultaneously.\n\nThe display is crisp and bright, perfect for long coding sessions. The keyboard feels great to type on and the trackpad is responsive. Battery life is impressive - I can easily get 8-10 hours of work done.\n\nMy only complaints are the limited port selection and the notch can be distracting sometimes.`,
      pros: ['Excellent performance', 'Great battery life', 'Beautiful display', 'Silent operation'],
      cons: ['Limited ports', 'Notch can be distracting', 'Expensive storage upgrades'],
      images: [
        'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400'
      ],
      date: '2024-09-08T14:15:00Z',
      helpfulCount: 18,
      isVerifiedPurchase: true,
      productInfo: {
        id: 3,
        name: 'MacBook Air M2',
        category: 'Laptops',
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400'
      }
    },
    {
      id: 3,
      userName: 'Emily Rodriguez',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      rating: 5,
      title: 'Best noise-canceling headphones I\'ve owned',
      comment: `These Sony headphones are absolutely incredible. The noise cancellation is so good that I can barely hear anything around me when it's turned on. Perfect for flights and noisy environments.\n\nSound quality is exceptional with deep bass and clear highs. The comfort level is outstanding - I can wear them for hours without any discomfort. Battery life is excellent, lasting well over 24 hours with ANC on.\n\nThe touch controls take some getting used to but work well once you learn them.`,
      pros: ['Outstanding noise cancellation', 'Excellent sound quality', 'Very comfortable', 'Long battery life'],
      cons: ['Touch controls learning curve', 'Expensive'],
      images: [],
      date: '2024-09-05T09:45:00Z',
      helpfulCount: 31,
      isVerifiedPurchase: true,
      productInfo: {
        id: 5,
        name: 'Sony WH-1000XM5',category: 'Headphones',image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
      }
    },
    {
      id: 4,
      userName: 'David Kim',userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',rating: 3,title: 'Good phone but has some issues',comment: `The Galaxy S24 Ultra is a powerful phone with an amazing display and camera system. The S Pen integration is smooth and the phone feels premium.\n\nHowever, I've experienced some software bugs and the battery life isn't as good as I expected for such a large phone. The camera app sometimes crashes when switching between lenses.\n\nOverall it's a decent phone but I expected more for the price point.`,
      pros: ['Great display', 'Excellent cameras', 'S Pen functionality'],
      cons: ['Software bugs', 'Average battery life', 'Very expensive'],
      images: [
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400'
      ],
      date: '2024-09-03T16:20:00Z',
      helpfulCount: 12,
      isVerifiedPurchase: false,
      productInfo: {
        id: 2,
        name: 'Samsung Galaxy S24 Ultra',
        category: 'Smartphones',
        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400'
      }
    },
    {
      id: 5,
      userName: 'Lisa Thompson',
      userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      rating: 4,
      title: 'Solid laptop for the price',
      comment: `The Dell XPS 13 offers great value for money. Build quality is solid and the display is sharp and vibrant. Performance is good for everyday tasks and light creative work.\n\nThe keyboard is comfortable and the trackpad is responsive. Port selection is decent with USB-C and USB-A options.\n\nBattery life could be better and it can get a bit warm under load, but overall it's a reliable machine.`,
      pros: ['Good value', 'Solid build quality', 'Nice display', 'Decent performance'],
      cons: ['Average battery life', 'Gets warm', 'Fan can be noisy'],
      images: [],
      date: '2024-09-01T11:30:00Z',
      helpfulCount: 8,
      isVerifiedPurchase: true,
      productInfo: {
        id: 4,
        name: 'Dell XPS 13',category: 'Laptops',image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'
      }
    }
  ];

  // Mock review statistics
  const mockReviewStats = {
    totalReviews: 1247,
    averageRating: 4.3,
    recommendationPercentage: 87,
    verifiedPurchases: 73,
    ratingDistribution: {
      5: 542,
      4: 398,
      3: 187,
      2: 78,
      1: 42
    },
    highlights: {
      topPros: [
        { text: 'Great camera quality', count: 156 },
        { text: 'Excellent build quality', count: 134 },
        { text: 'Long battery life', count: 98 }
      ],
      topCons: [
        { text: 'Expensive', count: 89 },
        { text: 'Gets warm', count: 67 },
        { text: 'Limited storage', count: 45 }
      ]
    },
    recentActivity: {
      last7Days: 23,
      last30Days: 87
    }
  };

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setReviews(mockReviews);
      setReviewStats(mockReviewStats);
      setIsLoading(false);
    }, 1000);

    // Check if there's a product ID in URL params
    const productId = searchParams?.get('product');
    if (productId) {
      // In a real app, you'd fetch product details by ID
      const product = {
        id: productId,
        name: 'Selected Product',
        category: 'Category',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'
      };
      setSelectedProduct(product);
      setShowReviewForm(true);
    }
  }, [searchParams]);

  useEffect(() => {
    // Apply filters to reviews
    let filtered = [...reviews];

    // Filter by rating
    if (filters?.rating) {
      const minRating = parseInt(filters?.rating);
      filtered = filtered?.filter(review => review?.rating >= minRating);
    }

    // Filter by verified purchases
    if (filters?.verified) {
      filtered = filtered?.filter(review => review?.isVerifiedPurchase);
    }

    // Filter by photos
    if (filters?.withPhotos) {
      filtered = filtered?.filter(review => review?.images && review?.images?.length > 0);
    }

    // Filter by pros and cons
    if (filters?.withProsAndCons) {
      filtered = filtered?.filter(review => 
        (review?.pros && review?.pros?.length > 0) || 
        (review?.cons && review?.cons?.length > 0)
      );
    }

    // Sort reviews
    switch (filters?.sortBy) {
      case 'newest':
        filtered?.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        filtered?.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'highest-rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'lowest-rating':
        filtered?.sort((a, b) => a?.rating - b?.rating);
        break;
      case 'most-helpful':
        filtered?.sort((a, b) => b?.helpfulCount - a?.helpfulCount);
        break;
      default:
        break;
    }

    setFilteredReviews(filtered);
    setCurrentPage(1);
  }, [reviews, filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleHelpfulVote = (reviewId, voteType) => {
    setReviews(prev => prev?.map(review => 
      review?.id === reviewId 
        ? { 
            ...review, 
            helpfulCount: voteType === 'helpful' 
              ? review?.helpfulCount + 1 
              : review?.helpfulCount 
          }
        : review
    ));
  };

  const handleReportReview = (reviewId) => {
    // In a real app, this would open a report modal or send a report
    console.log('Reporting review:', reviewId);
  };

  const handleSubmitReview = async (reviewData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newReview = {
      id: Date.now(),
      userName: 'You',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
      ...reviewData,
      helpfulCount: 0,
      isVerifiedPurchase: true
    };

    setReviews(prev => [newReview, ...prev]);
    setShowReviewForm(false);
    setSelectedProduct(null);
  };

  const handleWriteReview = () => {
    setShowReviewForm(true);
  };

  const handleCancelReview = () => {
    setShowReviewForm(false);
    setSelectedProduct(null);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  // Pagination
  const totalPages = Math.ceil(filteredReviews?.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = filteredReviews?.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-text-secondary">Loading reviews...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>User Reviews - BiteHub</title>
        <meta name="description" content="Read and write detailed product reviews. Share your experiences and help others make informed purchasing decisions." />
        <meta name="keywords" content="product reviews, user reviews, ratings, tech reviews, product feedback" />
      </Helmet>
      <Header />
      <main className="mx-4 lg:mx-6 py-6">
        {/* Breadcrumb */}
        <BreadcrumbNavigation className="mb-6" />

        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">User Reviews</h1>
            <p className="text-text-secondary">
              Read authentic reviews from verified customers and share your own experiences
            </p>
          </div>
          
          <div className="mt-4 lg:mt-0">
            <Button
              onClick={handleWriteReview}
              iconName="PenTool"
              iconPosition="left"
            >
              Write a Review
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Review Form */}
            {showReviewForm && (
              <div className="mb-8">
                <ProductSelector
                  onProductSelect={handleProductSelect}
                  selectedProduct={selectedProduct}
                />
                <div className="mt-6">
                  <ReviewForm
                    onSubmitReview={handleSubmitReview}
                    onCancel={handleCancelReview}
                    selectedProduct={selectedProduct}
                  />
                </div>
              </div>
            )}

            {/* Filters */}
            <ReviewFilters
              onFiltersChange={handleFiltersChange}
              totalReviews={filteredReviews?.length}
            />

            {/* Reviews List */}
            <div className="space-y-6">
              {currentReviews?.length > 0 ? (
                <>
                  {currentReviews?.map((review) => (
                    <ReviewCard
                      key={review?.id}
                      review={review}
                      onHelpfulVote={handleHelpfulVote}
                      onReportReview={handleReportReview}
                    />
                  ))}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-2 pt-8">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <Icon name="ChevronLeft" size={16} className="mr-1" />
                        Previous
                      </Button>

                      <div className="flex items-center space-x-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const page = i + 1;
                          return (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => handlePageChange(page)}
                              className="w-10"
                            >
                              {page}
                            </Button>
                          );
                        })}
                        
                        {totalPages > 5 && (
                          <>
                            <span className="text-text-secondary px-2">...</span>
                            <Button
                              variant={currentPage === totalPages ? "default" : "outline"}
                              size="sm"
                              onClick={() => handlePageChange(totalPages)}
                              className="w-10"
                            >
                              {totalPages}
                            </Button>
                          </>
                        )}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <Icon name="ChevronRight" size={16} className="ml-1" />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <Icon name="MessageSquare" size={48} className="mx-auto text-text-secondary mb-4" />
                  <h3 className="text-lg font-medium text-text-primary mb-2">No Reviews Found</h3>
                  <p className="text-text-secondary mb-6">
                    No reviews match your current filters. Try adjusting your search criteria.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setFilters({
                      sortBy: 'newest',
                      rating: '',
                      verified: false,
                      withPhotos: false,
                      withProsAndCons: false
                    })}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Review Statistics */}
              {reviewStats && (
                <ReviewStats stats={reviewStats} />
              )}

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-medium text-text-primary mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleWriteReview}
                    className="w-full justify-start"
                    iconName="PenTool"
                    iconPosition="left"
                  >
                    Write a Review
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/product-listing')}
                    className="w-full justify-start"
                    iconName="Grid3X3"
                    iconPosition="left"
                  >
                    Browse Products
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/product-comparison')}
                    className="w-full justify-start"
                    iconName="GitCompare"
                    iconPosition="left"
                  >
                    Compare Products
                  </Button>
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-muted border border-border rounded-lg p-6">
                <h3 className="font-medium text-text-primary mb-3">Review Guidelines</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Be honest and detailed in your reviews</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Include photos when possible</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Focus on product features and performance</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Keep reviews respectful and constructive</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserReviews;