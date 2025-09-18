import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Contact form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
            <span className="text-luxury-800">Contact Us</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-luxury-800 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-luxury-600 font-light max-w-3xl mx-auto">
            We're here to help! Get in touch with our customer service team for any questions,
            concerns, or assistance you may need.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-luxury border border-cream-200">
            <h2 className="text-2xl font-serif font-semibold text-luxury-800 mb-8">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-luxury-700 text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-cream-50 text-luxury-800 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-luxury-700 text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-cream-50 text-luxury-800 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-luxury-700 text-sm font-medium mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-cream-50 text-luxury-800 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Status</option>
                  <option value="returns">Returns & Exchanges</option>
                  <option value="shipping">Shipping Information</option>
                  <option value="product">Product Information</option>
                  <option value="technical">Technical Support</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-luxury-700 text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-cream-50 text-luxury-800 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none"
                  placeholder="Please describe your inquiry in detail..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white py-4 rounded-xl font-semibold hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-luxury hover:shadow-premium transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Company Info */}
            <div className="bg-white rounded-2xl p-8 shadow-luxury border border-cream-200">
              <h2 className="text-2xl font-serif font-semibold text-luxury-800 mb-6">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-gold-400 to-gold-600 w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-premium">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-luxury-800 mb-1">Email</h3>
                    <p className="text-luxury-600">support@aynascollection.com</p>
                    <p className="text-luxury-600">info@aynascollection.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-gold-400 to-gold-600 w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-premium">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-luxury-800 mb-1">Phone</h3>
                    <p className="text-luxury-600">+1 (555) 00-111-1344444444</p>
                    <p className="text-luxury-600">Mon-Fri: 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-gold-400 to-gold-600 w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-premium">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-luxury-800 mb-1">Address</h3>
                    <p className="text-luxury-600">123 Fashion Avenue</p>
                    <p className="text-luxury-600">XYZ, CITY 10001</p>
                    <p className="text-luxury-600">Country</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-white rounded-2xl p-8 shadow-luxury border border-cream-200">
              <h2 className="text-2xl font-serif font-semibold text-luxury-800 mb-6">Quick Help</h2>

              <div className="space-y-4">
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

export default ContactUs;
