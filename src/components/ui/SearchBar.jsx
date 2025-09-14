import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Input from './Input';

const SearchBar = ({ 
  placeholder = "Search products, reviews...", 
  onSearch, 
  className = "",
  autoFocus = false,
  showSuggestions = true 
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const navigate = useNavigate();

  // Mock suggestions data
  const mockSuggestions = [
    { type: 'product', text: 'iPhone 15 Pro', category: 'Smartphones' },
    { type: 'product', text: 'MacBook Air M2', category: 'Laptops' },
    { type: 'product', text: 'Samsung Galaxy S24', category: 'Smartphones' },
    { type: 'category', text: 'Gaming Laptops', category: 'Categories' },
    { type: 'category', text: 'Wireless Headphones', category: 'Categories' },
    { type: 'review', text: 'Best budget smartphones 2024', category: 'Reviews' },
    { type: 'review', text: 'Gaming laptop comparison', category: 'Reviews' },
  ];

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setQuery(value);
    
    if (value?.trim() && showSuggestions) {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const filtered = mockSuggestions?.filter(suggestion =>
          suggestion?.text?.toLowerCase()?.includes(value?.toLowerCase())
        )?.slice(0, 6);
        setSuggestions(filtered);
        setShowSuggestionsList(true);
        setSelectedSuggestionIndex(-1);
        setIsLoading(false);
      }, 150);
    } else {
      setSuggestions([]);
      setShowSuggestionsList(false);
      setSelectedSuggestionIndex(-1);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (query?.trim()) {
      performSearch(query?.trim());
    }
  };

  const performSearch = (searchQuery) => {
    setShowSuggestionsList(false);
    setSelectedSuggestionIndex(-1);
    
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion?.text);
    performSearch(suggestion?.text);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestionsList || suggestions?.length === 0) return;

    switch (e?.key) {
      case 'ArrowDown':
        e?.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions?.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e?.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : suggestions?.length - 1
        );
        break;
      case 'Enter':
        e?.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(suggestions?.[selectedSuggestionIndex]);
        } else {
          handleSubmit(e);
        }
        break;
      case 'Escape':
        setShowSuggestionsList(false);
        setSelectedSuggestionIndex(-1);
        inputRef?.current?.blur();
        break;
    }
  };

  const handleFocus = () => {
    if (query?.trim() && suggestions?.length > 0) {
      setShowSuggestionsList(true);
    }
  };

  const handleBlur = (e) => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      if (!suggestionsRef?.current?.contains(document.activeElement)) {
        setShowSuggestionsList(false);
        setSelectedSuggestionIndex(-1);
      }
    }, 150);
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'product':
        return 'Package';
      case 'category':
        return 'Grid3X3';
      case 'review':
        return 'MessageSquare';
      default:
        return 'Search';
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestionsList(false);
    setSelectedSuggestionIndex(-1);
    inputRef?.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef?.current && !suggestionsRef?.current?.contains(event?.target)) {
        setShowSuggestionsList(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Input
            ref={inputRef}
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoFocus={autoFocus}
            className="pl-10 pr-10"
          />
          
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" 
          />
          
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
      </form>
      {/* Suggestions Dropdown */}
      {showSuggestionsList && (suggestions?.length > 0 || isLoading) && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-custom-lg z-200 max-h-80 overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-text-secondary">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Searching...</span>
              </div>
            </div>
          ) : (
            <div className="py-2">
              {suggestions?.map((suggestion, index) => (
                <button
                  key={`${suggestion?.type}-${suggestion?.text}-${index}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted transition-colors duration-150
                    ${index === selectedSuggestionIndex ? 'bg-muted' : ''}
                  `}
                >
                  <Icon 
                    name={getSuggestionIcon(suggestion?.type)} 
                    size={16} 
                    className="text-text-secondary flex-shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-text-primary truncate">
                      {suggestion?.text}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {suggestion?.category}
                    </div>
                  </div>
                  <Icon 
                    name="ArrowUpRight" 
                    size={14} 
                    className="text-text-secondary flex-shrink-0" 
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;