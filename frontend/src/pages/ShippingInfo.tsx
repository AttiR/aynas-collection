import React from 'react';
import { Link } from 'react-router-dom';

const ShippingInfo: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Breadcrumb */}
      <div className="bg-white text-luxury-800 py-6 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-3 text-sm font-medium">
            <Link to="/" className="text-luxury-500 hover:text-gold-600 transition-colors">
              Home
            </Link>
            <span className="text-luxury-400">/</span>
            <span className="text-luxury-800">Shipping Information</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-luxury-800 mb-6">
            Shipping Information
          </h1>
          <p className="text-xl text-luxury-600 font-light max-w-3xl mx-auto">
            Fast, reliable shipping to get your Aynas Collection items to you quickly and safely.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Free Shipping */}
          <div className="bg-white rounded-2xl p-8 shadow-luxury border border-cream-200 text-center">
            <div className="bg-gradient-to-br from-gold-400 to-gold-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-semibold text-luxury-800 mb-3">Free Shipping</h3>
            <p className="text-luxury-600 mb-4">On orders over $50</p>
            <p className="text-sm text-luxury-500">Standard delivery within 5-7 business days</p>
          </div>

          {/* Express Shipping */}
          <div className="bg-white rounded-2xl p-8 shadow-luxury border border-cream-200 text-center">
            <div className="bg-gradient-to-br from-gold-400 to-gold-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-semibold text-luxury-800 mb-3">Express Shipping</h3>
            <p className="text-luxury-600 mb-4">$15.99</p>
            <p className="text-sm text-luxury-500">Next day delivery for most locations</p>
          </div>

          {/* International Shipping */}
          <div className="bg-white rounded-2xl p-8 shadow-luxury border border-cream-200 text-center">
            <div className="bg-gradient-to-br from-gold-400 to-gold-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-semibold text-luxury-800 mb-3">International</h3>
            <p className="text-luxury-600 mb-4">$29.99</p>
            <p className="text-sm text-luxury-500">7-14 business days worldwide</p>
          </div>
        </div>

        {/* Shipping Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Shipping Methods */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-luxury border border-cream-200">
              <h2 className="text-2xl font-serif font-semibold text-luxury-800 mb-6">Shipping Methods</h2>

              <div className="space-y-6">
                <div className="border-b border-cream-200 pb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-luxury-800">Standard Shipping</h3>
                    <span className="text-gold-600 font-semibold">Free over $50</span>
                  </div>
                  <p className="text-luxury-600 mb-2">5-7 business days</p>
                  <p className="text-sm text-luxury-500">Orders under $50: $8.99</p>
                </div>

                <div className="border-b border-cream-200 pb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-luxury-800">Express Shipping</h3>
                    <span className="text-gold-600 font-semibold">$15.99</span>
                  </div>
                  <p className="text-luxury-600 mb-2">1-2 business days</p>
                  <p className="text-sm text-luxury-500">Available for most US locations</p>
                </div>

                <div className="border-b border-cream-200 pb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-luxury-800">Overnight Shipping</h3>
                    <span className="text-gold-600 font-semibold">$25.99</span>
                  </div>
                  <p className="text-luxury-600 mb-2">Next business day</p>
                  <p className="text-sm text-luxury-500">Order by 2 PM EST for same-day processing</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-luxury-800">International Shipping</h3>
                    <span className="text-gold-600 font-semibold">$29.99</span>
                  </div>
                  <p className="text-luxury-600 mb-2">7-14 business days</p>
                  <p className="text-sm text-luxury-500">Available to select countries</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-luxury border border-cream-200">
              <h2 className="text-2xl font-serif font-semibold text-luxury-800 mb-6">Order Processing</h2>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-gold-100 w-8 h-8 rounded-full flex items-center justify-center text-gold-600 font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-luxury-800 mb-1">Order Confirmation</h3>
                    <p className="text-luxury-600 text-sm">You'll receive an email confirmation within 1 hour</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gold-100 w-8 h-8 rounded-full flex items-center justify-center text-gold-600 font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-luxury-800 mb-1">Processing</h3>
                    <p className="text-luxury-600 text-sm">Orders are processed within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gold-100 w-8 h-8 rounded-full flex items-center justify-center text-gold-600 font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-luxury-800 mb-1">Shipping</h3>
                    <p className="text-luxury-600 text-sm">Tracking information sent via email</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gold-100 w-8 h-8 rounded-full flex items-center justify-center text-gold-600 font-semibold text-sm">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-luxury-800 mb-1">Delivery</h3>
                    <p className="text-luxury-600 text-sm">Package delivered to your doorstep</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Policies */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-luxury border border-cream-200">
              <h2 className="text-2xl font-serif font-semibold text-luxury-800 mb-6">Shipping Policies</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-luxury-800 mb-3">Processing Time</h3>
                  <p className="text-luxury-600 text-sm leading-relaxed">
                    All orders are processed within 24 hours during business days (Monday-Friday).
                    Orders placed after 2 PM EST will be processed the next business day.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-luxury-800 mb-3">Delivery Areas</h3>
                  <p className="text-luxury-600 text-sm leading-relaxed">
                    We ship to all 50 US states, Puerto Rico, and select international destinations.
                    International shipping is available to Canada, UK, Australia, and most European countries.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-luxury-800 mb-3">Tracking</h3>
                  <p className="text-luxury-600 text-sm leading-relaxed">
                    Once your order ships, you'll receive a tracking number via email.
                    You can track your package through our website or the carrier's website.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-luxury-800 mb-3">Holiday Shipping</h3>
                  <p className="text-luxury-600 text-sm leading-relaxed">
                    During peak holiday seasons, processing times may be extended by 1-2 business days.
                    We'll notify you of any delays via email.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-luxury border border-cream-200">
              <h2 className="text-2xl font-serif font-semibold text-luxury-800 mb-6">Need Help?</h2>

              <div className="space-y-4">
                <Link
                  to="/contact-us"
                  className="flex items-center justify-between p-4 bg-cream-50 rounded-xl hover:bg-gold-50 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-gold-100 group-hover:bg-gold-200 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300">
                      <svg className="w-5 h-5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <span className="font-medium text-luxury-800">Contact Customer Service</span>
                  </div>
                  <svg className="w-5 h-5 text-luxury-400 group-hover:text-gold-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                <Link
                  to="/returns"
                  className="flex items-center justify-between p-4 bg-cream-50 rounded-xl hover:bg-gold-50 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-gold-100 group-hover:bg-gold-200 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300">
                      <svg className="w-5 h-5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                    </div>
                    <span className="font-medium text-luxury-800">Returns & Exchanges</span>
                  </div>
                  <svg className="w-5 h-5 text-luxury-400 group-hover:text-gold-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
