import React from 'react';
import { Link } from 'react-router-dom';

const Returns: React.FC = () => {
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
            <span className="text-luxury-800">Returns & Exchanges</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-luxury-800 mb-6">
            Returns & Exchanges
          </h1>
          <p className="text-xl text-luxury-600 font-light max-w-3xl mx-auto">
            We want you to love your Aynas Collection items. If you're not completely satisfied,
            we offer easy returns and exchanges within 30 days.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Return Policy */}
          <div className="bg-white rounded-2xl p-8 shadow-luxury border border-cream-200 text-center">
            <div className="bg-gradient-to-br from-gold-400 to-gold-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-semibold text-luxury-800 mb-3">30-Day Returns</h3>
            <p className="text-luxury-600 mb-4">Full refund or exchange</p>
            <p className="text-sm text-luxury-500">From the date of delivery</p>
          </div>

          {/* Free Returns */}
          <div className="bg-white rounded-2xl p-8 shadow-luxury border border-cream-200 text-center">
            <div className="bg-gradient-to-br from-gold-400 to-gold-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-semibold text-luxury-800 mb-3">Free Returns</h3>
            <p className="text-luxury-600 mb-4">No return shipping cost</p>
            <p className="text-sm text-luxury-500">Prepaid return labels included</p>
          </div>

          {/* Easy Process */}
          <div className="bg-white rounded-2xl p-8 shadow-luxury border border-cream-200 text-center">
            <div className="bg-gradient-to-br from-gold-400 to-gold-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-semibold text-luxury-800 mb-3">Easy Process</h3>
            <p className="text-luxury-600 mb-4">Simple online returns</p>
            <p className="text-sm text-luxury-500">Track your return status</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Return Process */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-luxury border border-cream-200">
              <h2 className="text-2xl font-serif font-semibold text-luxury-800 mb-6">How to Return</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gold-100 w-8 h-8 rounded-full flex items-center justify-center text-gold-600 font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-luxury-800 mb-1">Initiate Return</h3>
                    <p className="text-luxury-600 text-sm">Log into your account and select the item you want to return</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gold-100 w-8 h-8 rounded-full flex items-center justify-center text-gold-600 font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-luxury-800 mb-1">Print Label</h3>
                    <p className="text-luxury-600 text-sm">Download and print your prepaid return shipping label</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gold-100 w-8 h-8 rounded-full flex items-center justify-center text-gold-600 font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-luxury-800 mb-1">Package Item</h3>
                    <p className="text-luxury-600 text-sm">Pack the item securely with all original packaging</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gold-100 w-8 h-8 rounded-full flex items-center justify-center text-gold-600 font-semibold text-sm">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-luxury-800 mb-1">Ship Back</h3>
                    <p className="text-luxury-600 text-sm">Drop off at any UPS location or schedule a pickup</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gold-100 w-8 h-8 rounded-full flex items-center justify-center text-gold-600 font-semibold text-sm">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-luxury-800 mb-1">Get Refund</h3>
                    <p className="text-luxury-600 text-sm">Refund processed within 3-5 business days of receiving</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-luxury border border-cream-200">
              <h2 className="text-2xl font-serif font-semibold text-luxury-800 mb-6">Return Requirements</h2>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-luxury-600 text-sm">Item must be unworn and unwashed</p>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-luxury-600 text-sm">All original tags must be attached</p>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-luxury-600 text-sm">Original packaging included</p>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-luxury-600 text-sm">Return within 30 days of delivery</p>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-red-100 w-6 h-6 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-luxury-600 text-sm">Final sale items cannot be returned</p>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-red-100 w-6 h-6 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-luxury-600 text-sm">Personalized or custom items excluded</p>
                </div>
              </div>
            </div>
          </div>

          {/* Return Policies */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-luxury border border-cream-200">
              <h2 className="text-2xl font-serif font-semibold text-luxury-800 mb-6">Return Policies</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-luxury-800 mb-3">Return Window</h3>
                  <p className="text-luxury-600 text-sm leading-relaxed">
                    You have 30 days from the date of delivery to return your item for a full refund or exchange.
                    Returns initiated after 30 days will not be accepted.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-luxury-800 mb-3">Refund Processing</h3>
                  <p className="text-luxury-600 text-sm leading-relaxed">
                    Once we receive your return, we'll inspect the item and process your refund within 3-5 business days.
                    Refunds will be issued to your original payment method.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-luxury-800 mb-3">Exchanges</h3>
                  <p className="text-luxury-600 text-sm leading-relaxed">
                    Need a different size or color? We offer free exchanges for the same item in a different size or color,
                    subject to availability. You can also exchange for a different item of equal or lesser value.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-luxury-800 mb-3">Damaged Items</h3>
                  <p className="text-luxury-600 text-sm leading-relaxed">
                    If you receive a damaged item, please contact us within 48 hours of delivery.
                    We'll provide a prepaid return label and process a full refund or replacement.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-luxury-800 mb-3">International Returns</h3>
                  <p className="text-luxury-600 text-sm leading-relaxed">
                    International customers are responsible for return shipping costs.
                    Please contact our customer service team for international return instructions.
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
                  to="/shipping-info"
                  className="flex items-center justify-between p-4 bg-cream-50 rounded-xl hover:bg-gold-50 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-gold-100 group-hover:bg-gold-200 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300">
                      <svg className="w-5 h-5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <span className="font-medium text-luxury-800">Shipping Information</span>
                  </div>
                  <svg className="w-5 h-5 text-luxury-400 group-hover:text-gold-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                <Link
                  to="/size-guide"
                  className="flex items-center justify-between p-4 bg-cream-50 rounded-xl hover:bg-gold-50 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-gold-100 group-hover:bg-gold-200 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300">
                      <svg className="w-5 h-5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span className="font-medium text-luxury-800">Size Guide</span>
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

export default Returns;
