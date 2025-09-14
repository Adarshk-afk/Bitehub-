import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ComparisonWidget from '../../components/ui/ComparisonWidget';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showComparison, setShowComparison] = useState(false);

  const productId = searchParams?.get('id') || '1';

  // Mock product data
  const mockProduct = {
    id: 1,
    name: "iPhone 15 Pro",
    brand: "Apple",
    category: "Smartphones",
    description: `The iPhone 15 Pro represents Apple's most advanced smartphone technology, featuring the powerful A17 Pro chip built on a 3-nanometer process. With its titanium design, advanced camera system, and Action Button, it delivers professional-grade performance in a premium package.`,
    price: { min: 999, max: 1199 },
    originalPrice: 1299,
    rating: 4.8,
    reviewCount: 1247,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop"
    ],
    keyFeatures: [
      "A17 Pro chip with 6-core GPU",
      "48MP Main camera with 2x Telephoto",
      "Titanium design with Action Button",
      "USB-C connectivity",
      "Up to 29 hours video playback"
    ],
    affiliateLink: "https://apple.com/iphone-15-pro",
    specifications: {
      display: {
        "Screen Size": "6.1 inches",
        "Display Type": "Super Retina XDR OLED",
        "Resolution": "2556 x 1179 pixels",
        "Refresh Rate": "120Hz ProMotion",
        "Brightness": "1000 nits (typical), 2000 nits (peak)"
      },
      performance: {
        "Processor": "A17 Pro chip",
        "CPU": "6-core CPU with 2 performance and 4 efficiency cores",
        "GPU": "6-core GPU",
        "Neural Engine": "16-core Neural Engine",
        "RAM": "8GB"
      },
      camera: {
        "Main Camera": "48MP f/1.78",
        "Ultra Wide": "13MP f/2.2",
        "Telephoto": "12MP f/2.8",
        "Front Camera": "12MP TrueDepth f/1.9",
        "Video Recording": "4K at 24/25/30/60 fps"
      },
      connectivity: {
        "5G": "Sub-6 GHz and mmWave",
        "Wi-Fi": "Wi-Fi 6E",
        "Bluetooth": "5.3",
        "Connector": "USB-C",
        "NFC": "Yes"
      },
      battery: {
        "Battery Life": "Up to 29 hours video playback",
        "Charging": "USB-C wired and MagSafe wireless",
        "Fast Charging": "50% charge in 30 minutes",
        "Wireless Charging": "15W MagSafe, 7.5W Qi"
      }
    },
    expertReviews: [
      {
        id: 1,
        author: {
          name: "Sarah Johnson",
          publication: "TechReview Pro",
          avatar: "https://randomuser.me/api/portraits/women/32.jpg"
        },
        title: "iPhone 15 Pro: A Titanium Powerhouse",
        content: `The iPhone 15 Pro marks a significant leap forward for Apple's flagship smartphone line. The new titanium construction not only looks premium but also makes the device noticeably lighter while maintaining durability. The A17 Pro chip delivers exceptional performance across all tasks, from intensive gaming to professional video editing.\n\nThe camera system continues to impress with its 48MP main sensor and improved computational photography. The Action Button replacement for the mute switch adds welcome customization options that power users will appreciate.`,
        rating: 4.5,
        publishedAt: "2024-09-10T10:00:00Z",
        pros: [
          "Titanium build quality is exceptional",
          "A17 Pro chip performance is outstanding",
          "Camera improvements are noticeable",
          "Action Button adds useful customization"
        ],
        cons: [
          "Price increase over previous generation",
          "Battery life could be better",
          "USB-C transition may require new accessories"
        ],
        helpfulCount: 89,
        fullReviewUrl: "https://techreviewpro.com/iphone-15-pro-review"
      },
      {
        id: 2,
        author: {
          name: "Michael Chen",
          publication: "Mobile Tech Weekly",
          avatar: "https://randomuser.me/api/portraits/men/45.jpg"
        },
        title: "Professional Photography in Your Pocket",
        content: `As a professional photographer, I've been thoroughly impressed with the iPhone 15 Pro's camera capabilities. The 48MP main sensor captures incredible detail, and the new 2x telephoto option provides more flexibility for portrait photography.\n\nThe computational photography improvements are subtle but meaningful, particularly in challenging lighting conditions. Video recording quality remains industry-leading, making this a serious tool for content creators.`,
        rating: 4.8,
        publishedAt: "2024-09-08T14:30:00Z",
        pros: [
          "Exceptional camera quality",
          "Professional video recording features",
          "Improved low-light performance",
          "Versatile focal length options"
        ],
        cons: [
          "Storage fills up quickly with ProRAW",
          "Some features require learning curve"
        ],
        helpfulCount: 156,
        fullReviewUrl: "https://mobiletechweekly.com/iphone-15-pro-camera-review"
      }
    ],
    userReviews: [
      {
        id: 1,
        author: { name: "Alex Rodriguez" },
        title: "Fantastic upgrade from iPhone 12 Pro",
        content: "The titanium build feels amazing in hand, and the performance boost is noticeable in everything I do. The camera improvements are particularly impressive for video recording. USB-C is a welcome change, though I had to buy new cables.",
        rating: 5,
        createdAt: "2024-09-12T16:45:00Z",
        verified: true,
        helpfulCount: 23
      },
      {
        id: 2,
        author: { name: "Emma Thompson" },
        title: "Great phone but expensive",
        content: "Love the new features and build quality, but the price increase is hard to justify. The Action Button is more useful than I expected, and the camera quality is definitely improved. Battery life is decent but not exceptional.",
        rating: 4,
        createdAt: "2024-09-11T09:20:00Z",
        verified: true,
        helpfulCount: 18
      },
      {
        id: 3,
        author: { name: "David Kim" },
        title: "Perfect for content creation",
        content: "As a YouTuber, this phone has become my go-to for mobile filming. The video quality is outstanding, and the new camera features save me time in post-production. The A17 Pro handles editing apps without any lag.",
        rating: 5,
        createdAt: "2024-09-09T11:15:00Z",
        verified: false,
        helpfulCount: 31
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setProduct(mockProduct);
      setLoading(false);
    }, 1000);
  }, [productId]);

  const handleAddToComparison = (product) => {
    console.log('Adding to comparison:', product);
    setShowComparison(true);
  };

  const handleShare = (product) => {
    if (navigator.clipboard) {
      navigator.clipboard?.writeText(window.location?.href);
      // Show toast notification in real app
      console.log('Link copied to clipboard');
    }
  };

  const breadcrumbSegments = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Categories', path: '/product-listing' },
    { label: product?.category || 'Product', path: `/product-listing?category=${product?.category}` },
    { label: product?.name || 'Product Detail', path: '/product-detail', isLast: true }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-text-secondary">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <Icon name="AlertCircle" size={48} className="text-error mx-auto" />
            <h2 className="text-xl font-medium text-text-primary">Product Not Found</h2>
            <p className="text-text-secondary">The product you're looking for doesn't exist or has been removed.</p>
            <Button
              variant="outline"
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={() => navigate('/product-listing')}
            >
              Back to Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-4 lg:mx-6 py-6">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <BreadcrumbNavigation customSegments={breadcrumbSegments} />
        </div>

        {/* Product Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <ProductImageGallery 
              images={product?.images} 
              productName={product?.name} 
            />
          </div>

          {/* Product Information */}
          <div>
            <ProductInfo 
              product={product}
              onAddToComparison={handleAddToComparison}
              onShare={handleShare}
            />
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="max-w-none">
          <ProductTabs product={product} />
        </div>
      </main>
      {/* Comparison Widget */}
      <ComparisonWidget 
        isOpen={showComparison}
        onToggle={setShowComparison}
      />
    </div>
  );
};

export default ProductDetail;