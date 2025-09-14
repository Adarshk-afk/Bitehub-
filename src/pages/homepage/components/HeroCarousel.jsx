import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  const trendingProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      category: "Smartphones",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=600&fit=crop",
      price: "$1,199",
      rating: 4.8,
      reviews: 2847,
      badge: "Editor\'s Choice",
      description: "The most advanced iPhone with titanium design and A17 Pro chip"
    },
    {
      id: 2,
      name: "MacBook Pro 14-inch M3",
      category: "Laptops",
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop",
      price: "$1,599",
      rating: 4.9,
      reviews: 1923,
      badge: "Best Performance",
      description: "Supercharged by M3 chip for professional workflows"
    },
    {
      id: 3,
      name: "Samsung Galaxy S24 Ultra",
      category: "Smartphones",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=600&fit=crop",
      price: "$1,299",
      rating: 4.7,
      reviews: 3156,
      badge: "Best Camera",
      description: "AI-powered photography with S Pen functionality"
    },
    {
      id: 4,
      name: "Sony WH-1000XM5",
      category: "Audio",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
      price: "$399",
      rating: 4.6,
      reviews: 4521,
      badge: "Best Audio",
      description: "Industry-leading noise cancellation with premium sound"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % trendingProducts?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, trendingProducts?.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % trendingProducts?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + trendingProducts?.length) % trendingProducts?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleProductClick = (productId) => {
    navigate(`/product-detail?id=${productId}`);
  };

  const currentProduct = trendingProducts?.[currentSlide];

  return (
    <div className="relative bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl overflow-hidden">
      <div className="relative h-96 lg:h-[500px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={currentProduct?.image}
            alt={currentProduct?.name}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Text Content */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {currentProduct?.badge}
                    </span>
                    <span className="text-text-secondary text-sm">{currentProduct?.category}</span>
                  </div>
                  
                  <h1 className="text-3xl lg:text-5xl font-bold text-text-primary leading-tight">
                    {currentProduct?.name}
                  </h1>
                  
                  <p className="text-lg text-text-secondary max-w-md">
                    {currentProduct?.description}
                  </p>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={16}
                          className={`${
                            i < Math.floor(currentProduct?.rating)
                              ? 'text-warning fill-current' :'text-border'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-text-primary">
                      {currentProduct?.rating}
                    </span>
                    <span className="text-sm text-text-secondary">
                      ({currentProduct?.reviews?.toLocaleString()} reviews)
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-primary font-data">
                    {currentProduct?.price}
                  </span>
                  <Button
                    onClick={() => handleProductClick(currentProduct?.id)}
                    size="lg"
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    View Details
                  </Button>
                </div>
              </div>

              {/* Product Image */}
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="w-80 h-80 mx-auto rounded-2xl overflow-hidden shadow-custom-lg">
                    <Image
                      src={currentProduct?.image}
                      alt={currentProduct?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium shadow-custom-md">
                    Trending #{currentSlide + 1}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-surface/90 hover:bg-surface border border-border rounded-full flex items-center justify-center text-text-primary hover:text-primary transition-all duration-200 shadow-custom-md"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-surface/90 hover:bg-surface border border-border rounded-full flex items-center justify-center text-text-primary hover:text-primary transition-all duration-200 shadow-custom-md"
        >
          <Icon name="ChevronRight" size={20} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {trendingProducts?.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? 'bg-primary scale-110' :'bg-surface/60 hover:bg-surface/80'
              }`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        <div className="absolute top-6 right-6">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="w-10 h-10 bg-surface/90 hover:bg-surface border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-primary transition-all duration-200"
          >
            <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;