import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SimilarProducts = ({ currentProduct }) => {
  const navigate = useNavigate();

  // Mock similar products data
  const similarProducts = [
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      brand: "Samsung",
      price: { min: 1199, max: 1399 },
      rating: 4.7,
      reviewCount: 892,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
      category: "Smartphones",
      keyFeatures: ["200MP Camera", "S Pen Included", "5000mAh Battery"]
    },
    {
      id: 3,
      name: "Google Pixel 8 Pro",
      brand: "Google",
      price: { min: 999, max: 1099 },
      rating: 4.6,
      reviewCount: 567,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      category: "Smartphones",
      keyFeatures: ["AI Photography", "Pure Android", "7 Years Updates"]
    },
    {
      id: 4,
      name: "iPhone 14 Pro Max",
      brand: "Apple",
      price: { min: 1099, max: 1299 },
      rating: 4.8,
      reviewCount: 1234,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      category: "Smartphones",
      keyFeatures: ["Dynamic Island", "48MP Camera", "A16 Bionic Chip"]
    },
    {
      id: 5,
      name: "OnePlus 12",
      brand: "OnePlus",
      price: { min: 799, max: 899 },
      rating: 4.5,
      reviewCount: 423,
      image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop",
      category: "Smartphones",
      keyFeatures: ["Snapdragon 8 Gen 3", "100W Charging", "Hasselblad Camera"]
    }
  ];

  const handleProductClick = (productId) => {
    navigate(`/product-detail?id=${productId}`);
  };

  const handleCompareClick = (product, e) => {
    e?.stopPropagation();
    // Mock add to comparison
    console.log('Adding to comparison:', product);
  };

  const formatPrice = (price) => {
    if (typeof price === 'object' && price?.min && price?.max) {
      return `$${price?.min?.toLocaleString()} - $${price?.max?.toLocaleString()}`;
    }
    return `$${price?.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-text-primary">Similar Products</h3>
        <Button
          variant="outline"
          size="sm"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={() => navigate(`/product-listing?category=${currentProduct?.category}`)}
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {similarProducts?.map((product) => (
          <div
            key={product?.id}
            className="tech-card p-4 cursor-pointer group"
            onClick={() => handleProductClick(product?.id)}
          >
            {/* Product Image */}
            <div className="relative mb-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Quick Actions */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={(e) => handleCompareClick(product, e)}
                >
                  <Icon name="GitCompare" size={16} />
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-3">
              {/* Brand */}
              <div className="text-xs text-text-secondary uppercase tracking-wide">
                {product?.brand}
              </div>

              {/* Name */}
              <h4 className="font-medium text-text-primary line-clamp-2 group-hover:text-primary transition-colors duration-200">
                {product?.name}
              </h4>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5]?.map((star) => (
                    <Icon
                      key={star}
                      name="Star"
                      size={14}
                      className={`${
                        star <= Math.floor(product?.rating)
                          ? 'text-warning fill-current' :'text-border'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-text-secondary">
                  {product?.rating} ({product?.reviewCount})
                </span>
              </div>

              {/* Key Features */}
              <div className="space-y-1">
                {product?.keyFeatures?.slice(0, 2)?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={12} className="text-success flex-shrink-0" />
                    <span className="text-xs text-text-secondary truncate">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="pt-2 border-t border-border">
                <div className="text-lg font-bold text-text-primary font-data">
                  {formatPrice(product?.price)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Compare All Button */}
      <div className="text-center pt-4">
        <Button
          variant="outline"
          iconName="GitCompare"
          iconPosition="left"
          onClick={() => navigate('/product-comparison')}
        >
          Compare All Similar Products
        </Button>
      </div>
    </div>
  );
};

export default SimilarProducts;