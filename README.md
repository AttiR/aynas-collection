# Aynas Collection - Premium E-commerce Platform

A modern, luxury e-commerce platform built with React, TypeScript, and ASP.NET Core, featuring professional authentication, email verification, and Stripe payment integration.

## 🚀 Features

- **Professional Authentication**: Email verification, password reset, account lockout protection
- **Luxury UI Design**: Premium white/gold theme with modern typography
- **Secure Payment Processing**: Stripe integration with proper error handling
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Product Management**: Categories, filtering, search, and pagination
- **Shopping Cart**: Persistent cart with checkout flow
- **Order Management**: Complete order tracking and history
- **SEO Optimization**: Comprehensive meta tags, Open Graph, and social media sharing
- **Azure Deployment**: Fully deployed on Azure Static Web Apps with Azure Functions API
- **Social Media Ready**: Professional previews for WhatsApp, Instagram, Facebook, Twitter

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Hook Form** with Yup validation
- **Heroicons** for icons
- **Context API** for state management
- **React Helmet Async** for dynamic SEO
- **Axios** for API communication

### Backend
- **ASP.NET Core 8** Web API
- **Entity Framework Core** with SQLite
- **JWT Authentication** with refresh tokens
- **BCrypt** for password hashing
- **Stripe.net** for payment processing
- **SMTP** for email notifications

### Deployment & API
- **Azure Static Web Apps** for frontend hosting
- **Azure Functions** for API endpoints
- **Azure App Service** for .NET API backup
- **GitHub Actions** for CI/CD

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **.NET 8 SDK**
- **Git**

## 🔧 Environment Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd AynasCollection
```

### 2. Quick Environment Setup (Recommended)

Run the interactive setup script:
```bash
./setup-env.sh
```

This script will guide you through setting up:
- Email configuration (Gmail)
- JWT secret key
- Stripe API keys
- Application base URL

### 3. Manual Environment Setup

If you prefer to set up manually, create a `.env` file in the `backend/AynasCollection.API/` directory:

```bash
# Copy the example file
cp backend/AynasCollection.API/env.example backend/AynasCollection.API/.env
```

Edit the `.env` file with your actual values:

```env
# Database Configuration
ConnectionStrings__DefaultConnection=Data Source=AynasCollection.db

# JWT Configuration
JwtSettings__SecretKey=your-super-secret-jwt-key-with-at-least-32-characters-for-development
JwtSettings__ExpirationHours=24

# Stripe Configuration
StripeSettings__SecretKey=sk_test_your_stripe_secret_key_here
StripeSettings__PublishableKey=pk_test_your_stripe_publishable_key_here

# Email Configuration
EmailSettings__SmtpServer=smtp.gmail.com
EmailSettings__SmtpPort=587
EmailSettings__SmtpUsername=your-email@gmail.com
EmailSettings__SmtpPassword=your-app-password
EmailSettings__FromEmail=noreply@aynascollection.com
EmailSettings__FromName=Aynas Collection
EmailSettings__BaseUrl=http://localhost:3000
```

### 4. Email Setup (Gmail Example)

For Gmail, you'll need to:

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in `EmailSettings__SmtpPassword`

### 5. Stripe Setup

1. **Create a Stripe account** at [stripe.com](https://stripe.com)
2. **Get your API keys** from the Stripe Dashboard
3. **Update the environment variables** with your test keys

## 🌐 Live Demo

**Aynas Collection is now live and fully deployed!**

- **Frontend**: https://brave-moss-071279d03.2.azurestaticapps.net
- **Backend API**: https://aynas-collection-api.azurewebsites.net
- **Status**: ✅ Production Ready

### 🎯 SEO & Social Media Features

The platform includes comprehensive SEO optimization:

- **Meta Tags**: Complete Open Graph and Twitter Card support
- **Social Sharing**: Professional previews for WhatsApp, Instagram, Facebook, Twitter
- **Structured Data**: JSON-LD schema for better search engine understanding
- **Sitemap**: Auto-generated sitemap.xml for search engines
- **Robots.txt**: Proper crawler guidance
- **Dynamic SEO**: Page-specific meta tags for products and categories

### 📱 Social Media Preview

When you share the website link, you'll see:
- **Professional fashion image** instead of React logo
- **Brand name**: "Aynas Collection - Premium Fashion & Lifestyle"
- **Compelling description** about the products
- **High-quality preview** optimized for all platforms

## 🚀 Quick Start

### Option 1: Use the Quick Start Script

```bash
# Make the script executable
chmod +x start-dev.sh

# Start both frontend and backend
./start-dev.sh
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend/AynasCollection.API
dotnet restore
dotnet run
```

The backend will be available at `http://localhost:5136`

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

The frontend will be available at `http://localhost:3000`

## 🔐 Authentication Features

### Registration Flow
1. User fills registration form
2. System validates and creates account
3. Verification email sent automatically
4. User clicks email link to verify
5. Account activated and welcome email sent
6. User can now log in

### Login Features
- Email verification required before login
- Account lockout after 5 failed attempts (15 minutes)
- Secure password validation
- JWT + refresh token system

### Password Reset
- Secure token-based password reset
- 1-hour token expiration
- Professional email templates

## 🛒 Shopping Features

### Product Browsing
- Featured products on homepage
- Category-based filtering
- Search functionality
- Pagination support
- Product details with images

### Shopping Cart
- Add/remove items
- Quantity adjustment
- Persistent cart (local storage)
- Real-time total calculation

### Checkout Process
- Multi-step checkout form
- Shipping information collection
- Stripe payment integration
- Order confirmation emails

## 📧 Email Templates

The system includes professional HTML email templates for:
- **Email Verification**: Welcome email with verification link
- **Password Reset**: Secure password reset instructions
- **Welcome Email**: Post-verification welcome message
- **Order Confirmation**: Order details and tracking info

## 🔒 Security Features

- **BCrypt password hashing**
- **JWT token authentication**
- **Email verification required**
- **Account lockout protection**
- **Secure password requirements**
- **CORS configuration**
- **Input validation**
- **Environment variable protection**

### 🛡️ Azure Security Best Practices

- **Resource Naming**: Use generic, non-descriptive names for Azure resources
- **Access Control**: Implement proper RBAC (Role-Based Access Control)
- **Network Security**: Use VNets and NSGs where appropriate
- **Secrets Management**: Store sensitive data in Azure Key Vault
- **Monitoring**: Enable Azure Security Center and logging
- **Regular Updates**: Keep all dependencies and Azure services updated

## 🎨 Design System

### Color Palette
- **Primary**: Gold gradient (`#f59e0b` to `#d97706`)
- **Background**: Cream (`#fef7ed`)
- **Text**: Luxury dark (`#1f2937`)
- **Accents**: White and subtle shadows

### Typography
- **Serif**: Playfair Display (headings)
- **Sans**: Inter (body text)

### Components
- Rounded corners (`rounded-xl`)
- Luxury shadows (`shadow-premium`)
- Smooth animations (`transition-all duration-300`)
- Hover effects with scale transforms

## 📁 Project Structure

```
AynasCollection/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── services/       # API services
│   │   └── styles/         # CSS and Tailwind config
│   └── package.json
├── backend/                 # ASP.NET Core backend
│   ├── AynasCollection.API/        # Web API project
│   ├── AynasCollection.Application/ # Business logic
│   ├── AynasCollection.Core/       # Domain entities
│   └── AynasCollection.Infrastructure/ # Data access
├── setup-env.sh            # Environment setup script
├── start-dev.sh            # Development startup script
└── README.md
```

## 🧪 Testing

### Backend Testing
```bash
cd backend/AynasCollection.API
dotnet test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🚀 Deployment

### ✅ Current Deployment Status

**Aynas Collection is fully deployed and production-ready!**

- **Frontend**: https://brave-moss-071279d03.2.azurestaticapps.net
- **Backend API**: https://aynas-collection-api.azurewebsites.net
- **Deployment Method**: Azure Static Web Apps + Azure Functions
- **CI/CD**: GitHub Actions (automatic deployment on push)
- **Status**: ✅ Live and operational

### 🔧 Deployment Architecture

The project uses a hybrid deployment approach:

1. **Frontend**: Azure Static Web Apps
   - React build served as static files
   - Global CDN for fast loading
   - Custom domain support

2. **API Layer**: Azure Functions
   - JavaScript functions for API endpoints
   - Proxies to .NET API for data
   - Automatic scaling

3. **Backend**: Azure App Service
   - .NET Core 8 Web API
   - SQLite database with seeding
   - Backup API endpoint

### 📊 Performance Features

- **Fast Loading**: CDN-optimized static files
- **SEO Optimized**: Meta tags, sitemap, structured data
- **Mobile Ready**: Responsive design for all devices
- **Social Media Ready**: Professional sharing previews

#### Manual Azure Setup

If you prefer manual setup:

1. **Install Azure CLI**:
   ```bash
   # macOS
   brew install azure-cli

   # Windows
   winget install Microsoft.AzureCLI
   ```

2. **Login to Azure**:
   ```bash
   az login
   ```

3. **Create Azure Resources**:
   ```bash
   # Create resource group (use a generic name)
   az group create --name rg-ecommerce-prod --location eastus

   # Create App Service Plan (Free tier)
   az appservice plan create --name plan-ecommerce-prod --resource-group rg-ecommerce-prod --location eastus --sku F1 --is-linux

   # Create Web App for backend (use generic name)
   az webapp create --name app-api-prod --resource-group rg-ecommerce-prod --plan plan-ecommerce-prod --runtime "DOTNETCORE:8.0"

   # Create Static Web App for frontend (use generic name)
   az staticwebapp create --name app-frontend-prod --resource-group rg-ecommerce-prod --location eastus --source https://github.com/YourUsername/your-repo --branch main --app-location "/frontend" --api-location "/backend/YourProject.API" --output-location "build"
   ```

### Other Deployment Options

#### Backend Deployment
1. Update environment variables for production
2. Configure production database
3. Set up SSL certificates
4. Deploy to Azure/AWS/Heroku

#### Frontend Deployment
1. Build the production bundle
2. Deploy to Vercel/Netlify/AWS S3

## 🔧 Development

### Environment Variables
- **Development**: Use `.env` file (automatically loaded)
- **Production**: Set environment variables on your hosting platform
- **Security**: `.env` files are automatically ignored by git

### Adding New Features
1. **Backend**: Add new entities in `Core`, services in `Application`, and controllers in `API`
2. **Frontend**: Add new components in `components/` and pages in `pages/`

### Database Migrations
```bash
cd backend/AynasCollection.API
dotnet ef migrations add MigrationName
dotnet ef database update
```

## 🔄 Recent Updates

### Latest Improvements (September 2025)

- ✅ **Fixed API Data Issue**: Azure Functions now proxy to real .NET API instead of hardcoded data
- ✅ **SEO Optimization**: Added comprehensive meta tags, Open Graph, and social media sharing
- ✅ **Social Media Ready**: Professional previews for WhatsApp, Instagram, Facebook, Twitter
- ✅ **Production Deployment**: Fully deployed on Azure with automatic CI/CD
- ✅ **Database Integration**: Real product data from seeded database
- ✅ **Performance Optimized**: CDN delivery and optimized images

### 🐛 Issues Resolved

- **Limited Products**: Fixed issue where only 2 hardcoded products were showing
- **Category Data**: All categories now show real data from database
- **Social Sharing**: Replaced React logo with professional fashion image
- **API Reliability**: Added fallback mechanisms for API calls
- **SEO Meta Tags**: Added dynamic SEO for different pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Aynas Collection** - Premium Fashion & Lifestyle E-commerce Platform
