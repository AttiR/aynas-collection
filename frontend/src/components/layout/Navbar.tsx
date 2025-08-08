import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { ShoppingCartIcon, Bars3Icon as MenuIcon, XMarkIcon as XIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItemCount = getTotalItems();

  return (
    <nav className="bg-white text-luxury-800 shadow-luxury sticky top-0 z-50 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center shadow-premium">
              <span className="text-white font-serif font-bold text-xl">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-serif font-bold bg-gradient-to-r from-gold-600 to-gold-800 bg-clip-text text-transparent">
                Aynas
              </span>
              <span className="text-xs text-luxury-500 font-medium tracking-wider">COLLECTION</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-luxury-700 hover:text-gold-600 transition-colors font-medium text-sm tracking-wide"
            >
              HOME
            </Link>
            <Link
              to="/products"
              className="text-luxury-700 hover:text-gold-600 transition-colors font-medium text-sm tracking-wide"
            >
              COLLECTION
            </Link>
            <Link
              to="/cart"
              className="text-luxury-700 hover:text-gold-600 transition-colors font-medium text-sm tracking-wide"
            >
              CART
            </Link>
            {user ? (
              <div className="flex items-center space-x-6">
                <Link
                  to="/profile"
                  className="text-luxury-700 hover:text-gold-600 transition-colors font-medium text-sm tracking-wide"
                >
                  PROFILE
                </Link>
                <button
                  onClick={logout}
                  className="text-luxury-700 hover:text-gold-600 transition-colors font-medium text-sm tracking-wide"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <Link
                  to="/login"
                  className="text-luxury-700 hover:text-gold-600 transition-colors font-medium text-sm tracking-wide"
                >
                  LOGIN
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-6 py-3 rounded-lg font-medium hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-luxury hover:shadow-premium transform hover:scale-105"
                >
                  REGISTER
                </Link>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <div className="flex items-center space-x-6">
            <Link to="/cart" className="relative group">
              <div className="p-2 rounded-full bg-cream-100 group-hover:bg-gold-50 transition-colors duration-300">
                <ShoppingCartIcon className="h-6 w-6 text-luxury-600 group-hover:text-gold-600 transition-colors" />
              </div>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-semibold shadow-premium">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-luxury-600 hover:text-gold-600 transition-colors p-2 rounded-lg hover:bg-cream-100"
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-cream-200 shadow-luxury">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-4 py-3 text-luxury-700 hover:text-gold-600 hover:bg-cream-50 transition-colors rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                HOME
              </Link>
              <Link
                to="/products"
                className="block px-4 py-3 text-luxury-700 hover:text-gold-600 hover:bg-cream-50 transition-colors rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                COLLECTION
              </Link>
              <Link
                to="/cart"
                className="block px-4 py-3 text-luxury-700 hover:text-gold-600 hover:bg-cream-50 transition-colors rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                CART
              </Link>
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-4 py-3 text-luxury-700 hover:text-gold-600 hover:bg-cream-50 transition-colors rounded-lg font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    PROFILE
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-luxury-700 hover:text-gold-600 hover:bg-cream-50 transition-colors rounded-lg font-medium"
                  >
                    LOGOUT
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-3 text-luxury-700 hover:text-gold-600 hover:bg-cream-50 transition-colors rounded-lg font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    LOGIN
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-3 text-luxury-700 hover:text-gold-600 hover:bg-cream-50 transition-colors rounded-lg font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    REGISTER
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
