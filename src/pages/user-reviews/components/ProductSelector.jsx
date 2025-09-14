import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProductSelector = ({ onProductSelect, selectedProduct = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dropdownRef = useRef(null);

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      category: 'Smartphones',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
      brand: 'Apple',
      price: '$999'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      category: 'Smartphones',
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
      brand: 'Samsung',
      price: '$1,199'
    },
    {
      id: 3,
      name: 'MacBook Air M2',
      category: 'Laptops',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
      brand: 'Apple',
      price: '$1,199'
    },
    {
      id: 4,
      name: 'Dell XPS 13',
      category: 'Laptops',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
      brand: 'Dell',
      price: '$899'
    },
    {
      id: 5,
      name: 'Sony WH-1000XM5',
      category: 'Headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      brand: 'Sony',
      price: '$399'
    },
    {
      id: 6,
      name: 'iPad Pro 12.9"',
      category: 'Tablets',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
      brand: 'Apple',
      price: '$1,099'
    }
  ];

  useEffect(() => {
    const filtered = mockProducts?.filter(product =>
      product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      product?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      product?.brand?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProductSelect = (product) => {
    onProductSelect(product);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleClearSelection = () => {
    onProductSelect(null);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-text-primary mb-2">
        Select Product to Review
      </label>
      {selectedProduct ? (
        /* Selected Product Display */
        (<div className="flex items-center space-x-3 p-4 bg-card border border-border rounded-lg">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={selectedProduct?.image}
              alt={selectedProduct?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-text-primary truncate">
              {selectedProduct?.name}
            </h4>
            <p className="text-sm text-text-secondary">
              {selectedProduct?.category} • {selectedProduct?.brand}
            </p>
            <p className="text-sm font-medium text-primary font-data">
              {selectedProduct?.price}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleDropdown}
              className="text-text-secondary hover:text-text-primary"
            >
              <Icon name="Edit2" size={14} className="mr-1" />
              Change
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearSelection}
              className="text-text-secondary hover:text-error"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>)
      ) : (
        /* Product Selector Button */
        (<Button
          variant="outline"
          onClick={toggleDropdown}
          className="w-full justify-start text-text-secondary hover:text-text-primary h-auto p-4"
        >
          <Icon name="Search" size={18} className="mr-3" />
          <span>Search and select a product to review...</span>
          <Icon name="ChevronDown" size={16} className="ml-auto" />
        </Button>)
      )}
      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-custom-lg z-200 max-h-80 overflow-hidden">
          {/* Search Input */}
          <div className="p-4 border-b border-border">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full"
              autoFocus
            />
          </div>

          {/* Products List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredProducts?.length > 0 ? (
              <div className="py-2">
                {filteredProducts?.map((product) => (
                  <button
                    key={product?.id}
                    onClick={() => handleProductSelect(product)}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted transition-colors duration-150"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={product?.image}
                        alt={product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-text-primary truncate">
                        {product?.name}
                      </h4>
                      <p className="text-xs text-text-secondary">
                        {product?.category} • {product?.brand}
                      </p>
                    </div>
                    
                    <div className="text-sm font-medium text-primary font-data">
                      {product?.price}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Icon name="Search" size={32} className="mx-auto text-text-secondary mb-2" />
                <p className="text-sm text-text-secondary">
                  {searchQuery ? 'No products found' : 'Start typing to search products'}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border bg-muted">
            <p className="text-xs text-text-secondary text-center">
              Can't find your product? Contact support to add it to our database.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSelector;