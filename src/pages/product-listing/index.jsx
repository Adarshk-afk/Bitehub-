import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProductGrid from './components/ProductGrid';
import FilterSidebar from './components/FilterSidebar';
import SortControls from './components/SortControls';
import ComparisonBar from './components/ComparisonBar';
import CategoryBreadcrumb from './components/CategoryBreadcrumb';
import Pagination from './components/Pagination';

const ProductListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [comparedProducts, setComparedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: { min: '', max: '' },
    rating: '',
    brands: [],
    features: []
  });
  
  const [sortBy, setSortBy] = useState('relevance');
  
  const productsPerPage = 12;
  const category = searchParams?.get('category') || '';
  const subcategory = searchParams?.get('subcategory') || '';

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      brand: "Apple",
      category: "smartphones",
      price: "1199",
      originalPrice: "1299",
      discount: 8,
      rating: 4.8,
      reviewCount: 2847,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      summary: "The most advanced iPhone with titanium design, A17 Pro chip, and professional camera system.",
      badge: "New",
      features: ["5g-ready", "wireless-charging", "face-unlock", "fast-charging"],
      affiliateLink: "https://apple.com/iphone-15-pro"
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      brand: "Samsung",
      category: "smartphones",
      price: "1299",
      originalPrice: "1399",
      discount: 7,
      rating: 4.7,
      reviewCount: 1923,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
      summary: "Premium Android flagship with S Pen, 200MP camera, and AI-powered features.",
      badge: "Sale",
      features: ["5g-ready", "wireless-charging", "fingerprint", "fast-charging"],
      affiliateLink: "https://samsung.com/galaxy-s24-ultra"
    },
    {
      id: 3,
      name: "MacBook Air M3",
      brand: "Apple",
      category: "laptops",
      price: "1099",
      rating: 4.9,
      reviewCount: 1456,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
      summary: "Ultra-thin laptop with M3 chip, all-day battery life, and stunning Liquid Retina display.",
      features: ["fast-charging", "fingerprint"],
      affiliateLink: "https://apple.com/macbook-air"
    },
    {
      id: 4,
      name: "Dell XPS 13 Plus",
      brand: "Dell",
      category: "laptops",
      price: "999",
      originalPrice: "1199",
      discount: 17,
      rating: 4.6,
      reviewCount: 892,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
      summary: "Premium ultrabook with 12th Gen Intel processors and InfinityEdge display.",
      badge: "Sale",
      features: ["fingerprint", "fast-charging"],
      affiliateLink: "https://dell.com/xps-13-plus"
    },
    {
      id: 5,
      name: "iPad Pro 12.9-inch",
      brand: "Apple",
      category: "tablets",
      price: "1099",
      rating: 4.8,
      reviewCount: 1234,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
      summary: "Most advanced iPad with M2 chip, Liquid Retina XDR display, and Apple Pencil support.",
      features: ["wireless-charging", "face-unlock", "fast-charging"],
      affiliateLink: "https://apple.com/ipad-pro"
    },
    {
      id: 6,
      name: "Sony WH-1000XM5",
      brand: "Sony",
      category: "headphones",
      price: "399",
      originalPrice: "449",
      discount: 11,
      rating: 4.7,
      reviewCount: 3421,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      summary: "Industry-leading noise canceling headphones with exceptional sound quality.",
      badge: "Popular",
      features: ["noise-cancelling", "bluetooth", "fast-charging"],
      affiliateLink: "https://sony.com/wh-1000xm5"
    },
    {
      id: 7,
      name: "Apple Watch Series 9",
      brand: "Apple",
      category: "smartwatches",
      price: "399",
      rating: 4.6,
      reviewCount: 2156,
      image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop",
      summary: "Advanced health and fitness tracking with the most powerful Apple Watch chip.",
      badge: "New",
      features: ["wireless-charging", "water-resistant", "fast-charging"],
      affiliateLink: "https://apple.com/watch"
    },
    {
      id: 8,
      name: "Google Pixel 8 Pro",
      brand: "Google",
      category: "smartphones",
      price: "999",
      rating: 4.5,
      reviewCount: 1678,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      summary: "AI-powered photography and the most helpful Google features built right in.",
      features: ["5g-ready", "wireless-charging", "fingerprint", "face-unlock"],
      affiliateLink: "https://store.google.com/pixel-8-pro"
    },
    {
      id: 9,
      name: "Microsoft Surface Laptop 5",
      brand: "Microsoft",
      category: "laptops",
      price: "1299",
      rating: 4.4,
      reviewCount: 756,
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop",
      summary: "Sleek design meets powerful performance with 12th Gen Intel Core processors.",
      features: ["fingerprint", "fast-charging"],
      affiliateLink: "https://microsoft.com/surface-laptop-5"
    },
    {
      id: 10,
      name: "Samsung Galaxy Tab S9",
      brand: "Samsung",
      category: "tablets",
      price: "799",
      originalPrice: "899",
      discount: 11,
      rating: 4.5,
      reviewCount: 934,
      image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop",
      summary: "Premium Android tablet with S Pen included and DeX productivity features.",
      badge: "Sale",
      features: ["5g-ready", "water-resistant", "fast-charging"],
      affiliateLink: "https://samsung.com/galaxy-tab-s9"
    },
    {
      id: 11,
      name: "PlayStation 5 DualSense Controller",
      brand: "Sony",
      category: "gaming",
      price: "69",
      rating: 4.6,
      reviewCount: 4521,
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
      summary: "Revolutionary gaming controller with haptic feedback and adaptive triggers.",
      features: ["wireless-charging", "bluetooth"],
      affiliateLink: "https://playstation.com/dualsense"
    },
    {
      id: 12,
      name: "Canon EOS R6 Mark II",
      brand: "Canon",
      category: "cameras",
      price: "2499",
      rating: 4.8,
      reviewCount: 567,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
      summary: "Full-frame mirrorless camera with advanced autofocus and 4K video recording.",
      features: ["water-resistant", "bluetooth"],
      affiliateLink: "https://canon.com/eos-r6-mark-ii"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Apply category filter from URL
    if (category) {
      filtered = filtered?.filter(product => product?.category === category);
    }

    // Apply filters
    if (filters?.categories?.length > 0) {
      filtered = filtered?.filter(product => 
        filters?.categories?.includes(product?.category)
      );
    }

    if (filters?.brands?.length > 0) {
      filtered = filtered?.filter(product => 
        filters?.brands?.includes(product?.brand?.toLowerCase())
      );
    }

    if (filters?.features?.length > 0) {
      filtered = filtered?.filter(product => 
        filters?.features?.some(feature => product?.features?.includes(feature))
      );
    }

    if (filters?.rating) {
      const minRating = parseFloat(filters?.rating);
      filtered = filtered?.filter(product => product?.rating >= minRating);
    }

    if (filters?.priceRange?.min || filters?.priceRange?.max) {
      const min = parseFloat(filters?.priceRange?.min) || 0;
      const max = parseFloat(filters?.priceRange?.max) || Infinity;
      filtered = filtered?.filter(product => {
        const price = parseFloat(product?.price);
        return price >= min && price <= max;
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered?.sort((a, b) => parseFloat(a?.price) - parseFloat(b?.price));
        break;
      case 'price-high':
        filtered?.sort((a, b) => parseFloat(b?.price) - parseFloat(a?.price));
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'newest':
        filtered?.sort((a, b) => b?.id - a?.id);
        break;
      case 'popular':
        filtered?.sort((a, b) => b?.reviewCount - a?.reviewCount);
        break;
      case 'name-asc':
        filtered?.sort((a, b) => a?.name?.localeCompare(b?.name));
        break;
      case 'name-desc':
        filtered?.sort((a, b) => b?.name?.localeCompare(a?.name));
        break;
      default:
        // relevance - keep original order
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, filters, sortBy, category]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleCompareToggle = (productId, isComparing) => {
    setComparedProducts(prev => {
      if (isComparing) {
        return prev?.includes(productId) ? prev : [...prev, productId];
      } else {
        return prev?.filter(id => id !== productId);
      }
    });
  };

  const handleClearComparison = () => {
    setComparedProducts([]);
  };

  const handleFilterToggle = (isOpen) => {
    setIsFilterOpen(isOpen);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts?.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts?.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 lg:px-6 py-6">
        {/* Breadcrumb */}
        <CategoryBreadcrumb 
          category={category} 
          subcategory={subcategory}
          className="mb-6" 
        />

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-text-primary mb-2">
            {category ? `${category?.charAt(0)?.toUpperCase() + category?.slice(1)} Products` : 'All Products'}
          </h1>
          <p className="text-text-secondary">
            Discover the latest technology products with detailed reviews and specifications
          </p>
        </div>

        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            isOpen={isFilterOpen}
            onToggle={handleFilterToggle}
            className="w-80 flex-shrink-0"
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Sort Controls */}
            <SortControls
              sortBy={sortBy}
              onSortChange={handleSortChange}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              resultsCount={filteredProducts?.length}
              onFilterToggle={() => handleFilterToggle(true)}
              className="mb-6"
            />

            {/* Product Grid */}
            <ProductGrid
              products={paginatedProducts}
              isLoading={isLoading}
              comparedProducts={comparedProducts}
              onCompareToggle={handleCompareToggle}
              className="mb-8"
            />

            {/* Pagination */}
            {!isLoading && filteredProducts?.length > productsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="mb-8"
              />
            )}
          </div>
        </div>
      </main>
      {/* Comparison Bar */}
      <ComparisonBar
        comparedProducts={comparedProducts}
        onClearComparison={handleClearComparison}
      />
    </div>
  );
};

export default ProductListing;