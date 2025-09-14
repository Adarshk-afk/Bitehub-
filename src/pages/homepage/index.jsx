import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroCarousel from './components/HeroCarousel';
import CategoryGrid from './components/CategoryGrid';
import FeaturedReviews from './components/FeaturedReviews';
import QuickStats from './components/QuickStats';
import NewsletterSignup from './components/NewsletterSignup';

const Homepage = () => {
  return (
    <>
      <Helmet>
        <title>BiteHub - Tech Product Reviews & Comparisons | Expert Analysis</title>
        <meta name="description" content="Discover the latest tech products with comprehensive reviews, detailed comparisons, and expert insights. Find the perfect gadgets for your needs at BiteHub." />
        <meta name="keywords" content="tech reviews, product comparisons, smartphones, laptops, gadgets, technology, expert reviews" />
        <meta property="og:title" content="BiteHub - Tech Product Reviews & Comparisons" />
        <meta property="og:description" content="Expert tech reviews and comprehensive product comparisons to help you make informed purchasing decisions." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BiteHub - Tech Product Reviews & Comparisons" />
        <meta name="twitter:description" content="Expert tech reviews and comprehensive product comparisons to help you make informed purchasing decisions." />
        <link rel="canonical" href="https://bitehub.com/homepage" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="space-y-16 lg:space-y-24">
          {/* Hero Section */}
          <section className="px-4 lg:px-6 pt-8 lg:pt-12">
            <div className="max-w-7xl mx-auto">
              <HeroCarousel />
            </div>
          </section>

          {/* Categories Section */}
          <section className="px-4 lg:px-6">
            <div className="max-w-7xl mx-auto">
              <CategoryGrid />
            </div>
          </section>

          {/* Quick Stats Section */}
          <section className="px-4 lg:px-6">
            <div className="max-w-7xl mx-auto">
              <QuickStats />
            </div>
          </section>

          {/* Featured Reviews Section */}
          <section className="px-4 lg:px-6">
            <div className="max-w-7xl mx-auto">
              <FeaturedReviews />
            </div>
          </section>

          {/* Newsletter Signup Section */}
          <section className="px-4 lg:px-6 pb-16 lg:pb-24">
            <div className="max-w-4xl mx-auto">
              <NewsletterSignup />
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-muted border-t border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">B</span>
                  </div>
                  <span className="text-xl font-bold text-text-primary">BiteHub</span>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Your trusted source for comprehensive tech product reviews, comparisons, and expert insights.
                </p>
                <div className="text-xs text-text-secondary">
                  © {new Date()?.getFullYear()} BiteHub. All rights reserved.
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h4 className="font-semibold text-text-primary">Explore</h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li><a href="/product-listing" className="hover:text-text-primary transition-colors">All Categories</a></li>
                  <li><a href="/product-comparison" className="hover:text-text-primary transition-colors">Compare Products</a></li>
                  <li><a href="/user-reviews" className="hover:text-text-primary transition-colors">Expert Reviews</a></li>
                  <li><a href="/search-results" className="hover:text-text-primary transition-colors">Search Products</a></li>
                </ul>
              </div>

              {/* Categories */}
              <div className="space-y-4">
                <h4 className="font-semibold text-text-primary">Categories</h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li><a href="/product-listing?category=smartphones" className="hover:text-text-primary transition-colors">Smartphones</a></li>
                  <li><a href="/product-listing?category=laptops" className="hover:text-text-primary transition-colors">Laptops</a></li>
                  <li><a href="/product-listing?category=wearables" className="hover:text-text-primary transition-colors">Wearables</a></li>
                  <li><a href="/product-listing?category=gaming" className="hover:text-text-primary transition-colors">Gaming</a></li>
                </ul>
              </div>

              {/* Support */}
              <div className="space-y-4">
                <h4 className="font-semibold text-text-primary">Support</h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li><a href="/about" className="hover:text-text-primary transition-colors">About Us</a></li>
                  <li><a href="/contact" className="hover:text-text-primary transition-colors">Contact</a></li>
                  <li><a href="/privacy" className="hover:text-text-primary transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-text-primary transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;