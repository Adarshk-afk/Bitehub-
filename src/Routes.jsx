import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProductDetail from './pages/product-detail';
import SearchResults from './pages/search-results';
import UserReviews from './pages/user-reviews';
import ProductListing from './pages/product-listing';
import ProductComparison from './pages/product-comparison';
import Homepage from './pages/homepage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/user-reviews" element={<UserReviews />} />
        <Route path="/product-listing" element={<ProductListing />} />
        <Route path="/product-comparison" element={<ProductComparison />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
