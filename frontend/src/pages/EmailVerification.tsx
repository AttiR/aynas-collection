import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const EmailVerification: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error' | 'expired'>('verifying');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const emailParam = searchParams.get('email');
    const tokenParam = searchParams.get('token');

    if (emailParam && tokenParam) {
      setEmail(emailParam);
      verifyEmail(emailParam, tokenParam);
    } else {
      setStatus('error');
      setMessage('Invalid verification link. Please check your email for the correct link.');
    }
  }, [searchParams]);

  const verifyEmail = async (email: string, token: string) => {
    try {
      const response = await authService.verifyEmail({ email, token });
      setStatus('success');
      setMessage(response.message);
    } catch (error: any) {
      if (error.message.includes('expired')) {
        setStatus('expired');
        setMessage('Verification link has expired. Please request a new one.');
      } else {
        setStatus('error');
        setMessage(error.message || 'Email verification failed. Please try again.');
      }
    }
  };

  const resendVerification = async () => {
    try {
      await authService.resendVerificationEmail(email);
      setMessage('Verification email has been sent. Please check your inbox.');
    } catch (error: any) {
      setMessage(error.message || 'Failed to resend verification email.');
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-serif font-semibold text-luxury-800 mb-2">Verifying Your Email</h2>
            <p className="text-luxury-600">Please wait while we verify your email address...</p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-serif font-semibold text-luxury-800 mb-2">Email Verified Successfully!</h2>
            <p className="text-luxury-600 mb-6">{message}</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-luxury hover:shadow-premium"
            >
              Continue to Login
            </button>
          </div>
        );

      case 'error':
        return (
          <div className="text-center">
            <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-serif font-semibold text-luxury-800 mb-2">Verification Failed</h2>
            <p className="text-luxury-600 mb-6">{message}</p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-luxury hover:shadow-premium mr-3"
              >
                Go to Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-cream-100 text-luxury-800 px-8 py-3 rounded-xl font-semibold hover:bg-cream-200 transition-all duration-300 border border-cream-300"
              >
                Register Again
              </button>
            </div>
          </div>
        );

      case 'expired':
        return (
          <div className="text-center">
            <ExclamationTriangleIcon className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-serif font-semibold text-luxury-800 mb-2">Link Expired</h2>
            <p className="text-luxury-600 mb-6">{message}</p>
            <div className="space-y-3">
              <button
                onClick={resendVerification}
                className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-luxury hover:shadow-premium mr-3"
              >
                Resend Verification Email
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-cream-100 text-luxury-800 px-8 py-3 rounded-xl font-semibold hover:bg-cream-200 transition-all duration-300 border border-cream-300"
              >
                Go to Login
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-premium p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-luxury-800 mb-2">Aynas Collection</h1>
            <p className="text-luxury-600">Premium Fashion & Lifestyle</p>
          </div>

          {renderContent()}

          {status === 'success' && (
            <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
              <p className="text-green-800 text-sm">
                You can now log in to your account and start shopping our premium collection!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
