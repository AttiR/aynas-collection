import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, UserDto, RegisterRequest, LoginRequest, UpdateProfileRequest, ChangePasswordRequest } from '../services/authService';

interface AuthContextType {
  user: UserDto | null;
  loading: boolean;
  login: (request: LoginRequest) => Promise<void>;
  register: (request: RegisterRequest) => Promise<void>;
  logout: () => void;
  updateProfile: (request: UpdateProfileRequest) => Promise<void>;
  changePassword: (request: ChangePasswordRequest) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const userData = await authService.getProfile();
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (request: LoginRequest) => {
    try {
      const response = await authService.login(request);
      if (response.user) {
        setUser(response.user);
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (request: RegisterRequest) => {
    try {
      await authService.register(request);
      // Note: User is not automatically logged in after registration
      // They need to verify their email first
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateProfile = async (request: UpdateProfileRequest) => {
    try {
      await authService.updateProfile(request);
      // Refresh user data
      const userData = await authService.getProfile();
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };

  const changePassword = async (request: ChangePasswordRequest) => {
    try {
      await authService.changePassword(request);
    } catch (error) {
      throw error;
    }
  };

  const refreshUser = async () => {
    try {
      if (authService.isAuthenticated()) {
        const userData = await authService.getProfile();
        setUser(userData);
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
      logout();
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
