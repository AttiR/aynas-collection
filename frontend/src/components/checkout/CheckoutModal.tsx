import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { paymentService, CheckoutRequest } from '../../services/paymentService';
import { XMarkIcon, CreditCardIcon, LockClosedIcon } from '@heroicons/react/24/outline';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { items, getTotalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    useSameAddress: true,
    billingAddress: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
    },
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('billing.')) {
      const billingField = name.replace('billing.', '');
      setFormData(prev => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [billingField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Create checkout request
      const checkoutRequest: CheckoutRequest = {
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.price,
          size: item.size,
          color: item.color,
        })),
        shippingFirstName: formData.firstName,
        shippingLastName: formData.lastName,
        shippingAddress: formData.address,
        shippingCity: formData.city,
        shippingState: formData.state,
        shippingZipCode: formData.zipCode,
        shippingCountry: formData.country,
        shippingPhone: formData.phone,
        notes: formData.notes,
      };

      // Create order
      const order = await paymentService.createOrder(checkoutRequest);

      // Create payment intent
      const paymentIntent = await paymentService.createPaymentIntent({
        amount: getTotalPrice() * 1.08, // Include tax
        orderNumber: order.orderNumber,
      });

      // Simulate payment processing (in real app, this would integrate with Stripe Elements)
      setTimeout(async () => {
        try {
          await paymentService.confirmPayment(order.orderNumber, paymentIntent.paymentIntentId, 'completed');
          clearCart();
          onSuccess();
          onClose();
        } catch (error) {
          console.error('Payment confirmation failed:', error);
          alert('Payment failed. Please try again.');
        }
      }, 2000);

    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-premium">
        {/* Header */}
        <div className="p-6 border-b border-cream-200 flex justify-between items-center">
          <h2 className="text-2xl font-serif font-bold text-luxury-800">Checkout</h2>
          <button
            onClick={onClose}
            className="text-luxury-400 hover:text-luxury-600 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step >= 1 ? 'bg-gold-500 text-white' : 'bg-cream-200 text-luxury-400'
              }`}>
                1
              </div>
              <span className={`text-sm ${step >= 1 ? 'text-luxury-800' : 'text-luxury-400'}`}>
                Shipping
              </span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step >= 2 ? 'bg-gold-500 text-white' : 'bg-cream-200 text-luxury-400'
              }`}>
                2
              </div>
              <span className={`text-sm ${step >= 2 ? 'text-luxury-800' : 'text-luxury-400'}`}>
                Payment
              </span>
            </div>
          </div>

          {/* Step 1: Shipping Information */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-serif font-semibold text-luxury-800 mb-4">Shipping Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-luxury-700 text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-cream-50 text-luxury-800 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-luxury-700 text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-cream-50 text-luxury-800 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-luxury-700 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-cream-50 text-luxury-800 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-luxury-700 text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-cream-50 text-luxury-800 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-luxury-700 text-sm font-medium mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-cream-50 text-luxury-800 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-luxury-700 text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-cream-50 text-luxury-800 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-luxury-700 text-sm font-medium mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-cream-50 text-luxury-800 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-luxury-700 text-sm font-medium mb-2">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-cream-50 text-luxury-800 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-luxury-700 text-sm font-medium mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-cream-50 text-luxury-800 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-luxury hover:shadow-premium"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Payment Information */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-serif font-semibold text-luxury-800 mb-4">Payment Information</h3>

              <div className="bg-cream-50 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <CreditCardIcon className="w-5 h-5 text-gold-600" />
                  <span className="font-semibold text-luxury-800">Credit Card</span>
                </div>
                <p className="text-sm text-luxury-600">We accept Visa, Mastercard, and American Express</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-luxury-700 text-sm font-medium mb-2">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    className="w-full bg-cream-50 text-luxury-800 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-luxury-700 text-sm font-medium mb-2">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      required
                      className="w-full bg-cream-50 text-luxury-800 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-luxury-700 text-sm font-medium mb-2">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      required
                      className="w-full bg-cream-50 text-luxury-800 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 p-4 bg-green-50 rounded-xl border border-green-200">
                <LockClosedIcon className="w-5 h-5 text-green-600" />
                <span className="text-green-800 text-sm font-medium">Secure Payment</span>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-luxury-600 hover:text-luxury-800 transition-colors font-medium"
                >
                  ← Back to Shipping
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-gold-600 hover:to-gold-700 disabled:bg-luxury-300 disabled:cursor-not-allowed transition-all duration-300 shadow-luxury hover:shadow-premium"
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing Payment...</span>
                    </div>
                  ) : (
                    `Pay $${(getTotalPrice() * 1.08).toFixed(2)}`
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
