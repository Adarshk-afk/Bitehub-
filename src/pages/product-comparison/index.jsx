import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ComparisonHeader from './components/ComparisonHeader';
import ComparisonTable from './components/ComparisonTable';
import ProductSelector from './components/ProductSelector';
import MobileComparisonView from './components/MobileComparisonView';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProductComparison = () => {
  const [comparisonProducts, setComparisonProducts] = useState([]);
  const [isProductSelectorOpen, setIsProductSelectorOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const navigate = useNavigate();

  // Mock comparison products data
  const mockComparisonProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      brand: 'Apple',
      category: 'smartphones',
      price: '$999',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
      specifications: {
        processor: 'A17 Pro chip',
        ram: '8GB',
        storage: '128GB/256GB/512GB/1TB',
        battery: '3274mAh',
        display: '6.1" Super Retina XDR OLED',
        dimensions: '146.6 x 70.6 x 8.25 mm',
        weight: '187g',
        material: 'Titanium frame, Ceramic Shield',
        colors: 'Natural, Blue, White, Black',
        waterResistance: 'IP68',
        wifi: 'Wi-Fi 6E',
        bluetooth: '5.3',
        cellular: '5G',
        ports: 'USB-C',
        wireless: 'MagSafe, Qi wireless charging',
        camera: '48MP main, 12MP ultrawide, 12MP telephoto',
        biometric: 'Face ID',
        audio: 'Stereo speakers, Spatial Audio',
        sensors: 'LiDAR, Accelerometer, Gyro',
        extras: 'Action Button, Dynamic Island'
      },
      affiliateLink: 'https://www.apple.com/iphone-15-pro/'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      category: 'smartphones',
      price: '$1,199',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
      specifications: {
        processor: 'Snapdragon 8 Gen 3',
        ram: '12GB',
        storage: '256GB/512GB/1TB',
        battery: '5000mAh',
        display: '6.8" Dynamic AMOLED 2X',
        dimensions: '162.3 x 79.0 x 8.6 mm',
        weight: '232g',
        material: 'Aluminum frame, Gorilla Glass',
        colors: 'Titanium Gray, Titanium Black, Titanium Violet',
        waterResistance: 'IP68',
        wifi: 'Wi-Fi 7',
        bluetooth: '5.3',
        cellular: '5G',
        ports: 'USB-C',
        wireless: '45W fast wireless charging',
        camera: '200MP main, 50MP periscope, 12MP ultrawide, 10MP telephoto',
        biometric: 'Ultrasonic fingerprint, Face recognition',
        audio: 'AKG tuned speakers, Dolby Atmos',
        sensors: 'Accelerometer, Barometer, Gyro',
        extras: 'S Pen included, AI features'
      },
      affiliateLink: 'https://www.samsung.com/galaxy-s24-ultra/'
    }
  ];

  useEffect(() => {
    // Load comparison products from localStorage or use mock data
    const savedProducts = localStorage.getItem('comparisonProducts');
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        setComparisonProducts(parsed?.length > 0 ? parsed : mockComparisonProducts);
      } catch (error) {
        setComparisonProducts(mockComparisonProducts);
      }
    } else {
      setComparisonProducts(mockComparisonProducts);
    }

    // Check for mobile view
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  useEffect(() => {
    // Save comparison products to localStorage
    localStorage.setItem('comparisonProducts', JSON.stringify(comparisonProducts));
  }, [comparisonProducts]);

  const handleAddProduct = () => {
    setIsProductSelectorOpen(true);
  };

  const handleSelectProduct = (product) => {
    if (comparisonProducts?.length < 4 && !comparisonProducts?.find(p => p?.id === product?.id)) {
      setComparisonProducts(prev => [...prev, product]);
    }
  };

  const handleRemoveProduct = (productId) => {
    setComparisonProducts(prev => prev?.filter(product => product?.id !== productId));
  };

  const handleClearAll = () => {
    setComparisonProducts([]);
  };

  const handleShareComparison = () => {
    if (navigator.share && comparisonProducts?.length > 0) {
      navigator.share({
        title: 'Product Comparison - BiteHub',
        text: `Compare ${comparisonProducts?.map(p => p?.name)?.join(' vs ')}`,
        url: window.location?.href
      })?.catch(console.error);
    } else {
      // Fallback: copy to clipboard
      const url = window.location?.href;
      navigator.clipboard?.writeText(url)?.then(() => {
        // You could show a toast notification here
        alert('Comparison link copied to clipboard!');
      })?.catch(() => {
        alert('Unable to copy link. Please copy the URL manually.');
      });
    }
  };

  const breadcrumbSegments = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Product Comparison', path: '/product-comparison', isLast: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 lg:px-6 py-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <BreadcrumbNavigation customSegments={breadcrumbSegments} />
        </div>

        {/* Comparison Header */}
        <ComparisonHeader
          productCount={comparisonProducts?.length}
          onClearAll={handleClearAll}
          onAddProduct={handleAddProduct}
          onShareComparison={handleShareComparison}
        />

        {/* Comparison Content */}
        {isMobileView ? (
          <MobileComparisonView
            products={comparisonProducts}
            onRemoveProduct={handleRemoveProduct}
            onAddProduct={handleAddProduct}
          />
        ) : (
          <ComparisonTable
            products={comparisonProducts}
            onRemoveProduct={handleRemoveProduct}
            onAddProduct={handleAddProduct}
          />
        )}

        {/* Empty State Actions */}
        {comparisonProducts?.length === 0 && (
          <div className="mt-8 text-center">
            <div className="bg-surface border border-border rounded-lg p-8 max-w-md mx-auto">
              <Icon name="ArrowLeft" size={24} className="text-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">
                Start Exploring
              </h3>
              <p className="text-text-secondary mb-6">
                Browse our product categories to find items you'd like to compare.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => navigate('/product-listing')}
                  className="w-full"
                >
                  <Icon name="Grid3X3" size={16} className="mr-2" />
                  Browse Categories
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/homepage')}
                  className="w-full"
                >
                  <Icon name="Home" size={16} className="mr-2" />
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        {comparisonProducts?.length > 0 && (
          <div className="mt-8 bg-muted/30 border border-border rounded-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <div>
                <h3 className="font-medium text-text-primary mb-1">
                  Need More Options?
                </h3>
                <p className="text-sm text-text-secondary">
                  Explore more products in similar categories or read detailed reviews.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/product-listing')}
                  className="w-full sm:w-auto"
                >
                  <Icon name="Grid3X3" size={16} className="mr-2" />
                  Browse More
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/user-reviews')}
                  className="w-full sm:w-auto"
                >
                  <Icon name="MessageSquare" size={16} className="mr-2" />
                  Read Reviews
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      {/* Product Selector Modal */}
      <ProductSelector
        isOpen={isProductSelectorOpen}
        onClose={() => setIsProductSelectorOpen(false)}
        onSelectProduct={handleSelectProduct}
        excludeProductIds={comparisonProducts?.map(p => p?.id)}
      />
    </div>
  );
};

export default ProductComparison;