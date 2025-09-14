import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const CategoryBreadcrumb = ({ 
  category = '', 
  subcategory = '', 
  className = "" 
}) => {
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Categories', path: '/product-listing' }
  ];

  if (category) {
    breadcrumbItems?.push({
      label: category?.charAt(0)?.toUpperCase() + category?.slice(1),
      path: `/product-listing?category=${category}`
    });
  }

  if (subcategory) {
    breadcrumbItems?.push({
      label: subcategory?.charAt(0)?.toUpperCase() + subcategory?.slice(1),
      path: `/product-listing?category=${category}&subcategory=${subcategory}`,
      isLast: true
    });
  } else if (category) {
    breadcrumbItems[breadcrumbItems.length - 1].isLast = true;
  } else {
    breadcrumbItems[breadcrumbItems.length - 1].isLast = true;
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className={`flex items-center space-x-1 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbItems?.map((item, index) => (
          <li key={item?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="mx-2 text-text-secondary flex-shrink-0" 
              />
            )}
            
            {item?.isLast ? (
              <span className="text-text-primary font-medium flex items-center space-x-1">
                {item?.icon && (
                  <Icon name={item?.icon} size={14} className="text-text-secondary" />
                )}
                <span className="truncate">{item?.label}</span>
              </span>
            ) : (
              <button
                onClick={() => handleNavigation(item?.path)}
                className="text-text-secondary hover:text-text-primary transition-colors duration-200 flex items-center space-x-1 hover:underline focus:outline-none focus:underline"
              >
                {item?.icon && (
                  <Icon name={item?.icon} size={14} />
                )}
                <span className="truncate">{item?.label}</span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default CategoryBreadcrumb;