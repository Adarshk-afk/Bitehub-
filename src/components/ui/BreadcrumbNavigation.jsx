import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = ({ 
  customSegments = null, 
  separator = 'ChevronRight',
  className = "",
  showHome = true 
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const generateBreadcrumbs = () => {
    if (customSegments) {
      return customSegments;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [];

    if (showHome) {
      breadcrumbs?.push({
        label: 'Home',
        path: '/homepage',
        icon: 'Home'
      });
    }

    // Route mapping for better labels
    const routeLabels = {
      'homepage': 'Home',
      'product-listing': 'Categories',
      'product-detail': 'Product Details',
      'product-comparison': 'Compare Products',
      'search-results': 'Search Results',
      'user-reviews': 'Reviews'
    };

    pathSegments?.forEach((segment, index) => {
      const path = '/' + pathSegments?.slice(0, index + 1)?.join('/');
      const label = routeLabels?.[segment] || segment?.replace(/-/g, ' ')?.replace(/\b\w/g, l => l?.toUpperCase());
      
      breadcrumbs?.push({
        label,
        path,
        isLast: index === pathSegments?.length - 1
      });
    });

    return breadcrumbs;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className={`flex items-center space-x-1 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbs?.map((crumb, index) => (
          <li key={crumb?.path || index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name={separator} 
                size={14} 
                className="mx-2 text-text-secondary flex-shrink-0" 
              />
            )}
            
            {crumb?.isLast ? (
              <span className="text-text-primary font-medium flex items-center space-x-1">
                {crumb?.icon && (
                  <Icon name={crumb?.icon} size={14} className="text-text-secondary" />
                )}
                <span className="truncate">{crumb?.label}</span>
              </span>
            ) : (
              <button
                onClick={() => handleNavigation(crumb?.path)}
                className="text-text-secondary hover:text-text-primary transition-colors duration-200 flex items-center space-x-1 hover:underline focus:outline-none focus:underline"
              >
                {crumb?.icon && (
                  <Icon name={crumb?.icon} size={14} />
                )}
                <span className="truncate">{crumb?.label}</span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;