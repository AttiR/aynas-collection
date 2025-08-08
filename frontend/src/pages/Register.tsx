import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { EyeIcon, EyeSlashIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
}

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  phoneNumber: yup.string().optional(),
}).required();

const Register: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
  });

  const password = watch('password');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        phoneNumber: data.phoneNumber,
      });

      setSuccess(true);
    } catch (error: any) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-premium p-8 text-center">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-serif font-bold text-luxury-800 mb-2">Registration Successful!</h1>
            <p className="text-luxury-600 mb-6">
              Thank you for registering with Aynas Collection. We've sent a verification email to your inbox.
              Please check your email and click the verification link to activate your account.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-luxury hover:shadow-premium w-full"
              >
                Go to Login
              </button>
              <p className="text-sm text-luxury-500">
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  onClick={() => setSuccess(false)}
                  className="text-gold-600 hover:text-gold-700 font-medium"
                >
                  try registering again
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-premium p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-luxury-800 mb-2">Create Account</h1>
            <p className="text-luxury-600">Join Aynas Collection for premium fashion</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-luxury-700 text-sm font-medium mb-2">
                  First Name *
                </label>
                <input
                  {...register('firstName')}
                  type="text"
                  className="w-full bg-cream-50 text-luxury-800 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-luxury-700 text-sm font-medium mb-2">
                  Last Name *
                </label>
                <input
                  {...register('lastName')}
                  type="text"
                  className="w-full bg-cream-50 text-luxury-800 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-luxury-700 text-sm font-medium mb-2">
                Email Address *
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full bg-cream-50 text-luxury-800 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-luxury-700 text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                {...register('phoneNumber')}
                type="tel"
                className="w-full bg-cream-50 text-luxury-800 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="+1 (555) 123-4567"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
              )}
            </div>

            <div>
              <label className="block text-luxury-700 text-sm font-medium mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full bg-cream-50 text-luxury-800 border border-cream-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-luxury-400 hover:text-luxury-600"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
              {password && (
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-luxury-600">Password requirements:</p>
                  <div className="space-y-1">
                    <div className={`text-xs ${password.length >= 6 ? 'text-green-600' : 'text-red-500'}`}>
                      • At least 6 characters
                    </div>
                    <div className={`text-xs ${/[a-z]/.test(password) ? 'text-green-600' : 'text-red-500'}`}>
                      • One lowercase letter
                    </div>
                    <div className={`text-xs ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-red-500'}`}>
                      • One uppercase letter
                    </div>
                    <div className={`text-xs ${/\d/.test(password) ? 'text-green-600' : 'text-red-500'}`}>
                      • One number
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-luxury-700 text-sm font-medium mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="w-full bg-cream-50 text-luxury-800 border border-cream-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-luxury-400 hover:text-luxury-600"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white py-4 rounded-xl font-semibold hover:from-gold-600 hover:to-gold-700 disabled:bg-luxury-300 disabled:cursor-not-allowed transition-all duration-300 shadow-luxury hover:shadow-premium"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>

            <div className="text-center">
              <p className="text-luxury-600">
                Already have an account?{' '}
                <Link to="/login" className="text-gold-600 hover:text-gold-700 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
