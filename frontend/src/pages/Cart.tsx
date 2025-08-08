import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import CheckoutModal from '../components/checkout/CheckoutModal';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleCheckoutSuccess = () => {
    // Show success message or redirect
    alert('Order placed successfully! Thank you for your purchase.');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-luxury-400 text-8xl mb-6">🛒</div>
            <h1 className="text-3xl font-serif font-bold text-luxury-800 mb-4">Your Cart is Empty</h1>
            <p className="text-luxury-600 mb-8 font-light text-lg">Looks like you haven't added any items to your cart yet.</p>
            <Link
              to="/products"
              className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-luxury hover:shadow-premium"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white text-luxury-800 py-12 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-serif font-bold mb-2">Shopping Cart</h1>
          <p className="text-luxury-600 font-light">Review your items and proceed to checkout</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-luxury border border-cream-200 overflow-hidden">
              <div className="p-6 border-b border-cream-200">
                <h2 className="text-2xl font-serif font-semibold text-luxury-800">Cart Items ({items.length})</h2>
              </div>

              <div className="divide-y divide-cream-200">
                {items.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-center space-x-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.imageUrl || '/placeholder-product.jpg'}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-xl"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-serif font-semibold text-luxury-800 mb-2">
                          {item.name}
                        </h3>
                        {item.size && (
                          <p className="text-luxury-500 text-sm mb-1">Size: {item.size}</p>
                        )}
                        {item.color && (
                          <p className="text-luxury-500 text-sm mb-2">Color: {item.color}</p>
                        )}
                        <p className="text-xl font-serif font-bold text-gold-600">
                          ${item.price}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-10 h-10 bg-cream-100 text-luxury-700 rounded-lg flex items-center justify-center hover:bg-gold-50 transition-colors"
                        >
                          <MinusIcon className="w-4 h-4" />
                        </button>
                        <span className="text-luxury-800 font-semibold min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-10 h-10 bg-cream-100 text-luxury-700 rounded-lg flex items-center justify-center hover:bg-gold-50 transition-colors"
                        >
                          <PlusIcon className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-luxury-400 hover:text-red-500 transition-colors p-2"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Actions */}
              <div className="p-6 bg-cream-50 border-t border-cream-200">
                <div className="flex justify-between items-center">
                  <button
                    onClick={clearCart}
                    className="text-luxury-600 hover:text-red-500 transition-colors font-medium"
                  >
                    Clear Cart
                  </button>
                  <Link
                    to="/products"
                    className="text-gold-600 hover:text-gold-700 transition-colors font-medium"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-luxury border border-cream-200 p-8 sticky top-8">
              <h2 className="text-2xl font-serif font-semibold text-luxury-800 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-luxury-600">
                  <span>Subtotal ({items.reduce((total, item) => total + item.quantity, 0)} items)</span>
                  <span className="font-semibold">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-luxury-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-luxury-600">
                  <span>Tax</span>
                  <span className="font-semibold">${(getTotalPrice() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-cream-200 pt-4">
                  <div className="flex justify-between text-xl font-serif font-bold text-luxury-800">
                    <span>Total</span>
                    <span className="text-gold-600">${(getTotalPrice() * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white py-4 rounded-xl font-semibold hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-luxury hover:shadow-premium transform hover:scale-105"
              >
                Proceed to Checkout
              </button>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t border-cream-200">
                <h3 className="text-lg font-serif font-semibold text-luxury-800 mb-4">Payment Methods</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-cream-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">V</span>
                    </div>
                    <span className="text-luxury-700 font-medium">Visa</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-cream-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-800 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">M</span>
                    </div>
                    <span className="text-luxury-700 font-medium">Mastercard</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-cream-50 rounded-lg">
                    <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>
                    <span className="text-luxury-700 font-medium">PayPal</span>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-green-800 text-sm font-medium">Secure Checkout</span>
                </div>
                <p className="text-green-700 text-xs mt-1">Your payment information is encrypted and secure.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onSuccess={handleCheckoutSuccess}
      />
    </div>
  );
};

export default Cart;
