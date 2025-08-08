import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SizeGuide: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('tops');

  const sizeCharts = {
    tops: {
      title: 'Tops & T-Shirts',
      measurements: ['Chest', 'Waist', 'Hips', 'Length'],
      sizes: [
        { size: 'XS', chest: '32-34"', waist: '26-28"', hips: '34-36"', length: '24"', us: '2-4' },
        { size: 'S', chest: '34-36"', waist: '28-30"', hips: '36-38"', length: '25"', us: '4-6' },
        { size: 'M', chest: '36-38"', waist: '30-32"', hips: '38-40"', length: '26"', us: '6-8' },
        { size: 'L', chest: '38-40"', waist: '32-34"', hips: '40-42"', length: '27"', us: '8-10' },
        { size: 'XL', chest: '40-42"', waist: '34-36"', hips: '42-44"', length: '28"', us: '10-12' },
        { size: 'XXL', chest: '42-44"', waist: '36-38"', hips: '44-46"', length: '29"', us: '12-14' }
      ]
    },
    bottoms: {
      title: 'Bottoms & Jeans',
      measurements: ['Waist', 'Hips', 'Inseam', 'Length'],
      sizes: [
        { size: 'XS', waist: '26-28"', hips: '34-36"', inseam: '30"', length: '38"', us: '2-4' },
        { size: 'S', waist: '28-30"', hips: '36-38"', inseam: '30"', length: '39"', us: '4-6' },
        { size: 'M', waist: '30-32"', hips: '38-40"', inseam: '31"', length: '40"', us: '6-8' },
        { size: 'L', waist: '32-34"', hips: '40-42"', inseam: '31"', length: '41"', us: '8-10' },
        { size: 'XL', waist: '34-36"', hips: '42-44"', inseam: '32"', length: '42"', us: '10-12' },
        { size: 'XXL', waist: '36-38"', hips: '44-46"', inseam: '32"', length: '43"', us: '12-14' }
      ]
    },
    dresses: {
      title: 'Dresses',
      measurements: ['Bust', 'Waist', 'Hips', 'Length'],
      sizes: [
        { size: 'XS', bust: '32-34"', waist: '26-28"', hips: '34-36"', length: '36"', us: '2-4' },
        { size: 'S', bust: '34-36"', waist: '28-30"', hips: '36-38"', length: '37"', us: '4-6' },
        { size: 'M', bust: '36-38"', waist: '30-32"', hips: '38-40"', length: '38"', us: '6-8' },
        { size: 'L', bust: '38-40"', waist: '32-34"', hips: '40-42"', length: '39"', us: '8-10' },
        { size: 'XL', bust: '40-42"', waist: '34-36"', hips: '42-44"', length: '40"', us: '10-12' },
        { size: 'XXL', bust: '42-44"', waist: '36-38"', hips: '44-46"', length: '41"', us: '12-14' }
      ]
    },
    shoes: {
      title: 'Shoes',
      measurements: ['US', 'UK', 'EU', 'CM'],
      sizes: [
        { size: '5', us: '5', uk: '3', eu: '35', cm: '22.5' },
        { size: '6', us: '6', uk: '4', eu: '36', cm: '23.5' },
        { size: '7', us: '7', uk: '5', eu: '37', cm: '24.5' },
        { size: '8', us: '8', uk: '6', eu: '38', cm: '25.5' },
        { size: '9', us: '9', uk: '7', eu: '39', cm: '26.5' },
        { size: '10', us: '10', uk: '8', eu: '40', cm: '27.5' },
        { size: '11', us: '11', uk: '9', eu: '41', cm: '28.5' }
      ]
    }
  };

  const categories = [
    { id: 'tops', name: 'Tops & T-Shirts', icon: '👕' },
    { id: 'bottoms', name: 'Bottoms & Jeans', icon: '👖' },
    { id: 'dresses', name: 'Dresses', icon: '👗' },
    { id: 'shoes', name: 'Shoes', icon: '👠' }
  ];

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
            <span className="text-luxury-800">Size Guide</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-luxury-800 mb-6">
            Size Guide
          </h1>
          <p className="text-xl text-luxury-600 font-light max-w-3xl mx-auto">
            Find your perfect fit with our comprehensive size charts and measurement guides.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Category Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-luxury border border-cream-200 sticky top-8">
              <h2 className="text-2xl font-serif font-semibold text-luxury-800 mb-6">Categories</h2>

              <div className="space-y-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 font-medium ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-premium'
                        : 'text-luxury-600 hover:bg-cream-50 hover:text-gold-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Measurement Guide */}
              <div className="mt-8 pt-8 border-t border-cream-200">
                <h3 className="text-lg font-serif font-semibold text-luxury-800 mb-4">How to Measure</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-luxury-800 text-sm mb-2">Chest/Bust</h4>
                    <p className="text-luxury-600 text-sm">Measure around the fullest part of your chest</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-luxury-800 text-sm mb-2">Waist</h4>
                    <p className="text-luxury-600 text-sm">Measure around your natural waistline</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-luxury-800 text-sm mb-2">Hips</h4>
                    <p className="text-luxury-600 text-sm">Measure around the fullest part of your hips</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-luxury-800 text-sm mb-2">Length</h4>
                    <p className="text-luxury-600 text-sm">Measure from shoulder to desired length</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Size Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-luxury border border-cream-200">
              <h2 className="text-2xl font-serif font-semibold text-luxury-800 mb-8">
                {sizeCharts[activeCategory as keyof typeof sizeCharts].title} Size Chart
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-cream-200">
                      <th className="text-left py-4 px-4 font-semibold text-luxury-800">Size</th>
                      {sizeCharts[activeCategory as keyof typeof sizeCharts].measurements.map((measurement) => (
                        <th key={measurement} className="text-left py-4 px-4 font-semibold text-luxury-800">
                          {measurement}
                        </th>
                      ))}
                      {activeCategory !== 'shoes' && (
                        <th className="text-left py-4 px-4 font-semibold text-luxury-800">US Size</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {sizeCharts[activeCategory as keyof typeof sizeCharts].sizes.map((sizeData) => (
                      <tr key={sizeData.size} className="border-b border-cream-100 hover:bg-cream-50">
                        <td className="py-4 px-4 font-semibold text-gold-600">{sizeData.size}</td>
                        {sizeCharts[activeCategory as keyof typeof sizeCharts].measurements.map((measurement) => (
                          <td key={measurement} className="py-4 px-4 text-luxury-600">
                            {sizeData[measurement.toLowerCase() as keyof typeof sizeData]}
                          </td>
                        ))}
                        {activeCategory !== 'shoes' && (
                          <td className="py-4 px-4 text-luxury-600">{sizeData.us}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tips */}
            <div className="mt-8 bg-white rounded-2xl p-8 shadow-luxury border border-cream-200">
              <h3 className="text-xl font-serif font-semibold text-luxury-800 mb-6">Sizing Tips</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-gold-100 w-6 h-6 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-luxury-800 text-sm mb-1">Measure Yourself</h4>
                      <p className="text-luxury-600 text-sm">Use a flexible measuring tape for accurate measurements</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-gold-100 w-6 h-6 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-luxury-800 text-sm mb-1">Check Reviews</h4>
                      <p className="text-luxury-600 text-sm">Read customer reviews for sizing recommendations</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-gold-100 w-6 h-6 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-luxury-800 text-sm mb-1">Consider Fit</h4>
                      <p className="text-luxury-600 text-sm">Some items may run small or large - check product descriptions</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-gold-100 w-6 h-6 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-luxury-800 text-sm mb-1">Easy Returns</h4>
                      <p className="text-luxury-600 text-sm">Not sure about your size? We offer free returns and exchanges</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help */}
            <div className="mt-8 bg-white rounded-2xl p-8 shadow-luxury border border-cream-200">
              <h3 className="text-xl font-serif font-semibold text-luxury-800 mb-6">Need Help?</h3>

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

export default SizeGuide;
