import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import SearchResultsHeader from './components/SearchResultsHeader';
import SearchFilters from './components/SearchFilters';
import SearchResultsGrid from './components/SearchResultsGrid';
import SearchSuggestions from './components/SearchSuggestions';
import SearchPagination from './components/SearchPagination';
import ComparisonWidget from '../../components/ui/ComparisonWidget';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [comparisonItems, setComparisonItems] = useState([]);
  const resultsPerPage = 24;

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      brand: 'Apple',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
      price: 1199,
      originalPrice: 1299,
      rating: 4.8,
      reviewCount: 2847,
      description: 'The most advanced iPhone yet with titanium design, A17 Pro chip, and revolutionary camera system.',
      badge: 'Best Seller',
      category: 'smartphones'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
      price: { min: 999, max: 1399 },
      rating: 4.7,
      reviewCount: 1923,
      description: 'Premium Android flagship with S Pen, advanced AI features, and exceptional camera capabilities.',
      badge: 'New',
      category: 'smartphones'
    },
    {
      id: 3,
      name: 'MacBook Air M3',
      brand: 'Apple',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
      price: { min: 1099, max: 1699 },
      rating: 4.9,
      reviewCount: 1456,
      description: 'Incredibly thin and light laptop powered by the M3 chip for exceptional performance and battery life.',
      category: 'laptops'
    },
    {
      id: 4,
      name: 'Sony WH-1000XM5',
      brand: 'Sony',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400',
      price: 399,
      originalPrice: 449,
      rating: 4.6,
      reviewCount: 3421,
      description: 'Industry-leading noise canceling headphones with exceptional sound quality and comfort.',
      badge: 'Editor\'s Choice',
      category: 'headphones'
    },
    {
      id: 5,
      name: 'iPad Pro 12.9"',
      brand: 'Apple',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
      price: { min: 1099, max: 2199 },
      rating: 4.8,
      reviewCount: 987,
      description: 'The ultimate iPad experience with M2 chip, Liquid Retina XDR display, and Apple Pencil support.',
      category: 'tablets'
    },
    {
      id: 6,
      name: 'Dell XPS 13',
      brand: 'Dell',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
      price: { min: 899, max: 1599 },
      rating: 4.5,
      reviewCount: 756,
      description: 'Premium ultrabook with stunning InfinityEdge display and powerful performance in a compact design.',
      category: 'laptops'
    },
    {
      id: 7,
      name: 'Google Pixel 8 Pro',
      brand: 'Google',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
      price: 999,
      rating: 4.6,
      reviewCount: 1234,
      description: 'AI-powered smartphone with exceptional camera capabilities and pure Android experience.',
      badge: 'AI Enhanced',
      category: 'smartphones'
    },
    {
      id: 8,
      name: 'Apple Watch Series 9',
      brand: 'Apple',
      image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400',
      price: { min: 399, max: 799 },
      rating: 4.7,
      reviewCount: 2156,
      description: 'The most advanced Apple Watch with new health features, faster performance, and brighter display.',
      category: 'smartwatches'
    }
  ];

  useEffect(() => {
    // Get search query from URL parameters
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams?.get('q') || '';
    setSearchQuery(query);

    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      if (query?.trim()) {
        // Filter products based on search query
        let filtered = mockProducts?.filter(product =>
          product?.name?.toLowerCase()?.includes(query?.toLowerCase()) ||
          product?.brand?.toLowerCase()?.includes(query?.toLowerCase()) ||
          product?.description?.toLowerCase()?.includes(query?.toLowerCase()) ||
          product?.category?.toLowerCase()?.includes(query?.toLowerCase())
        );
        setProducts(filtered);
        setFilteredProducts(filtered);
      } else {
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      }
      setIsLoading(false);
    }, 800);
  }, [location?.search]);

  useEffect(() => {
    // Apply sorting
    const sorted = [...filteredProducts]?.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          const priceA = typeof a?.price === 'object' ? a?.price?.min : a?.price;
          const priceB = typeof b?.price === 'object' ? b?.price?.min : b?.price;
          return priceA - priceB;
        case 'price-high':
          const priceA2 = typeof a?.price === 'object' ? a?.price?.max || a?.price?.min : a?.price;
          const priceB2 = typeof b?.price === 'object' ? b?.price?.max || b?.price?.min : b?.price;
          return priceB2 - priceA2;
        case 'rating':
          return b?.rating - a?.rating;
        case 'newest':
          return b?.id - a?.id;
        case 'popular':
          return b?.reviewCount - a?.reviewCount;
        default:
          return 0;
      }
    });
    setFilteredProducts(sorted);
    setCurrentPage(1);
  }, [sortBy, products]);

  const handleFiltersChange = (filters) => {
    let filtered = [...products];

    // Apply category filter
    if (filters?.categories?.length > 0) {
      filtered = filtered?.filter(product => 
        filters?.categories?.includes(product?.category)
      );
    }

    // Apply brand filter
    if (filters?.brands?.length > 0) {
      filtered = filtered?.filter(product => 
        filters?.brands?.includes(product?.brand?.toLowerCase())
      );
    }

    // Apply price range filter
    if (filters?.priceRange?.min || filters?.priceRange?.max) {
      filtered = filtered?.filter(product => {
        const price = typeof product?.price === 'object' ? product?.price?.min : product?.price;
        const min = filters?.priceRange?.min ? parseInt(filters?.priceRange?.min) : 0;
        const max = filters?.priceRange?.max ? parseInt(filters?.priceRange?.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    // Apply rating filter
    if (filters?.rating) {
      const minRating = parseInt(filters?.rating);
      filtered = filtered?.filter(product => product?.rating >= minRating);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(`/search-results?q=${encodeURIComponent(suggestion)}`);
  };

  const handleAddToComparison = (product) => {
    setComparisonItems(prev => {
      const exists = prev?.find(item => item?.id === product?.id);
      if (exists) {
        return prev?.filter(item => item?.id !== product?.id);
      } else if (prev?.length < 4) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const handleAddToWishlist = (product) => {
    // Handle wishlist functionality
    console.log('Added to wishlist:', product?.name);
  };

  const totalPages = Math.ceil(filteredProducts?.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentProducts = filteredProducts?.slice(startIndex, endIndex);

  const breadcrumbSegments = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Search Results', path: '/search-results', isLast: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-surface border-b border-border">
          <div className="mx-4 lg:mx-6 py-4">
            <BreadcrumbNavigation customSegments={breadcrumbSegments} />
          </div>
        </div>

        {/* Search Results Header */}
        <SearchResultsHeader
          searchQuery={searchQuery}
          resultCount={filteredProducts?.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onToggleFilters={() => setIsFiltersOpen(!isFiltersOpen)}
          isFiltersOpen={isFiltersOpen}
        />

        {/* Main Content */}
        <div className="mx-4 lg:mx-6 py-6">
          {filteredProducts?.length === 0 && !isLoading ? (
            <SearchSuggestions
              searchQuery={searchQuery}
              onSuggestionClick={handleSuggestionClick}
            />
          ) : (
            <div className="flex gap-6">
              {/* Filters Sidebar - Desktop */}
              <div className="hidden lg:block w-80 flex-shrink-0">
                <SearchFilters
                  isOpen={true}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={() => handleFiltersChange({
                    categories: [],
                    brands: [],
                    priceRange: { min: '', max: '' },
                    rating: '',
                    features: [],
                    availability: []
                  })}
                />
              </div>

              {/* Mobile Filters */}
              {isFiltersOpen && (
                <div className="lg:hidden fixed inset-0 z-300">
                  <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsFiltersOpen(false)}></div>
                  <div className="fixed top-0 left-0 h-full w-80 bg-surface shadow-custom-lg overflow-y-auto">
                    <SearchFilters
                      isOpen={true}
                      onFiltersChange={handleFiltersChange}
                      onClearFilters={() => {
                        handleFiltersChange({
                          categories: [],
                          brands: [],
                          priceRange: { min: '', max: '' },
                          rating: '',
                          features: [],
                          availability: []
                        });
                        setIsFiltersOpen(false);
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Results Grid */}
              <div className="flex-1 min-w-0">
                <SearchResultsGrid
                  products={currentProducts}
                  viewMode={viewMode}
                  isLoading={isLoading}
                  onAddToComparison={handleAddToComparison}
                  onAddToWishlist={handleAddToWishlist}
                />

                {/* Pagination */}
                {filteredProducts?.length > resultsPerPage && (
                  <div className="mt-8">
                    <SearchPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      totalResults={filteredProducts?.length}
                      resultsPerPage={resultsPerPage}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Comparison Widget */}
      {comparisonItems?.length > 0 && (
        <ComparisonWidget
          isOpen={true}
          comparisonItems={comparisonItems}
          onToggle={() => {}} // Add missing required prop
          onRemoveItem={(itemId) => {
            setComparisonItems(prev => prev?.filter(item => item?.id !== itemId));
          }}
          onClearAll={() => setComparisonItems([])}
        />
      )}
      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-12">
        <div className="mx-4 lg:mx-6 py-8">
          <div className="text-center text-text-secondary">
            <p className="text-sm">
              © {new Date()?.getFullYear()} BiteHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SearchResults;