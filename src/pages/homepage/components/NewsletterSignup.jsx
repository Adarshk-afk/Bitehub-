import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    
    if (!email?.trim()) {
      setError('Email address is required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1500);
  };

  const handleEmailChange = (e) => {
    setEmail(e?.target?.value);
    if (error) setError('');
  };

  if (isSubscribed) {
    return (
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 lg:p-8">
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-text-primary">
              Welcome to BiteHub!
            </h3>
            <p className="text-text-secondary">
              Thank you for subscribing. You'll receive our latest tech reviews and insights directly in your inbox.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-text-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={16} className="text-primary" />
              <span>Weekly newsletter</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Bell" size={16} className="text-primary" />
              <span>Breaking tech news</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} className="text-primary" />
              <span>Exclusive reviews</span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => setIsSubscribed(false)}
            className="mt-4"
          >
            Subscribe Another Email
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 lg:p-8">
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="Mail" size={32} className="text-primary" />
          </div>
          
          <h3 className="text-2xl lg:text-3xl font-bold text-text-primary">
            Stay Updated with Tech Trends
          </h3>
          <p className="text-lg text-text-secondary">
            Get the latest product reviews, tech news, and exclusive insights delivered to your inbox weekly
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
                error={error}
                className="text-center sm:text-left"
              />
            </div>
            <Button
              type="submit"
              loading={isLoading}
              iconName="ArrowRight"
              iconPosition="right"
              className="sm:px-8"
            >
              Subscribe
            </Button>
          </div>
        </form>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-text-secondary">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span>No spam, unsubscribe anytime</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span>Join 25,000+ subscribers</span>
          </div>
        </div>

        {/* Newsletter Preview */}
        <div className="bg-card border border-border rounded-lg p-4 text-left max-w-md mx-auto">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Newspaper" size={16} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">What you'll get:</span>
          </div>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success flex-shrink-0" />
              <span>Weekly roundup of latest tech reviews</span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success flex-shrink-0" />
              <span>Early access to product comparisons</span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success flex-shrink-0" />
              <span>Exclusive deals and recommendations</span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success flex-shrink-0" />
              <span>Breaking tech news and announcements</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;