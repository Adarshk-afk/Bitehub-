import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [comparisonCount, setComparisonCount] = useState(2);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { 
      label: 'Home', 
      path: '/homepage', 
      icon: 'Home',
      tooltip: 'Discover trending products and categories'
    },
    { 
      label: 'Categories', 
      path: '/product-listing', 
      icon: 'Grid3X3',
      tooltip: 'Browse products by category'
    },
    { 
      label: 'Compare', 
      path: '/product-comparison', 
      icon: 'GitCompare',
      badge: comparisonCount > 0 ? comparisonCount : null,
      tooltip: 'Compare selected products'
    },
    { 
      label: 'Reviews', 
      path: '/user-reviews', 
      icon: 'MessageSquare',
      tooltip: 'Read and write product reviews'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery?.trim())}`);
      setIsSearchExpanded(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e?.target?.value);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearchExpanded = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setIsSearchExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className="sticky-nav border-b border-border">
      <div className="mx-4 lg:mx-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation('/homepage')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Utensils" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-text-primary">BiteHub</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <div key={item?.path} className="relative group">
                <button
                  onClick={() => handleNavigation(item?.path)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActivePath(item?.path) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                    }
                  `}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                  {item?.badge && (
                    <span className="bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">
                      {item?.badge}
                    </span>
                  )}
                </button>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-200">
                  {item?.tooltip}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover"></div>
                </div>
              </div>
            ))}
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center space-x-3">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search products, reviews..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="w-80 pl-10 pr-4"
                />
                <Icon 
                  name="Search" 
                  size={18} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                />
              </div>
            </form>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSearchExpanded}
              className="text-text-secondary hover:text-text-primary"
            >
              <Icon name="Search" size={20} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-text-secondary hover:text-text-primary"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Search Expanded */}
        {isSearchExpanded && (
          <div className="md:hidden py-4 border-t border-border">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search products, reviews..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="w-full pl-10 pr-4"
                  autoFocus
                />
                <Icon 
                  name="Search" 
                  size={18} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                />
              </div>
            </form>
          </div>
        )}
      </div>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-300 md:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={toggleMobileMenu}></div>
          
          <div className="fixed top-16 left-0 right-0 bg-surface border-b border-border shadow-custom-lg">
            <nav className="px-4 py-6 space-y-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                    ${isActivePath(item?.path) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                    }
                  `}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.label}</span>
                  {item?.badge && (
                    <span className="ml-auto bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full min-w-[24px] text-center">
                      {item?.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;