import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProductSelector = ({ 
  isOpen, 
  onClose, 
  onSelectProduct, 
  excludeProductIds = [] 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Mock available products
  const availableProducts = [
    {
      id: 5,
      name: 'Google Pixel 8 Pro',
      brand: 'Google',
      category: 'smartphones',
      price: '$899',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
      specifications: {
        processor: 'Google Tensor G3',
        ram: '12GB',
        storage: '128GB/256GB/512GB',
        battery: '5050mAh',
        display: '6.7" LTPO OLED',
        dimensions: '162.6 x 76.5 x 8.8 mm',
        weight: '210g',
        material: 'Aluminum frame, Gorilla Glass',
        colors: 'Obsidian, Porcelain, Bay',
        waterResistance: 'IP68',
        wifi: 'Wi-Fi 7',
        bluetooth: '5.3',
        cellular: '5G',
        ports: 'USB-C',
        wireless: 'Qi wireless charging',
        camera: '50MP main, 48MP ultrawide, 48MP telephoto',
        biometric: 'Fingerprint, Face unlock',
        audio: 'Stereo speakers',
        sensors: 'Accelerometer, Gyro, Proximity',
        extras: 'Magic Eraser, Live Translate'
      },
      affiliateLink: 'https://store.google.com/pixel-8-pro'
    },
    {
      id: 6,
      name: 'OnePlus 12',
      brand: 'OnePlus',
      category: 'smartphones',
      price: '$799',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
      specifications: {
        processor: 'Snapdragon 8 Gen 3',
        ram: '12GB/16GB',
        storage: '256GB/512GB',
        battery: '5400mAh',
        display: '6.82" LTPO AMOLED',
        dimensions: '164.3 x 75.8 x 9.2 mm',
        weight: '220g',
        material: 'Aluminum frame, Glass back',
        colors: 'Silky Black, Flowy Emerald',
        waterResistance: 'IP65',
        wifi: 'Wi-Fi 7',
        bluetooth: '5.4',
        cellular: '5G',
        ports: 'USB-C',
        wireless: '50W wireless charging',
        camera: '50MP main, 64MP periscope, 48MP ultrawide',
        biometric: 'In-display fingerprint',
        audio: 'Stereo speakers, Dolby Atmos',
        sensors: 'Accelerometer, Gyro, Compass',
        extras: 'OxygenOS 14, Alert Slider'
      },
      affiliateLink: 'https://www.oneplus.com/12'
    },
    {
      id: 7,
      name: 'MacBook Pro 14" M3',
      brand: 'Apple',
      category: 'laptops',
      price: '$1,599',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop',
      specifications: {
        processor: 'Apple M3 chip',
        ram: '8GB/16GB/32GB',
        storage: '512GB/1TB/2TB SSD',
        battery: '70Wh, up to 22 hours',
        display: '14.2" Liquid Retina XDR',
        dimensions: '31.26 x 22.12 x 1.55 cm',
        weight: '1.55kg',
        material: 'Aluminum unibody',
        colors: 'Space Gray, Silver',
        waterResistance: 'N/A',
        wifi: 'Wi-Fi 6E',
        bluetooth: '5.3',
        cellular: 'N/A',
        ports: '3x Thunderbolt 4, HDMI, SD card',
        wireless: 'N/A',
        camera: '1080p FaceTime HD',
        biometric: 'Touch ID',
        audio: '6-speaker system, Spatial Audio',
        sensors: 'Ambient light sensor',
        extras: 'Magic Keyboard, Force Touch trackpad'
      },
      affiliateLink: 'https://www.apple.com/macbook-pro-14-and-16/'
    },
    {
      id: 8,
      name: 'Dell XPS 13 Plus',
      brand: 'Dell',
      category: 'laptops',
      price: '$1,299',
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
      specifications: {
        processor: 'Intel Core i7-1360P',
        ram: '16GB/32GB LPDDR5',
        storage: '512GB/1TB/2TB SSD',
        battery: '55Wh, up to 12 hours',
        display: '13.4" OLED InfinityEdge',
        dimensions: '29.5 x 19.9 x 1.5 cm',
        weight: '1.24kg',
        material: 'CNC machined aluminum',
        colors: 'Platinum, Graphite',
        waterResistance: 'N/A',
        wifi: 'Wi-Fi 6E',
        bluetooth: '5.2',
        cellular: 'Optional 5G',
        ports: '2x Thunderbolt 4',
        wireless: 'N/A',
        camera: '720p HD webcam',
        biometric: 'Fingerprint reader',
        audio: 'Quad speakers, Waves Nx',
        sensors: 'Ambient light sensor',
        extras: 'Capacitive function keys, Zero-lattice keyboard'
      },
      affiliateLink: 'https://www.dell.com/xps-13-plus'
    }
  ];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'smartphones', label: 'Smartphones' },
    { value: 'laptops', label: 'Laptops' },
    { value: 'tablets', label: 'Tablets' },
    { value: 'headphones', label: 'Headphones' },
    { value: 'smartwatches', label: 'Smartwatches' }
  ];

  React.useEffect(() => {
    let filtered = availableProducts?.filter(
      product => !excludeProductIds?.includes(product?.id)
    );

    if (searchQuery) {
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.brand?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered?.filter(product => product?.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, excludeProductIds]);

  const handleProductSelect = (product) => {
    onSelectProduct(product);
    onClose();
  };

  const renderStarRating = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="Star"
            size={12}
            className={`${
              star <= rating 
                ? 'text-warning fill-current' :'text-border'
            }`}
          />
        ))}
        <span className="text-xs text-text-secondary ml-1">({rating})</span>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-300">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[80vh] bg-surface border border-border rounded-lg shadow-custom-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Plus" size={20} className="text-primary" />
            <h2 className="text-lg font-medium text-text-primary">Add Product to Comparison</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary"
          >
            <Icon name="X" size={18} />
          </Button>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-border bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full"
            />
            <Select
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="Filter by category"
            />
          </div>
        </div>

        {/* Products List */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {filteredProducts?.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">No Products Found</h3>
              <p className="text-text-secondary">
                Try adjusting your search or category filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProducts?.map((product) => (
                <div
                  key={product?.id}
                  className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-150 cursor-pointer"
                  onClick={() => handleProductSelect(product)}
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-background flex-shrink-0">
                    <Image
                      src={product?.image}
                      alt={product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-text-primary truncate">
                      {product?.name}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-text-secondary">{product?.brand}</span>
                      <span className="text-sm text-text-secondary">•</span>
                      <span className="text-sm font-medium text-primary font-data">
                        {product?.price}
                      </span>
                    </div>
                    <div className="mt-2">
                      {renderStarRating(product?.rating)}
                    </div>
                  </div>
                  
                  <Icon name="Plus" size={18} className="text-primary flex-shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSelector;