import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CategoryGrid = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'smartphones',
      name: 'Smartphones',
      icon: 'Smartphone',
      productCount: 1247,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
      description: 'Latest mobile devices and accessories',
      trending: true,
      color: 'from-blue-500/10 to-blue-600/10'
    },
    {
      id: 'laptops',
      name: 'Laptops',
      icon: 'Laptop',
      productCount: 892,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
      description: 'Professional and gaming laptops',
      trending: false,
      color: 'from-purple-500/10 to-purple-600/10'
    },
    {
      id: 'wearables',
      name: 'Wearables',
      icon: 'Watch',
      productCount: 634,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      description: 'Smartwatches and fitness trackers',
      trending: true,
      color: 'from-green-500/10 to-green-600/10'
    },
    {
      id: 'gaming',
      name: 'Gaming',
      icon: 'Gamepad2',
      productCount: 756,
      image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop',
      description: 'Gaming consoles and accessories',
      trending: false,
      color: 'from-red-500/10 to-red-600/10'
    },
    {
      id: 'audio',
      name: 'Audio',
      icon: 'Headphones',
      productCount: 923,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      description: 'Headphones and speakers',
      trending: true,
      color: 'from-orange-500/10 to-orange-600/10'
    },
    {
      id: 'tablets',
      name: 'Tablets',
      icon: 'Tablet',
      productCount: 445,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      description: 'iPads and Android tablets',
      trending: false,
      color: 'from-teal-500/10 to-teal-600/10'
    },
    {
      id: 'cameras',
      name: 'Cameras',
      icon: 'Camera',
      productCount: 387,
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      description: 'Digital cameras and lenses',
      trending: false,
      color: 'from-pink-500/10 to-pink-600/10'
    },
    {
      id: 'smart-home',
      name: 'Smart Home',
      icon: 'Home',
      productCount: 612,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      description: 'IoT devices and home automation',
      trending: true,
      color: 'from-indigo-500/10 to-indigo-600/10'
    }
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/product-listing?category=${categoryId}`);
  };

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
          Explore Categories
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Discover the latest tech products across all categories with expert reviews and detailed comparisons
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories?.map((category) => (
          <div
            key={category?.id}
            onClick={() => handleCategoryClick(category?.id)}
            className="group relative bg-card border border-border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-custom-lg hover:scale-105"
          >
            {/* Background Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={category?.image}
                alt={category?.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${category?.color} to-transparent`}></div>
              
              {/* Trending Badge */}
              {category?.trending && (
                <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                  Trending
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={category?.icon} size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors duration-200">
                    {category?.name}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {category?.productCount?.toLocaleString()} products
                  </p>
                </div>
              </div>

              <p className="text-sm text-text-secondary">
                {category?.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">
                  Updated today
                </span>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="text-text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* View All Categories Button */}
      <div className="text-center">
        <button
          onClick={() => navigate('/product-listing')}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-muted hover:bg-muted/80 text-text-primary rounded-lg transition-colors duration-200 font-medium"
        >
          <span>View All Categories</span>
          <Icon name="Grid3X3" size={18} />
        </button>
      </div>
    </section>
  );
};

export default CategoryGrid;